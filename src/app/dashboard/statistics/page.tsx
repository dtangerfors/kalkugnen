import FixedHeader from "@/components/dashboard/fixed-header";
import { prisma } from "@/lib/prisma";
import { getDeviceType } from "@/lib/server-utils";
import { cn } from "@/lib/utils";
import { Tile } from "./tile";
import { thisYear, getTotalGuestsThisYear, getTotalDaysThisYear } from './utils';
import clsx from "clsx";
import { BookOpenText, CalendarDaysIcon, Ticket, Users } from "lucide-react";
import { Main, Section } from "@/components/dashboard/sections";
import { UserTable } from "./user-table";
import { Typography } from "@/components/ui/typography";

export default async function StatisticsPage() {
  const { isMobile } = await getDeviceType();
  const bookings = await prisma.booking.findMany({
    include: {
      user: {
        select: {
          avatar: true,
          user_color: true,
        }
      }
    },
    where: {
      AND: [
        { 
          is_canceled: false,
          is_test_booking: false, }, // Exclude canceled bookings
      ],
    }
  });
  const currentYear = new Date().getFullYear();

  return (
    <>
      {isMobile && <FixedHeader label="Statistik" />}
      <header className={cn("bg-primary pt-safe-top", isMobile && "mt-14")}>
        <div className="p-6 pb-10 flex items-end">
          <Typography level="h1" variant="xl" color="text-white">Statistik</Typography>
        </div>
      </header>
      <div className={cn("relative bg-primary px-6 pb-12")}>
        <div className={clsx("grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 pt-6")}>
          <Tile 
            number={bookings.filter(thisYear).length} 
            text={`Bokningar ${currentYear}`} 
            icon={<Ticket />} 
          />
          <Tile
            number={getTotalGuestsThisYear(bookings)}
            text={`Gäster ${currentYear}`}
            icon={<Users />}
          />
          <Tile
            number={getTotalDaysThisYear(bookings)}
            text={`Bokade dagar ${currentYear}`}
            icon={<CalendarDaysIcon />}
          />
          <Tile 
            number={bookings.length} 
            text={`Bokningar totalt`} 
            icon={<BookOpenText />} 
          />
        </div>
      </div>
      <Main>
        <Section>
        <div>
          <UserTable bookings={bookings} />
        </div>
        </Section>
      </Main>
    </>
  )
}