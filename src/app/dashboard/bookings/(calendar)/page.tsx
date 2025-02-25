import { Suspense } from "react";
import clsx from "clsx";
import { getDeviceType } from "@/lib/server-utils";
import CalendarProvider from "./context";
import { CalendarView } from "./calendar-view";
import { BookingsInView } from "./bookings-in-view";
import { BookingEventSkeleton, CalendarSkeleton } from "@/components/skeletons";
import { prisma } from "@/lib/prisma";
import { BookingsFixedHeader } from "../bookings-header";
import { NavSwitch } from "@/components/dashboard/nav-switch";

export default async function CalendarPage() {
  const { isMobile } = await getDeviceType(); 
  const bookings = await prisma.booking.findMany({
    include: {
      user: {
        select: {
          avatar: true,
          user_color: true
        }
      }
    },
  });

  const links = [
    {href: "/dashboard/bookings", label: "Kalender"},
    {href: "/dashboard/bookings/list", label: "Lista"},
  ]

  return (
    <CalendarProvider bookings={bookings}>
      <div className={clsx(isMobile && "flex flex-col h-full bg-gradient-to-b from-white from-25% to-25% to-background")}>
        {isMobile && (
          <BookingsFixedHeader month />
        )}
        <div className={clsx("@container",!isMobile && "border-l bg-white", isMobile && "mt-20 pt-safe-top")}>
          <div className={clsx("flex flex-col @4xl:grid @4xl:grid-cols-3 w-full", !isMobile && "gap-6")}>
            <Suspense fallback={<CalendarSkeleton />}>
              <CalendarView bookings={bookings} isMobile={isMobile} />
            </Suspense>

            <div className={clsx("@container relative grow bg-background", !isMobile && "rounded-t-3xl @4xl:h-dvh @4xl:rounded-tr-none @4xl:rounded-l-3xl", isMobile && "pb-24")}>
              {!isMobile && 
                <div className="flex justify-center w-full p-4">
                  <NavSwitch links={links} />
                </div>
              }
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