"use client"
import { LinkProps } from "@/app/dashboard/links";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChartArea, UserRoundCog, FileLock2, House, PlusCircle, Calendar, CircleUserRound } from "lucide-react";

export function NavLink({name, href, icon}: LinkProps) {
  const pathname = usePathname();
  const activeLink = pathname === href;

  const LinkIcon = () => {
    switch (icon) {
      case "user-round-cog":
        return <UserRoundCog className="w-6 lg:w-4"/>;
      case "chart-area":
        return <ChartArea className="w-6 lg:w-4"/>;
      case "file-lock-2":
        return <FileLock2 className="w-6 lg:w-4"/>;
      case "house":
        return <House className="w-6 lg:w-4"/>;
      case "plus-circle":
        return <PlusCircle className="w-6 lg:w-4"/>;
      case "calendar":
        return <Calendar className="w-6 lg:w-4"/>;
      case "circle-user-round":
        return <CircleUserRound className="w-6 lg:w-4"/>;
  }
}

  const styling = {
    link: clsx(
      "group flex grow items-center font-sans text-base font-normal transition-all",
      "hover:bg-gray-100 hover:text-black",
      "dark:hover:bg-gray-800 dark:hover:text-white",
      "gap-4 p-5 bg-white",
      "lg:gap-2 lg:p-1 lg:rounded-xl",
      !activeLink && "text-foreground-1",
      activeLink && "text-foreground"
    ),
    iconWrapper: clsx(
      "grid place-items-center rounded-lg transition-all",
      "lg:size-8 lg:group-hover:bg-gray-300 lg:group-hover:text-secondary-950",
      "lg:group-hover:dark:bg-gray-100",
      activeLink &&
        "text-secondary-100 dark:text-secondary-950 size-8 lg:bg-primary-300 lg:dark:bg-gray-200"
    ),
  };

  return (
    <li key={`menu-item-${name.toLowerCase()}`}>
      <Link key={name} href={href} className={styling.link}>
        <span className={styling.iconWrapper}>
          {LinkIcon()}
        </span>
        <p className="grow">{name}</p>
      </Link>
    </li>
  );
}