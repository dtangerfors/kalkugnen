"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleUserRound, Menu, House, CirclePlus, Calendar, LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from "react";

const links = [
  { name: "Hem", href: "/dashboard", icon: House },
  { name: "Kalender", href: "/dashboard/bookings", icon: Calendar },
  { name: "Bokning", href: "/dashboard/booking/create", icon: CirclePlus },
  { name: "Profil", href: "/dashboard/profile", icon: CircleUserRound },
  { name: "Meny", href: "/dashboard/menu", icon: Menu },
];

export const MobileNav = () => {

  return (
    <div>
      <ul className={clsx("flex w-full gap-2")}>
        {links.map((link, i) => <li key={`link-${i}`} className="flex-1"><NavLink link={link}/></li>)}
      </ul>
    </div>
  );
};

type LinkProps = {
  name: string;
  href: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
};

function NavLink({link}: {link:LinkProps}) {
  const pathname = usePathname();
  const LinkIcon = link.icon;

  return (
    <Link
      key={link.name}
      href={link.href}
      className={clsx(
        "flex flex-col grow items-center justify-center gap-0.5 py-3 text-base font-medium transition-all hover:text-foreground",
        { "text-gray-800": pathname !== link.href },
        { "text-primary-400": pathname === link.href },
      )}
    >
      <LinkIcon />
      <span className="font-sans text-xs">{link.name}</span>
    </Link>
  );
}
