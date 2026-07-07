import Link from "next/link";
import Logo from "@/components/logo";
import Navigation from "./navigation";
import { auth } from "@clerk/nextjs/server";

export default async function DesktopNav() {
  const { sessionClaims } = await auth();

  return (
    <div className="flex flex-col gap-12">
      <Link
        className="flex gap-4 items-center"
        href="/"
      >
        <div className="w-8 fill-primary-300">
          <Logo />
        </div>
      </Link>
      <Navigation role={sessionClaims?.metadata.user_role as string} />
    </div>
  )
}