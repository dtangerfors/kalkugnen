import { prisma } from "@/lib/prisma";
import BookingCard from "@/components/ui/booking-card";
import { getDeviceType } from "@/lib/server-utils";
import { BookingsFixedHeader } from "../bookings-header";
import { cn, getMonthTitle, groupBookingsByMonth } from "@/lib/utils";
import { Typography } from "@/components/ui/typography";

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
      }
    });
  
  const sortedBookings = await groupBookingsByMonth(bookings);
  
  return (
    <>
    {isMobile && (
      <BookingsFixedHeader label="Alla bokningar" />
    )}
    <div className={cn("p-6", isMobile && "mt-20 pt-safe-top")}>
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