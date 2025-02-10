"use server";

import { BookingFormValues } from ".";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function createBooking(values: BookingFormValues) {
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
  await prisma.booking.create({
    data: {
      user_id,
      booking_name,
      name,
      guests: parseInt(guests),
      guests_children: parseInt(guests_children || "0"),
      rooms,
      departure: dates.to,
      arrival: dates.from,
      message,
      created_at: parseInt(Date.now().toString()),
      updated_at: parseInt(Date.now().toString()),
    },
  });

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
        guests: parseInt(guests),
        guests_children: parseInt(guests_children || "0"),
        rooms,
        departure: dates.to,
        arrival: dates.from,
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
