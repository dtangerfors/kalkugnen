import { getRoomName, showGuests, showNiceDates } from '@/lib/functions';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import Avatar from "../avatar";
import { NiceAvatarProps } from "../avatar/types";
import { BookingData } from "@/lib/types";
import { getBookingName } from "@/lib/utils";

export default function BookingCard({booking}: {booking: BookingData}) {
  return (
    <Drawer>
    <DrawerTrigger className="relative w-full flex gap-3 rounded-2xl p-4 bg-white text-left">
      <picture className="size-11 flex-shrink-0 rounded-full overflow-hidden">
        <Avatar {...booking.user.avatar as NiceAvatarProps} />
      </picture>
      <div className="flex grow flex-col">
        <p className="text-base font-sans font-semibold text-black">
          {booking.name}
        </p>
        <p className="text-sm font-sans text-black">
          {showGuests(booking.guests, booking.guests_children as number).total} • {booking.rooms.length} rum
        </p>
      </div>
      <div className="text-right">
        <p className="text-sm leading-6 font-sans text-gray-600">Datum</p>
        <p className="text-sm font-sans text-black">{showNiceDates(booking.arrival, booking.departure).withoutYear}</p>
      </div>
    </DrawerTrigger>
    <DrawerContent>
    <DrawerHeader className="flex flex-col items-center py-6">
    <picture className="size-16 flex-shrink-0 rounded-full bg-sky-200 overflow-hidden">
      <Avatar {...booking.user.avatar as NiceAvatarProps} />
    </picture>
      <DrawerTitle className="text-xl font-medium text-black">{getBookingName(booking)}</DrawerTitle>
      <DrawerDescription>{booking.name}</DrawerDescription>
    </DrawerHeader>
    <div className="px-6 w-full max-w-screen-sm mx-auto">
      <div className="flex justify-between items-center gap-4 pb-3">
        <div>
          <p className="text-sm leading-5 text-gray-600">Ankomst</p>
          <p className="text-xl leading-6 text-black">{showNiceDates(booking.arrival, booking.departure).arrival}</p>
        </div>
        <span className="flex-1 h-px bg-black"></span>
        <div className="text-right">
          <p className="text-sm leading-5 text-gray-600">Avresa</p>
          <p className="text-xl leading-6 text-black">{showNiceDates(booking.arrival, booking.departure).departure}</p>
        </div>
      </div>
      <div className="flex flex-col pt-4 pb-3 border-b border-gray-200">
        <p className="text-sm leading-5 text-gray-600">Gäster</p>
        <p className="text-base leading-6 text-black">{showGuests(booking.guests, booking.guests_children as number).divided}</p>
      </div>
      <div className="flex flex-col pt-4 pb-3 border-b border-gray-200">
        <p className="text-sm leading-5 text-gray-600">Rum</p>
        <p className="text-base leading-6 text-black">{getRoomName(booking.rooms)}</p>
      </div>
      {booking.message && <div className="flex flex-col pt-4 pb-3 border-b border-gray-200">
        <p className="text-sm leading-5 text-gray-600">Rum</p>
        <p className="text-base leading-6 text-black">{booking.message}</p>
      </div>}
    </div>
    <DrawerFooter className="max-w-screen-sm w-full mx-auto text-center pb-safe-bottom">
    <p className="text-sm leading-5 text-gray-600">Skapad {new Date(Number(booking.created_at)).toLocaleString("sv-SE")}</p>
    </DrawerFooter>
  </DrawerContent>
    </Drawer>
  )
}