import { showGuests, showNiceDates } from '@/lib/functions';
import Avatar from "../avatar";
import { NiceAvatarProps } from "../avatar/types";
import { BookingData } from "@/lib/types";
import Link from "next/link";

export default function BookingCard({booking}: {booking: BookingData}) {
  return (
    <Link href={`/dashboard/booking/${booking.id}`}  className="relative w-full flex gap-3 rounded-2xl p-4 bg-white text-left">
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
    </Link>
  )
}