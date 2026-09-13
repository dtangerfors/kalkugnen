import { Suspense } from "react";
import Image from "next/image";
import Weather from "@/components/weather";
import { Main, Section } from "@/components/dashboard/sections";
import BookingCard from "@/components/ui/booking-card";
import FixedHeader from "@/components/dashboard/fixed-header";
import Logo from "@/components/logo";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button-primary";
import { bookingDb } from "@/lib/booking-db";
import { currentUser } from "@clerk/nextjs/server";
import { InfoPosts } from "@/components/posts/info-posts";
import { infoPosts } from "@/lib/info-posts";

export default async function DashboardIndex() {
  const [user, upcomingBookings] = await Promise.all([
    currentUser(),
    getBookingsDueWithin30Days(),
  ]);

  return (
    <>
      <div className="lg:hidden">
        <FixedHeader invisibleFromStart>
          <div className="w-8 fill-primary-300">
            <Logo />
          </div>
        </FixedHeader>
      </div>
        <div className="relative grid place-items-center overflow-hidden p-6 h-[27.5rem] pt-safe-top lg:h-96 lg:pt-0">
          <figure className="fixed inset-0 z-[1] h-dvh w-dvw lg:absolute lg:h-full lg:w-full">
            <Image
              src="/visby-1920.jpg"
              alt="Ett grönt fält med blåeld"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
           <div className="fixed inset-0 h-full w-full bg-gradient-to-b from-black/30 from-[30rem] to-background to-[30rem]"></div>
          </figure>
          <div className="relative z-10 flex flex-col items-center">
            <Typography variant="xl" level="h1" color="text-white">
              Hej {user?.firstName}
            </Typography>
            <Suspense fallback={<p className="text-white text-sm">Laddar väderdata ...</p>}>
              <Weather lon="19.039444" lat="57.855" />
            </Suspense>
          </div>
        </div>
        <Main>
          <Section>
            <div className="flex justify-between mb-6">
              <Typography variant="body" level="h2" color="text-black">Kommande bokningar</Typography>
              <Button href={"/dashboard/bookings"} variant="secondary" size="small">Visa alla</Button>
            </div>
            <div className="@container">
              <div className="flex flex-col gap-3 @3xl:flex-row">
                {upcomingBookings
                  .map((booking) => (
                    <BookingCard
                    key={booking.id}
                    booking={booking}
                    />
                  ))}
              </div>
            </div>
          </Section>
          <Section>
            <div className="mb-6">
              <Typography variant="body" level="h2" color="text-black">Information</Typography>
            </div>
            <InfoPosts data={infoPosts} />
        </Section>
        </Main>
    </>
  );
}

async function getBookingsDueWithin30Days() {
  // Calculate the start and end of the range
  const today = new Date();
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(today.getDate() + 30);

  // Query the database
  const bookings = await bookingDb.findMany({
    take: 3,
    orderBy: {
      arrival: "asc",
    },
    include: {
      user: {
        select: {
          avatar: true
        }
      }
    },
    where: {
      AND: [
        { 
          is_canceled: false,
        }, // Exclude canceled bookings
        {
          arrival: {
            gte: today, // Greater than or equal to today
            lte: thirtyDaysFromNow, // Less than or equal to 30 days from today
          },
        },
      ],
    }
  });

  return bookings;
}