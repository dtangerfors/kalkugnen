import FixedHeader from "@/components/dashboard/fixed-header";
import { BookingForm } from "@/components/forms/booking";
import { Typography } from "@/components/ui/typography";
import { getDeviceType } from "@/lib/server-utils";
import { currentUser } from "@clerk/nextjs/server";

export default async function CreateBookingPage() {
  const { isMobile } = await getDeviceType();
  const user = await currentUser();

  return (
    <>
    {isMobile && <FixedHeader label={"Skapa ny bokning"} invisibleFromStart />}
    <div className="pt-safe-top lg:p-6 max-lg:pb-24">
      <header className="max-w-screen-sm mx-auto p-6 lg:pt-20">
          <Typography level="h1" variant="xl" color="text-black">Skapa ny bokning</Typography>
      </header>
      <section>
        <div className="max-w-screen-sm mx-auto rounded-t-3xl lg:rounded-md overflow-hidden">
        <div className="bg-white p-6">
        <BookingForm isCreatingNewBooking bookingValues={{
          name: user?.fullName as string,
          user_id: user?.id as string,
        }} />
        </div>
        </div>
      </section>
    </div>
    </>
  )
}