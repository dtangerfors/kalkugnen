"use server";

import { BookingFormValues } from ".";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { sendEmail } from "@/app/api/emails/sendEmail";

export async function createBooking(values: BookingFormValues, email: string | undefined) {
  const {
    booking_name,
    name,
    guests,
    guests_children,
    rooms,
    dates,
    message,
    user_id,
  } = values;

  const created_at = Date.now();
  const updated_at = Date.now();

  await prisma.booking.create({
    data: {
      user_id,
      booking_name,
      name: name!,
      guests: parseInt(guests!),
      guests_children: parseInt(guests_children || "0"),
      rooms,
      departure: dates!.to,
      arrival: dates!.from,
      message,
      created_at: parseInt(created_at.toString()),
      updated_at: parseInt(updated_at.toString()),
    },
  });

  try {
    if (!email) return;
    await sendEmail({
      booking: {
        ...values
      },
      email
    });
  } catch (emailError) {
    console.error('Failed to send confirmation email:', emailError);
    // Continue with the booking process even if email fails
  }

  redirect("/dashboard/booking/completed");
}

export async function updateBooking(values: BookingFormValues) {
  const {
    id,
    booking_name,
    name,
    guests,
    guests_children,
    rooms,
    dates,
    message,
    user_id,
    created_at,
  } = values;
  try {
    await prisma.booking.update({
      where: {
        id: id,
      },
      data: {
        user_id,
        booking_name,
        name,
        guests: parseInt(guests!),
        guests_children: parseInt(guests_children || "0"),
        rooms,
        departure: dates!.to,
        arrival: dates!.from,
        message,
        created_at,
        updated_at: parseInt(Date.now().toString()),
      },
    });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === "P2002") {
        console.log(
          "There is a unique constraint violation, a new user cannot be created with this email"
        );
      }
    }
    throw e;
  }
}
