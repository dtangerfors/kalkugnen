"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/lib/prisma";
import { z } from 'zod';

const FormSchema = z.object({
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

export const completeOnboarding = async (formData: FormData) => {
  const { userId } = await auth();

  if (!userId) {
    return { message: "No Logged In User" };
  }

  const client = await clerkClient();
  const avatarId = uuidv4();

  const {shirtColor, shirtStyle, skinColor, earSize, eyeStyle, hairColor, hairStyle, noseStyle, mouthStyle, bgColor} = FormSchema.parse({
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
  })

  try {
    const user = await prisma.appUser.create({
      data: {
        id: userId,
        user_color: bgColor,
        avatar: {
          create: {
            id: avatarId,
            skinColor: skinColor,
            earSize: earSize,
            hairColor: hairColor,
            hairStyle: hairStyle,
            eyeStyle: eyeStyle,
            noseStyle: noseStyle,
            mouthStyle: mouthStyle,
            shirtStyle: shirtStyle,
            shirtColor: shirtColor,
            bgColor: bgColor,
          }
        }
      }
    });
    const res = await client.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
        avatarId: avatarId,
        user_role: "user"
      },
    });
    return { message: res.publicMetadata, user: user };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) {
    return { error: "There was an error updating the user metadata." };
  }
};
