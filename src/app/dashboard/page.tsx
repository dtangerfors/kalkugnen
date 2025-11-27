import clsx from "clsx";
import { Suspense } from "react";
import Image from "next/image";
import { getDeviceType } from "@/lib/server-utils";
import { fetchPosts } from "@/lib/data";
import Weather from "@/components/weather";
import { Main, Section } from "@/components/dashboard/sections";
import BookingCard from "@/components/ui/booking-card";
import { PostsLoading } from "@/components/posts/posts-loading";
import { InfoPosts } from "@/components/posts/info-posts";
import FixedHeader from "@/components/dashboard/fixed-header";
import Logo from "@/components/logo";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button-primary";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export default async function DashboardIndex() {
  const { isMobile } = await getDeviceType();
  const user = await currentUser();
  // const posts = await fetchPosts();
  const upcomingBookings = await getBookingsDueWithin30Days();

  const bgImage = isMobile ? "/cover-vallmo-mobile.jpg" : "/cover-vallmo.jpg";

  return (
    <>
      {isMobile && <FixedHeader invisibleFromStart>
        <div className="w-8 fill-primary-300">
          <Logo />
        </div>
        </FixedHeader>}
        <div className={clsx("relative grid place-items-center overflow-hidden p-6", isMobile ? "h-[27.5rem] pt-safe-top" : "h-96")}>
          <figure className={clsx(isMobile ? "fixed inset-0 z-[1] h-dvh w-dvw" : "absolute inset-0 h-full w-full")}>
            <Image
              priority
              src={bgImage}
              alt="Ett grönt fält med blåeld"
              width={1920}
              height={1080}
              className="h-full w-full object-cover object-bottom"
            />
           <div className="fixed inset-0 h-full w-full bg-gradient-to-b from-black/30 from-[30rem] to-background to-[30rem]"></div>
          </figure>
          <div className="relative z-10 flex flex-col items-center">
            <Typography variant="xl" level="h1" color="text-white">
              Hej {user?.firstName}
            </Typography>
            <Weather lon="19.039444" lat="57.855" />
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
            <article
              key={post.id}
              className="flex flex-col flex-1 gap-6 overflow-hidden rounded-2xl p-4 pb-6 bg-white"
            >
              <header>
                <h2 className="text-xl text-foreground font-sans font-semibold">
                  {post.title.rendered}
                </h2>
              </header>
              <div
                className="wp-post-content"
              >
                <p>Just nu kan data inte läsas in från Wordpress.</p>
              </div>
              <footer className="mt-auto pt-8">
                <p className="text-sm text-foreground-1">
                  Publicerat av Daniel, 27 november 2025
                </p>
              </footer>
            </article>
            {/* <Suspense fallback={<PostsLoading />}>
              <InfoPosts data={posts} />
            </Suspense> */}
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
  const bookings = await prisma.booking.findMany({
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
          is_test_booking: false, 
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