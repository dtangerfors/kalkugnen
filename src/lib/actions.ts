"use server";

import { sql } from "@vercel/postgres";
import { z } from "zod";
import { CompleteRegistrationFormValues } from "./types";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "./prisma";
import { bookingDb } from "./booking-db";

// Mirrors the onboarding avatar schema so the allowed options stay in sync.
const UpdateAvatarSchema = z.object({
  skinColor: z.enum(["#F9C9B6", "#AC6651"]),
  earSize: z.enum(["attached", "detached"]),
  hairColor: z.enum(["#000", "#FFF", "#673D1D", "#F1E4CF", "#EDB06A"]),
  hairStyle: z.enum(["fonze", "pixie", "danny", "full"]),
  eyeStyle: z.enum(["eyes", "round", "smiling"]),
  noseStyle: z.enum(["pointed", "curve", "round"]),
  mouthStyle: z.enum(["laughing", "smile", "pucker"]),
  shirtStyle: z.enum(["crew", "collared", "open"]),
  shirtColor: z.enum(["#9EA576", "#71A4E9", "#DC87EB", "#E0B83F", "#E97171", "#E49953", "#99D04B", "#51BCDF"]),
  bgColor: z.enum(["sun", "sky", "lilac", "poppy", "jaffa", "ivy", "water"]),
});

export async function updateAvatar(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    return { error: "Ingen inloggad användare." };
  }

  const parsed = UpdateAvatarSchema.safeParse({
    skinColor: formData.get("skinColor"),
    earSize: formData.get("earSize"),
    hairColor: formData.get("hairColor"),
    hairStyle: formData.get("hairStyle"),
    eyeStyle: formData.get("eyeStyle"),
    noseStyle: formData.get("noseStyle"),
    mouthStyle: formData.get("mouthStyle"),
    shirtStyle: formData.get("shirtStyle"),
    shirtColor: formData.get("shirtColor"),
    bgColor: formData.get("bgColor"),
  });

  if (!parsed.success) {
    return { error: "Ogiltiga avatarval." };
  }

  try {
    // Update the avatar and keep AppUser.user_color in sync with bgColor,
    // since onboarding sets them together and the calendar reads user_color.
    await prisma.appUser.update({
      where: { id: userId },
      data: {
        user_color: parsed.data.bgColor,
        avatar: { update: parsed.data },
      },
    });
    revalidatePath("/dashboard/profile");
    return { message: "Avatar uppdaterad" };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { error: "Kunde inte uppdatera avataren." };
  }
}

const CreateUserSchema = z.object({
  uuid: z.string(),
  given_name: z.string(),
  family_name: z.string(),
  email: z.string(),
})

export async function createUser(data: CompleteRegistrationFormValues) {
  const {given_name, family_name, uuid, email} = CreateUserSchema.parse({
    given_name: data.given_name,
    family_name: data.family_name,
    uuid: data.uuid,
    email: data.email
  })

  const name = `${given_name} ${family_name}`;
  const user_role = "user";
  const user_color = "#e8e1f5";

  await sql `
    INSERT INTO users (id, name, given_name, family_name, email, user_role, user_color)
    VALUES (${uuid}, ${name}, ${given_name}, ${family_name}, ${email}, ${user_role}, ${user_color})
  `
  redirect('/signup/avatar');
}

export async function cancelBooking(id: string) {
  try {
    await bookingDb.update({
      where: {
        id: id
      },
      data: {
        is_canceled: true
      }
    });
    revalidatePath('/dashboard/profile');
    return { message: 'Avbokning bekräftad' };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { message: 'Database Error: Kunde inte genomföra avbokning.' };
  }
}

export async function fetchBooking(id: string) {
  const booking = await bookingDb.findUnique({
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