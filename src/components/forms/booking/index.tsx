"use client";

import { useState } from "react";
import { z } from "zod";
import { v4 as uuidv4 } from 'uuid';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { addDays } from "date-fns";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { guests, rooms } from "@/lib/constants";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { useAppContext } from "@/app/dashboard/app-context";
import { createBooking, updateBooking } from "./action";
import { usePushNotifications } from "@/lib/client/notifications/provider";
import { sendPushNotification } from "@/lib/client/notifications/actions";
import { showNiceDates } from "@/lib/functions";

export const formSchema = z.object({
  booking_name: z.string().optional(),
  name: z.string().min(2, {
    message: "Namnet måste innehålla minst två tecken.",
  }),
  guests: z.string().min(1, {
    message: "Minst en vuxen person behöver anges.",
  }),
  guests_children: z.string().optional(),
  from: z.date({
  required_error: "Du måste välja ett startdatum.",
  invalid_type_error: "Ogiltigt startdatum.",
}),
  to: z.date({
    required_error: "Du måste välja ett slutdatum.",
    invalid_type_error: "Ogiltigt slutdatum.",
  }),
  rooms: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Du måste välja minst ett rum.",
  }),
  message: z.string().max(1000).optional(),
  is_rented_out: z.boolean().optional(),
  is_test_booking: z.boolean().optional(),
}).refine((data) => data.to > data.from, {
  message: "Slutdatumet måste vara efter startdatumet.",
  path: ["to"],
});

export type BookingFormValues = {
  id?: string;
  user_id: string;
  created_at?: number;
  updated_at?: number;
  dates?: {
    from: Date;
    to: Date;
  }
} & Partial<z.infer<typeof formSchema>>;

const isDevelopment = process.env.NODE_ENV === 'development';

export function BookingForm({bookingValues, email, isUpdatingBooking, isCreatingNewBooking}: {bookingValues?: BookingFormValues; email: string | undefined; isUpdatingBooking?: boolean; isCreatingNewBooking?: boolean;}) {
  const [isSending, setIsSending] = useState(false);
  const { selectedDate } = useAppContext();
  const { toast } = useToast();
  const router = useRouter();
  const push = usePushNotifications();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      booking_name: bookingValues?.booking_name || "",
      name: bookingValues?.name || "",
      guests: bookingValues?.guests?.toString() || "1",
      guests_children: bookingValues?.guests_children?.toString() || "",
      from: bookingValues?.dates?.from ?? (selectedDate ? new Date(selectedDate) : undefined),
      to: bookingValues?.dates?.to ?? (selectedDate ? addDays(new Date(selectedDate), 7) :undefined),
      rooms: bookingValues?.rooms || [],
      message: bookingValues?.message || "",
    },
  });
  const submitButtonLabel = isUpdatingBooking ? "Uppdatera bokning" : "Lägg in bokning";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="booking_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Namn på bokning</FormLabel>
              <FormControl>
                <Input placeholder="T.ex. Sommarresa" {...field} />
              </FormControl>
              <FormDescription>
                Frivilligt fält för att lättare hitta din resa.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Namn</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <fieldset className="flex flex-col gap-3">
          <legend className="text-base text-gray-600">Vilka följer med?</legend>

          <FormField
            control={form.control}
            name="guests"
            render={({ field }) => (
              <FormItem className="flex gap-4 items-center justify-between space-y-0">
                <FormLabel>Vuxna</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="0" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {guests.map((item) => (
                      <SelectItem
                        key={`guest-adult-${item.key}`}
                        value={item.key.toString()}
                      >
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="guests_children"
            render={({ field }) => (
              <FormItem className="flex gap-4 items-center justify-between space-y-0">
                <FormLabel>
                  Barn{" "}
                  <span className="font-normal text-gray-600">
                    (Upp till tolv år)
                  </span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="0" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {guests.map((item) => (
                      <SelectItem
                        key={`guest-adult-${item.key}`}
                        value={item.key.toString()}
                      >
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>
        <fieldset className="flex gap-3">
          <legend className="text-base text-gray-600 mb-3">Resedatum</legend>
        <FormField
          control={form.control}
          name="from"
          render={({ field }) => (
            <FormItem className="flex flex-col flex-1">
              <FormLabel>Ankomst</FormLabel>
              <DatePicker field={field} title="Välj datum" description="" placeholder="Välj datum" />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="to"
          render={({ field }) => (
            <FormItem className="flex flex-col flex-1">
              <FormLabel>Avresa</FormLabel>
              <DatePicker field={field} title="Välj datum" description="" placeholder="Välj avresedatum" arrivalDate={form.control._formValues.from} />
              <FormMessage />
            </FormItem>
          )}
        />
        </fieldset>

        <FormField
          control={form.control}
          name="rooms"
          render={() => (
            <FormItem>
              <div className="mb-2">
                <FormLabel className="text-base font-normal text-gray-600">
                  Rum
                </FormLabel>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {rooms.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="rooms"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="relative inline-flex items-center gap-2 justify-self-start bg-gray-50 rounded-md p-0 space-y-0 hover:bg-gray-100"
                        >
                          <FormControl>
                            <Checkbox
                              className="absolute size-5 left-1.5"
                              value={item.id}
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="p-2 pl-8 cursor-pointer">
                            {item.value}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meddelande</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Övrig information som kan vara bra att veta."
                  className="resize-none h-20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isSending} className="w-full" type="submit">
          {isSending ? <Loader2 className="animate-spin" /> : submitButtonLabel}
          </Button>
      </form>
    </Form>
  );

  function onSubmit(values: z.infer<typeof formSchema>) {
    const fromDate = new Date(values.from);
    const toDate = new Date(values.to);
    fromDate.setHours(12, 0, 0, 0);
    toDate.setHours(12, 0, 0, 0);
    const fullBooking = {
      ...values,
      dates: {
        from: fromDate,
        to: toDate,
      },
      id: bookingValues?.id || uuidv4(),
      user_id: bookingValues?.user_id || "",
      created_at: bookingValues?.created_at,
      updated_at: bookingValues?.updated_at,
    }

    if (isDevelopment) {
      fullBooking.is_test_booking = true;
    }

   if (isCreatingNewBooking) {
    try {
      createBooking(fullBooking, email);
      setIsSending(true);
    } catch {
      toast({
        title: "Något gick fel",
        description: "På grund av ett fel kunde din bokning inte skapas. Försök igen senare.",
      });
      setIsSending(false);
    }
    finally {
      if (!isDevelopment) {
        sendNotification(fullBooking)
      } 
      setIsSending(false);
    }
   } else {
    try {
      updateBooking(fullBooking);
      setIsSending(true);
    } 
    catch {
      toast({
        title: "Något gick fel",
        description: "På grund av ett fel kunde din bokning inte uppdateras. Försök igen senare.",
      });
      setIsSending(false);
    }
    finally {
      toast({
        title: "Boking uppdaterad",
        description: "Din bokning har uppdaterats.",
      });
      setIsSending(false);
      router.push(`/dashboard/profile`);
    }
   }
  }

  async function sendNotification(values: BookingFormValues) {
    if (!push.isSubscribed || !push.deviceId) {
			return;
		}

    const message = `${values.name} bokade resa ${showNiceDates(values.dates?.from as Date, values.dates?.to as Date).withYear}`

    console.log('Sending message:', message);
    
    await sendPushNotification({
      deviceId: push.deviceId,
      title: 'Ny bokning',
      body: message,
      url: `https://stenbrottsvagen.se/dashboard/booking/${values.id}`,
    });
  }
}
