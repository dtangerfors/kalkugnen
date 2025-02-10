"use client";

import { useCalendarContext } from "./(calendar)/context";
import FixedHeader from "@/components/dashboard/fixed-header";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from 'next/navigation'

export function BookingsFixedHeader({month, label}: {month?: boolean, label?: string}) {
  const { currentMonth } = useCalendarContext();
  const pathname = usePathname();

  return (
    <FixedHeader theme="light">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-end gap-6">
          <Link href={"/dashboard/bookings"} className={cn("text-base text-black", pathname === "/dashboard/bookings" ? "font-bold" : "font-normal")}>Kalender</Link>
          <Link href={"/dashboard/bookings/list"} className={cn("text-base text-black", pathname === "/dashboard/bookings/list" ? "font-bold" : "font-normal")}>Lista</Link>
        </div>
        <Typography variant="l" level="p" color="text-black">
          {month && currentMonth}
          {label && label}
        </Typography>
      </div>
    </FixedHeader>
  );
}
