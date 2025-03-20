import { Hero, Main, Section } from "@/components/dashboard/sections";
import { UserTable } from "./user-table";
import { Typography } from "@/components/ui/typography";
import { clerkBackend } from "@/lib/clerk";
import { prisma } from "@/lib/prisma";
import { $Enums } from "@prisma/client";

export default async function AdminPage() {
  const users = await getCombinedUserData();
  const families = await prisma.family.findMany();

  return (
    <>
      <Hero title="Admin" />
      <Main>
        <Section>
        <div className="lg:hidden min-h-52 rounded-2xl bg-surface p-6 grid place-items-center">
          <p className="text-center">Din skärm är för liten för att kunna visa detta innehåll.</p>
        </div>
        <div className="max-lg:hidden">
          <div className="flex justify-between mb-3 pl-6">
            <Typography variant="body" level="h2" color="text-black">Användare</Typography>
          </div>
          <UserTable users={users} families={families} />
        </div>
        </Section>
      </Main>
    </>
  )
}

async function getCombinedUserData() {
  const appUserData = await prisma.appUser.findMany({
    include: {
      family: true,
    },
    where: {
      instance: process.env.NEXT_CLERK_INSTANCE as $Enums.clerk_instance
    }
  });
  const clerkData = await clerkBackend.users.getUserList();

  return appUserData.map((user) => {
    const clerkUser = clerkData.data.find((clerkUser) => clerkUser.id === user.id);

    return {
      ...user,
      clerkUser: {
        ...clerkUser,
      }
    }
  })
}