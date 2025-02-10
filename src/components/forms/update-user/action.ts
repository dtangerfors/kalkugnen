"use server"

import { z } from "zod";
import { formSchema } from ".";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateUserData(values: z.infer<typeof formSchema>) {
  const { user_id, user_role, family_id } = values
  await prisma.appUser.update({
    where: {
      id: user_id,
    },
    data: {
     user_role,
     family_id
    }
  })

  revalidatePath("/dashboard/admin");
}