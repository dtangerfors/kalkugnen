import FixedHeader from "@/components/dashboard/fixed-header";
import { BookingForm } from "@/components/forms/booking";
import { Typography } from "@/components/ui/typography";
import { prisma } from "@/lib/prisma";
import { getDeviceType } from "@/lib/server-utils";

export default async function UpdateBookingPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const { isMobile } = await getDeviceType();
  const booking = await fetchBooking(id)

  return (
      <>
      {isMobile && <FixedHeader label={"Uppdatera bokning"} invisibleFromStart />}
      <div className="pt-safe-top lg:p-6 max-lg:pb-24">
        <header className="max-w-screen-sm mx-auto p-6 lg:pt-20">
            <Typography level="h1" variant="xl" color="text-black">Uppdatera bokning</Typography>
        </header>
        <section>
          <div className="max-w-screen-sm mx-auto rounded-t-3xl lg:rounded-md overflow-hidden">
            <div className="bg-white p-6">
              <BookingForm bookingValues={booking} isUpdatingBooking isCreatingNewBooking={false} />
            </div>
          </div>
        </section>
      </div>
      </>
  )

}

async function fetchBooking(id: string) {
  const booking = await prisma.booking.findUnique({
    where: {
      id: id
    }
  });

  if (!booking) {
    throw new Error('Booking not found');
  }

  const bookingValues = {
    id: booking.id,
    booking_name: booking.booking_name as string | undefined,
    name: booking.name,
    guests: booking.guests.toString(),
    guests_children: booking.guests_children?.toString(),
    rooms: booking.rooms,
    dates: {
      from: new Date(booking.arrival),
      to: new Date(booking.departure)
    },
    message: booking.message as string | undefined,
    user_id: booking.user_id,
    created_at: Number(booking.created_at),
    updated_at: Number(booking.updated_at)
  }

  return bookingValues
}