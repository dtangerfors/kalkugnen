"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { addDays, format } from "date-fns";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { guests, rooms } from "@/lib/constants";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useAppContext } from "@/app/dashboard/app-context";
import { createBooking, updateBooking } from "./action";

const DialogComp = {
  Wrapper: Dialog,
  Content: DialogContent,
  Header: DialogHeader,
  Title: DialogTitle,
  Description: DialogDescription,
  Trigger: DialogTrigger,
};

const DrawerComp = {
  Wrapper: Drawer,
  Content: DrawerContent,
  Header: DrawerHeader,
  Title: DrawerTitle,
  Description: DrawerDescription,
  Trigger: DrawerTrigger,
};

export const formSchema = z.object({
  booking_name: z.string().optional(),
  name: z.string().min(2, {
    message: "Namnet måste innehålla minst två tecken.",
  }),
  guests: z.string().min(1, {
    message: "Minst en vuxen person behöver anges.",
  }),
  guests_children: z.string().optional(),
  dates: z
    .object({
      from: z.date(),
      to: z.date(),
    })
    .superRefine((data, ctx) => {
      if (data.from === undefined || data.to === undefined) {
        return ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Du måste välja ett start- och slutdatum.",
        });
      }
      return data;
    }),
  rooms: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Du måste välja minst ett rum.",
  }),
  message: z.string().max(1000).optional(),
});

export type BookingFormValues = {
  id?: string;
  user_id: string;
  created_at?: number;
  updated_at?: number;
} & z.infer<typeof formSchema>

export function BookingForm({bookingValues, isUpdatingBooking, isCreatingNewBooking}: {bookingValues?: BookingFormValues; isUpdatingBooking?: boolean; isCreatingNewBooking?: boolean;}) {
  const [open, setOpen] = useState(false);
  const { selectedDate } = useAppContext();
  const { toast } = useToast();
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const Comp = isDesktop ? DialogComp : DrawerComp;
  const calendarMonthToShow = isDesktop ? 2 : 1;
  const dateToday = new Date().toJSON().slice(0, 10);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      booking_name: bookingValues?.booking_name || "",
      name: bookingValues?.name || "",
      guests: bookingValues?.guests?.toString() || "1",
      guests_children: bookingValues?.guests_children?.toString() || "",
      dates: bookingValues?.dates || {
        from: new Date(selectedDate),
        to: addDays(new Date(selectedDate), 7),
      } || {
        from: new Date(dateToday),
        to: addDays(new Date(dateToday), 7),
      },
      rooms: bookingValues?.rooms || [],
      message: bookingValues?.message || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const fullBooking = {
      ...values,
      id: bookingValues?.id,
      user_id: bookingValues?.user_id || "",
      created_at: bookingValues?.created_at,
      updated_at: bookingValues?.updated_at,
    }
   if (isCreatingNewBooking) {
    createBooking(fullBooking);
   } else {
    try {
      updateBooking(fullBooking);
    } 
    catch {
      toast({
        title: "Något gick fel",
        description: "På grund av ett fel kunde din bokning inte uppdateras. Försök igen senare.",
      });
    }
    finally {
      toast({
        title: "Boking uppdaterad",
        description: "Din bokning har uppdaterats.",
      });
      router.push(`/dashboard/profile`);
    }
   }
  }

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
        <FormField
          control={form.control}
          name="dates"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resedatum</FormLabel>
              <Comp.Wrapper open={open} onOpenChange={setOpen}>
                <Comp.Trigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value?.from ? (
                        field.value.to ? (
                          <>
                            {format(field.value.from, "LLL dd, y")} -{" "}
                            {format(field.value.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(field.value.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Välj datum</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </Comp.Trigger>
                <Comp.Content className="w-auto">
                  <Comp.Header className="text-left">
                    <Comp.Title>Välj datum</Comp.Title>
                    <Comp.Description>
                      Markera dina önskade datum i kalendern nedan
                    </Comp.Description>
                  </Comp.Header>
                  <Calendar
                    mode="range"
                    numberOfMonths={calendarMonthToShow}
                    defaultMonth={field.value?.from}
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </Comp.Content>
              </Comp.Wrapper>
              <FormMessage />
            </FormItem>
          )}
        />

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
        <Button className="w-full" type="submit">{submitButtonLabel}</Button>
      </form>
    </Form>
  );
}
