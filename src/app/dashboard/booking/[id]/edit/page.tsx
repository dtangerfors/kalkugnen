import FixedHeader from "@/components/dashboard/fixed-header";
import { BookingForm } from "@/components/forms/booking";
import { Typography } from "@/components/ui/typography";
import { fetchBooking } from "@/lib/actions";
import { getDeviceType } from "@/lib/server-utils";
import { currentUser } from "@clerk/nextjs/server";

export default async function UpdateBookingPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const { isMobile } = await getDeviceType();
  const booking = await fetchBooking(id);
  const user = await currentUser();

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
              <BookingForm bookingValues={booking} email={user?.primaryEmailAddress?.emailAddress} isUpdatingBooking isCreatingNewBooking={false} />
            </div>
          </div>
        </section>
      </div>
      </>
  )

}