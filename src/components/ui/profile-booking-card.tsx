"use client"
import { BookingData } from "@/lib/types";
import { showNiceDates } from "@/lib/functions";
import { Maximize2 } from "lucide-react";
import { cn, getBookingName } from "@/lib/utils";
import Link from "next/link";

export default function ProfileBookingCard({
  booking,
}: {
  booking: BookingData;
}) {

  return (
    <>
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
            <Link href={`/dashboard/booking/${booking.id}`} className="relative grid place-items-center size-11 rounded-full bg-gray-50 text-black hover:bg-gray-100">
              <span className="sr-only">Klicka för att visa bokning</span>
              <Maximize2 size={16} strokeWidth={3} />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
