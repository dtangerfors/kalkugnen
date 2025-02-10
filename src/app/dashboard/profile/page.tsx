import FixedHeader from "@/components/dashboard/fixed-header";
import { Typography } from "@/components/ui/typography";
import { prisma } from "@/lib/prisma";
import { getDeviceType } from "@/lib/server-utils";
import clsx from "clsx";
import AvatarEdit from "./avatar-edit";
import { sortBookingsByYear } from "@/lib/utils";
import { BookingData } from "@/lib/types";
import { Main, Section } from "@/components/dashboard/sections";
import ProfileBookingCard from "@/components/ui/profile-booking-card";
import { currentUser } from "@clerk/nextjs/server";
import { NiceAvatarProps } from "@/components/avatar/types";

export default async function ProfilePage() {
  const { isMobile } = await getDeviceType();
  const user = await currentUser();
  
  const avatar = await prisma.avatar.findUnique({
    where: {
      id: user?.publicMetadata.avatarId as string
    }
  })

  const bookings = await prisma.booking.findMany({
    where: {
      user_id: user?.id
    }, 
    include: {
      user: {
        select: {
          avatar: true
        }
      }
    },
    orderBy: {
      arrival: "desc",
    }
  })

  const groupedBookings = await sortBookingsByYear(bookings as BookingData[])
  
  return (
    <>
      {isMobile && <FixedHeader label={user?.fullName} />}
      <div className={clsx("relative", isMobile && "mt-14 pt-safe-top")}>
        <header className={clsx("relative bg-primary p-6 pb-20")}>
          <div className="flex flex-col items-center gap-6 max-w-screen-sm mx-auto">
            <AvatarEdit config={avatar as NiceAvatarProps}/>
            <Typography level="h1" variant="xl" color="text-white">{user?.fullName}</Typography>
          </div>
        </header>
      </div>
      <Main>
        <Section>
          {Object.entries(groupedBookings).reverse().map(([year, bookings]) => (
          <div key={year} className="mb-6">
            <div className="flex justify-between mb-4 ml-4">
              <Typography variant="body" level="h2" color="text-black">Bokningar {year}</Typography>
            </div>
            <ul className="rounded-2xl overflow-hidden pl-4 bg-white">
              {bookings.map((booking, i) => (
                <li key={`booking-${i}-${year}`} className="border-b border-gray-100 last:border-none">
                  <ProfileBookingCard booking={booking} />
                </li>
              ))}
            </ul>
          </div>
          ))}
        </Section>
      </Main>
    </>
  );
}
