"use client";
import { BookingData } from "@/lib/types";
import { useEffect, useState } from "react";
import { UserTableRow } from "./user-table-row";

type SortedBookings = {
  [user_id: string]: BookingData[];
};

export function UserTable({ bookings }: { bookings: BookingData[] }) {
  const [bookingsByUser, setBookingsByUser] = useState<SortedBookings>({});
  const currentYear = new Date().getFullYear();
  const lastYear = new Date().getFullYear() - 1;

  useEffect(() => {
    setBookingsByUser(sortBookingsByUserId(bookings));
  }, [bookings]);

  return (
    <div className="w-full mx-auto text-sm">
      <div className="flex px-4 text-right font-bold mb-3">
        <span className="flex-1 text-left">Användare</span>
        <span className="w-14 pr-4">{currentYear}</span>
        <span className="w-14 pr-4">{lastYear}</span>
        <span className="w-10"></span>
      </div>

      <ul className="rounded-2xl overflow-hidden pl-4 bg-white">
        {Object.entries(bookingsByUser).map((bookings, i) => (
          <li
            key={`table-row-${i}`}
            className="border-b border-gray-100 last:border-none"
          >
            <UserTableRow bookings={bookings[1]} />
          </li>
        ))}
      </ul>
    </div>
  );

  function sortBookingsByUserId(bookings: BookingData[]): SortedBookings {
    const sortedBookings: SortedBookings = {};

    bookings.forEach((booking) => {
      const user_id = booking.user_id;

      if (!sortedBookings[user_id]) {
        sortedBookings[user_id] = [];
      }

      sortedBookings[user_id].push(booking);
    });

    return sortedBookings;
  }
}
