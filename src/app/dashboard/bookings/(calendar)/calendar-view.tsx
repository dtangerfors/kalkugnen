"use client"

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useCalendarContext } from "@/app/dashboard/bookings/(calendar)/context";
import { BookingData, BookingEvent, ColorType } from "@/lib/types";
import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import { format, parse, startOfWeek, getDay } from 'date-fns';
import {sv} from "date-fns/locale/sv";

import "./calendar-styles.css";
import { useAppContext } from "@/app/dashboard/app-context";
import clsx from "clsx";
import { getRawColor } from "@/lib/functions";

export function CalendarView({bookings, isMobile}: {bookings: BookingData[], isMobile: RegExpMatchArray | null}) {
  const router = useRouter();
  const [events, setEvents] = useState<BookingEvent[]>([]);
  const { setCurrentMonth, setCurrentCalendarDate } = useCalendarContext();
  const { setSelectedDate } = useAppContext();
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const dateNow = new Date;
    const bookingsToState: BookingEvent[] = [];
    bookings.forEach((booking: BookingData) => {
      bookingsToState.push({
        title: booking.name,
        start: new Date(booking.arrival),
        end: new Date(booking.departure),
        ...booking,
      })
    })

    setCurrentCalendarDate(dateNow);
    setEvents(bookingsToState);

  }, [bookings])

  const eventStyleGetter = (
    event: BookingEvent,
  ) => {
    const style = {
      backgroundColor: getRawColor(event.user.user_color as ColorType),
    };
    return {
      style: style,
    };
  };

  const formats = {
    weekdayFormat: "EEE",
  };

  const onDrillDown = useCallback((newDate: Date) => {
    setSelectedDate(newDate.toLocaleDateString());
    router.push("/dashboard/booking/create");
  }, [setSelectedDate, router])

  const onNavigate = useCallback((newDate: Date) => {
    const currentDateInView = new Date(newDate);
    const monthInView = currentDateInView.getMonth();
    const yearInView = currentDateInView.getFullYear();

    setDate(currentDateInView);
    setCurrentCalendarDate(currentDateInView);
    setCurrentMonth(`${months[monthInView]} ${yearInView}`)
  }, [setCurrentMonth, setCurrentCalendarDate])

  return (
    <div className={clsx("relative md:col-span-2 transition-all bg-white", isMobile ? "p-0" : "p-6")}>
      <Calendar
        culture="sv"
        date={date}
        localizer={localizer}
        messages={messages}
        events={events}
        formats={formats}
        eventPropGetter={eventStyleGetter}
        onNavigate={onNavigate}
        onDrillDown={onDrillDown}
      />
   </div>
  )

}

const locales = {
  sv: sv
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
})

const messages = {
  allDay: "Hela dagen",
  previous: "Föregående",
  next: "Nästa",
  today: "Idag",
  month: "Månad",
  week: "Vecka",
  day: "Dag",
  agenda: "Agenda",
  date: "Datum",
  time: "Tid",
  event: "Händelse",
};

const months = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"]