import { Suspense } from "react";
import CalendarProvider from "./context";
import { CalendarView } from "./calendar-view";
import { BookingsInView } from "./bookings-in-view";
import { BookingEventSkeleton, CalendarSkeleton } from "@/components/skeletons";
import { prisma } from "@/lib/prisma";
import { BookingsFixedHeader } from "../bookings-header";
import { NavSwitch } from "@/components/dashboard/nav-switch";

export default async function CalendarPage() {
  const bookings = await prisma.booking.findMany({
    include: {
      user: {
        select: {
          avatar: true,
          user_color: true
        }
      }
    },
    where: {
      is_canceled: false,
      is_test_booking: process.env.NODE_ENV === 'development',
    }
  });

  const links = [
    {href: "/dashboard/bookings", label: "Kalender"},
    {href: "/dashboard/bookings/list", label: "Lista"},
  ]

  return (
    <CalendarProvider bookings={bookings}>
      <div className="max-lg:flex max-lg:flex-col max-lg:h-full max-lg:bg-gradient-to-b max-lg:from-white max-lg:from-25% max-lg:to-25% max-lg:to-background">
        <div className="lg:hidden">
          <BookingsFixedHeader month />
        </div>
        <div className="@container lg:border-l lg:bg-white max-lg:mt-20 max-lg:pt-safe-top">
          <div className="flex flex-col @4xl:grid @4xl:grid-cols-3 w-full lg:gap-6">
            <Suspense fallback={<CalendarSkeleton />}>
              <CalendarView bookings={bookings} />
            </Suspense>

            <div className="@container relative grow bg-background lg:rounded-t-3xl @4xl:h-dvh @4xl:rounded-tr-none @4xl:rounded-l-3xl max-lg:pb-24">
              <div className="hidden lg:flex justify-center w-full p-4">
                <NavSwitch links={links} />
              </div>
              <Suspense fallback={<BookingEventSkeleton />}>
                <BookingsInView />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </CalendarProvider>
  )
}