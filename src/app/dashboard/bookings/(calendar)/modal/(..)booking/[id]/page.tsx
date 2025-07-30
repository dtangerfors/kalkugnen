import {
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { getRoomName, showGuests, showNiceDates } from "@/lib/functions";
import { getBookingName } from "@/lib/utils";
import { notFound } from "next/navigation";
import { CancelBookingDialog } from "@/components/modal/cancel-booking";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Avatar from "@/components/avatar";
import { NiceAvatarProps } from "@/components/avatar/types";
import { currentUser } from "@clerk/nextjs/server";

// Force dynamic page
export const dynamic = "force-dynamic";
export const revalidate = 0;

// Page
export default async function UniqueBookingModalPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = params.id;
  const user = await currentUser();
  const booking = await prisma.booking.findUnique({
    where: {
      id: id,
      is_test_booking: false,
    },
    include: {
      user: {
        include: {
          avatar: true
        }
      }
    }
  })

  // If params is not valid (booking is not available)
  if (!booking) {
    return notFound();
  }

  const isDepartureNotDatePassed = new Date(booking.departure) > new Date();
  const loggedInUserIsAsSameAsBookingOwner = user?.id === booking.user_id;

  // Valid
  return (
    <>
      <DrawerHeader className="flex flex-col items-center py-6">
        <picture className="size-20 flex-shrink-0 rounded-full overflow-hidden">
          <Avatar {...booking.user.avatar as NiceAvatarProps} />
        </picture>
        <DrawerTitle className="text-xl font-medium text-black">
          {booking.name}
        </DrawerTitle>
        <DrawerDescription>
          {getBookingName(booking)}
        </DrawerDescription>
      </DrawerHeader>
      <div className="px-6 w-full max-w-screen-sm mx-auto">
        <div className="flex justify-between items-center gap-4 pb-3">
          <div>
            <p className="text-sm leading-5 text-gray-600">Ankomst</p>
            <p className="text-xl leading-6 text-black">
              {showNiceDates(booking.arrival, booking.departure).arrival}
            </p>
          </div>
          <span className="flex-1 h-px bg-black"></span>
          <div className="text-right">
            <p className="text-sm leading-5 text-gray-600">Avresa</p>
            <p className="text-xl leading-6 text-black">
              {showNiceDates(booking.arrival, booking.departure).departure}
            </p>
          </div>
        </div>
        <div className="flex flex-col pt-4 pb-3 border-b border-gray-200">
          <p className="text-sm leading-5 text-gray-600">Gäster</p>
          <p className="text-base leading-6 text-black">
            {
              showGuests(booking.guests, booking.guests_children as number)
                .divided
            }
          </p>
        </div>
        <div className="flex flex-col pt-4 pb-3 border-b border-gray-200">
          <p className="text-sm leading-5 text-gray-600">Rum</p>
          <p className="text-base leading-6 text-black">
            {getRoomName(booking.rooms)}
          </p>
        </div>
        {booking.message && (
          <div className="flex flex-col pt-4 pb-3 border-b border-gray-200">
            <p className="text-sm leading-5 text-gray-600">Rum</p>
            <p className="text-base leading-6 text-black">{booking.message}</p>
          </div>
        )}
      </div>
      <DrawerFooter className="max-w-screen-sm w-full px-6 mx-auto text-center pb-safe-bottom">
        {isDepartureNotDatePassed && loggedInUserIsAsSameAsBookingOwner && (
          <div className="flex flex-col gap-4 lg:flex-row justify-center">
            <CancelBookingDialog bookingId={booking.id} />
            <Button asChild>
              <Link href={`/dashboard/booking/${booking.id}/edit`}>
                Redigera
              </Link>
            </Button>
          </div>
        )}

        <p className="text-sm leading-5 text-gray-600">
          Skapad {new Date(Number(booking.created_at)).toLocaleString("sv-SE")}
        </p>
      </DrawerFooter>
    </>
  );
}
