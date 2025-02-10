"use client"

import { BookingData } from "@/lib/types";
import { createContext, useContext, useEffect, useState } from "react"

type CalendarContext = {
  currentMonth: string;
  bookingsThisMonth: BookingData[];
  setCurrentMonth: React.Dispatch<React.SetStateAction<string>>;
  setCurrentCalendarDate: React.Dispatch<React.SetStateAction<Date>>,
  setBookingsThisMonth: React.Dispatch<React.SetStateAction<BookingData[]>>,
}

const CalendarContext = createContext<CalendarContext>({} as CalendarContext);

export default function CalendarProvider({bookings, children}: {bookings: BookingData[], children: React.ReactNode}) {

  const date = new Date();
  const year = date.getFullYear();
  const monthIndex = date.getMonth();
  const months = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"]
  const [currentMonth, setCurrentMonth] = useState(`${months[monthIndex]} ${year}`);
  const [currentCalendarDate, setCurrentCalendarDate] = useState<Date>(new Date);
  const [bookingsThisMonth, setBookingsThisMonth] = useState<BookingData[]>([]);

  useEffect(() => {
    const bookings = getCurrentBookings(currentCalendarDate);
    setBookingsThisMonth(bookings)
  }, [currentCalendarDate])

  return (
    <CalendarContext.Provider value={{currentMonth, bookingsThisMonth, setCurrentMonth, setBookingsThisMonth, setCurrentCalendarDate}}>
      {children}
    </CalendarContext.Provider>
  )

  function getCurrentBookings(date: Date) {
    const currentDateInView = new Date(date);
    const monthInView = currentDateInView.getMonth();
    const yearInView = currentDateInView.getFullYear();

    const filteredBookings = bookings.filter((booking) => {
      const bookingArrivalYear = new Date(booking.arrival).getFullYear();
      const bookingDepartureYear = new Date(booking.departure).getFullYear();
      const bookingArrivalMonth = new Date(booking.arrival).getMonth();
      const bookingDepartureMonth = new Date(booking.departure).getMonth();

      return (
        (yearInView === bookingArrivalYear ||
          yearInView === bookingDepartureYear) &&
        (monthInView === bookingArrivalMonth ||
          monthInView === bookingDepartureMonth)
      );
    });

    return filteredBookings
  }
}

export function useCalendarContext() {
  return useContext(CalendarContext)
}