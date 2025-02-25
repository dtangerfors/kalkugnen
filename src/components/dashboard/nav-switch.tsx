"use client"

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Link = {
  href: string | object;
  label: string;
}

export function NavSwitch({links}: {links: Link[]}) {
  const pathname = usePathname();
  return (
    <div className="flex gap-2 bg-gray-100 border p-1 rounded-3xl">
      {links.map(item => (
        <Link key={item.href as string} href={item.href} className={cn("p-2 px-3 rounded-2xl text-base text-black leading-none", pathname === item.href && "bg-white font-bold")}>{item.label}</Link>
      ))}
    </div>
  )
}