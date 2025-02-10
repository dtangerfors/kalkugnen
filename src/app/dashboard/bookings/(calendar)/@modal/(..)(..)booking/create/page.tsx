
import { BookingForm } from "@/components/forms/booking";
import { currentUser } from "@clerk/nextjs/server";
import { BookingDrawer } from "./drawer";

export default async function CreateBookingPage() {
  const user = await currentUser();

  return (
    <BookingDrawer title="Skapa ny bokning">
      <BookingForm bookingValues={{
        name: user?.fullName as string,
        user_id: user?.id as string,
      }} />
    </BookingDrawer>
  )
}