"use server";

import { Avatar } from "@prisma/client";
import { sql } from "@vercel/postgres";
import { z } from "zod";
import { CompleteRegistrationFormValues } from "./types";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";

const AvatarSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  skinColor: z.string(),
  earSize: z.string(),
  hairColor: z.string(),
  hairStyle: z.string(),
  eyeStyle: z.string(),
  noseStyle: z.string(),
  mouthStyle: z.string(),
  shirtStyle: z.string(),
  shirtColor: z.string(),
  bgColor: z.string(),
});

const CreateAvatar = AvatarSchema.omit({id: true});
const UpdateAvatar = AvatarSchema.omit({user_id: true});

export async function createAvatar(data: Avatar) {
  const {user_id, earSize, eyeStyle, hairColor, hairStyle, shirtColor, shirtStyle, noseStyle, mouthStyle, skinColor, bgColor} = CreateAvatar.parse({
    user_id: data.user_id,
    skinColor: data.skinColor,
    earSize: data.earSize,
    eyeStyle: data.eyeStyle,
    noseStyle: data.noseStyle,
    mouthStyle: data.mouthStyle,
    hairColor: data.hairColor,
    hairStyle: data.hairStyle,
    shirtColor: data.shirtColor,
    shirtStyle: data.shirtStyle,
    bgColor: data.bgColor
  });

  await sql`
    INSERT INTO Avatar (user_id, skinColor, earSize, eyeStyle, noseStyle, mouthStyle, hairColor, hairStyle, shirtColor, shirtStyle, bgColor)
    VALUES (${user_id}, ${skinColor}, ${earSize}, ${eyeStyle}, ${noseStyle}, ${mouthStyle}, ${hairColor}, ${hairStyle}, ${shirtColor}, ${shirtStyle}, ${bgColor})    
  `
}

export async function updateAvatar(data: Avatar) {
  const {id, earSize, eyeStyle, hairColor, hairStyle, shirtColor, shirtStyle, noseStyle, mouthStyle, skinColor, bgColor} = UpdateAvatar.parse({
    id: data.id,
    skinColor: data.skinColor,
    earSize: data.earSize,
    eyeStyle: data.eyeStyle,
    noseStyle: data.noseStyle,
    mouthStyle: data.mouthStyle,
    hairColor: data.hairColor,
    hairStyle: data.hairStyle,
    shirtColor: data.shirtColor,
    shirtStyle: data.shirtStyle,
    bgColor: data.bgColor
  });

  await sql`
    UPDATE Avatar
    SET 
      skinColor = ${skinColor},
      earSize = ${earSize},
      eyeStyle = ${eyeStyle},
      noseStyle = ${noseStyle},
      mouthStyle = ${mouthStyle},
      hairColor = ${hairColor},
      hairStyle = ${hairStyle},
      shirtColor = ${shirtColor},
      shirtStyle = ${shirtStyle}
      bgColor = ${bgColor}
    WHERE id = ${id}
`;
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
    await prisma.booking.update({
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