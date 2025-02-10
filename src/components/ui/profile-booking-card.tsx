"use client"
import { BookingData } from "@/lib/types";
import { getRoomName, showGuests, showNiceDates } from "@/lib/functions";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Maximize2 } from "lucide-react";
import { cn, getBookingName } from "@/lib/utils";
import { Button } from "./button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cancelBooking } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";

export default function ProfileBookingCard({
  booking,
}: {
  booking: BookingData;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const cancelBookingWithId = cancelBooking.bind(null, booking.id);
  const isDepartureNotDatePassed = new Date(booking.departure) > new Date();

  const handleCancelBooking = async () => {
    const {message} = await cancelBookingWithId();
    setDialogOpen(false);
    setOpen(false);

    toast({
      description: message,
    })
  }

  const handleClick = () => {
    setOpen(false);
    router.push(`/dashboard/booking/${booking.id}/edit`);
  }

  return (
    <>
    <Drawer open={open} onOpenChange={setOpen}>
      <div className="relative w-full flex items-center gap-3 p-4 pl-0 bg-white text-left">
        <div className="flex grow flex-col">
          <p
            className={cn(
              "text-base font-sans font-semibold",
              booking.is_canceled ? "text-gray-600" : "text-black"
            )}
          >
            {getBookingName(booking)}
          </p>
          <p className={cn(
              "text-sm font-sans",
              booking.is_canceled ? "text-gray-600" : "text-black"
            )}
            >
            {showNiceDates(booking.arrival, booking.departure).withoutYear}
          </p>
        </div>
        {!booking.is_canceled && (
          <div className="ml-auto">
            <DrawerTrigger className="relative grid place-items-center size-11 rounded-full bg-gray-50 text-black hover:bg-gray-100">
              <span className="sr-only">Klicka för att visa bokning</span>
              <Maximize2 size={16} strokeWidth={3} />
            </DrawerTrigger>
          </div>
        )}
      </div>
      {!booking.is_canceled && (
        <DrawerContent>
          <DrawerHeader className="flex flex-col items-center py-6">
            <DrawerTitle className="text-xl font-medium text-black">
              {getBookingName(booking)}
            </DrawerTitle>
            <DrawerDescription>
              {booking.name}
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-6 w-full max-w-screen-sm mx-auto">
            <div className="flex justify-between items-center gap-4 pb-3">
              <div>
                <p className="text-sm leading-5 text-gray-600">Ankomst</p>
                <p className="text-xl leading-6 text-black">
                  {showNiceDates(booking.arrival, booking.departure).arrival}
                </p>
              </div>
              <span className="flex-1 h-px bg-black"></span>
              <div className="text-right">
                <p className="text-sm leading-5 text-gray-600">Avresa</p>
                <p className="text-xl leading-6 text-black">
                  {showNiceDates(booking.arrival, booking.departure).departure}
                </p>
              </div>
            </div>
            <div className="flex flex-col pt-4 pb-3 border-b border-gray-200">
              <p className="text-sm leading-5 text-gray-600">Gäster</p>
              <p className="text-base leading-6 text-black">
                {showGuests(booking.guests, booking.guests_children as number).divided}
              </p>
            </div>
            <div className="flex flex-col pt-4 pb-3 border-b border-gray-200">
              <p className="text-sm leading-5 text-gray-600">Rum</p>
              <p className="text-base leading-6 text-black">
                {getRoomName(booking.rooms)}
              </p>
            </div>
            {booking.message && (
              <div className="flex flex-col pt-4 pb-3 border-b border-gray-200">
                <p className="text-sm leading-5 text-gray-600">Rum</p>
                <p className="text-base leading-6 text-black">
                  {booking.message}
                </p>
              </div>
            )}
          </div>
          <DrawerFooter className="max-w-screen-sm w-full mx-auto text-center pb-safe-bottom">
            {isDepartureNotDatePassed && <div className="flex gap-4 justify-center">
              <Button onClick={() => setDialogOpen(true)} variant="outline">Avboka</Button>
              <Button onClick={handleClick}>Redigera</Button>
            </div>}
            <p className="text-sm leading-5 text-gray-600">
              Skapad{" "}
              {new Date(Number(booking.created_at)).toLocaleString("sv-SE")}
            </p>
          </DrawerFooter>
        </DrawerContent>
      )}
    </Drawer>
    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Avboka resa</AlertDialogTitle>
          <AlertDialogDescription>
          Genom att avboka tas bort bokning bort ur systemet. 
          Du kan fortfarande se den på din profil, men den kan inte återupptas.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Avbryt</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive" onClick={() => handleCancelBooking()}>Avboka resa</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  );
}
