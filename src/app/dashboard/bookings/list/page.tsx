import { prisma } from "@/lib/prisma";
import BookingCard from "@/components/ui/booking-card";
import { getDeviceType } from "@/lib/server-utils";
import { BookingsFixedHeader } from "../bookings-header";
import { cn, getMonthTitle, groupBookingsByMonth } from "@/lib/utils";
import { Typography } from "@/components/ui/typography";
import { NavSwitch } from "@/components/dashboard/nav-switch";

export default async function BookingsListPage() {
  const { isMobile } = await getDeviceType(); 
  const bookings = await prisma.booking.findMany({
    orderBy: {
      arrival: "desc"
    },
      include: {
        user: {
          select: {
            avatar: true
          }
        }
      },
      where: {
        is_canceled: false,
        is_test_booking: false,
      }
    });
  
  const sortedBookings = await groupBookingsByMonth(bookings);
  const links = [
    {href: "/dashboard/bookings", label: "Kalender"},
    {href: "/dashboard/bookings/list", label: "Lista"},
  ]
  
  return (
    <>
    {isMobile && (
      <BookingsFixedHeader label="Alla bokningar" />
    )}
    {!isMobile && 
      <div className="flex justify-center w-full p-4">
        <NavSwitch links={links} />
      </div>
    }
    <div className={cn("p-6 max-w-screen-sm mx-auto max-lg:pb-[6.5rem]", isMobile && "mt-20 pt-safe-top")}>
      {Object.entries(sortedBookings).map(([month, bookings]) => (
      <div key={month} className="mb-6 first:pt-6">
        <div className="flex justify-between mb-4 ml-4">
          <Typography variant="body" level="h2" color="text-black">{getMonthTitle(month)}</Typography>
        </div>
        <ul className="flex flex-col gap-3">
          {bookings.map((booking, i) => (
            <li key={`booking-${i}-${month}`}>
              <BookingCard booking={booking} />
            </li>
          ))}
        </ul>
      </div>
      ))}
    </div>
    </>
  )
}