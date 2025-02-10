"use client"
import { useEffect, useState } from 'react';
import { BookingData, SortedBooking } from '@/lib/types';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { showGuests, showNiceDates } from "@/lib/functions";
import { ChevronDown } from "lucide-react";

export function UserTableRow({ bookings }: { bookings: BookingData[] }) {
  const [bookingsByYear, setBookingsByYear] = useState<SortedBooking>({});
  const currentYear = new Date().getFullYear();
  const lastYear = new Date().getFullYear() - 1;

  useEffect(() => {
    setBookingsByYear(sortBookingsByYear(bookings));
  }, [bookings]);

  return (
    <Collapsible>
      <div className="flex w-full items-center p-3 pl-0 text-right font-medium leading-none text-black">
        <span className="flex-1 truncate pr-4 text-left leading-9">
          {bookings[0].name}
        </span>
        <span className="w-14 px-4">
          {bookingsByYear[currentYear] ? bookingsByYear[currentYear].length : 0}
        </span>
        <span className="w-14 px-4">
          {bookingsByYear[lastYear] ? bookingsByYear[lastYear].length : 0}
        </span>
        <CollapsibleTrigger className="relative grid place-items-center size-10 rounded-full bg-transparent text-black hover:bg-gray-100 transition-all data-[state=open]:rotate-180">
          <ChevronDown size={16} strokeWidth={3} />
        </CollapsibleTrigger>
      </div>

        <CollapsibleContent className="CollapsibleContent">
          {Object.values(bookingsByYear).reverse().map((bookings) => <RowsByYear data={bookings} key={`row-${bookings[0].id}`} />)}
        </CollapsibleContent>
    </Collapsible>
  );

  function sortBookingsByYear(bookings: BookingData[]) {
    const groupedBookings: SortedBooking = {};

    bookings.forEach((booking) => {
      const year = new Date(booking.arrival).getFullYear();

      if (!groupedBookings[year]) {
        groupedBookings[year] = [];
      }

      groupedBookings[year].push(booking);
    });

    return groupedBookings;
  }
}

function RowsByYear({data}: { data: BookingData[] }) {
  return (
    <div className="text-sm mb-8 w-full first:mt-4 last:mb-4">
      <div className="flex pr-4 text-right font-bold text-foreground">
        <span className="w-1/3 text-left">
          {new Date(data[0].arrival).getFullYear()}
        </span>
        <span className="flex-1">Dagar</span>
        <span className="flex-1">Gäster</span>
      </div>
      {data.map((booking, i) => (
        <div
          key={`booking-${booking.user_id}-${i}`}
          className="dark:bg-black-700 mb-1 flex w-full rounded-lg bg-foreground-2 py-1.5 pr-4 text-xs text-right text-foreground"
        >
          <span className="flex-1 text-left">
            {showNiceDates(booking.arrival, booking.departure).withYear}
          </span>
          <span className="flex-1">
            {totalDays(booking.arrival, booking.departure)}
          </span>
          <span className="flex-1">{showGuests(booking.guests, booking.guests_children!).divided}</span>
        </div>
      ))}
    </div>
  );
  function totalDays(arrival: Date, departure: Date) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(arrival).valueOf();
    const secondDate = new Date(departure).valueOf();
  
    return Math.round(Math.abs((firstDate - secondDate) / oneDay));
  }
}
