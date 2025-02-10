import { IconName } from "lucide-react/dynamic";

export type LinkProps = {
  name: string;
  href: string;
  icon: IconName;
}

type LinkArrProps = LinkProps[];

const admin: LinkArrProps = [
  { name: "Inställningar", href: "/dashboard/settings", icon: "user-round-cog" },
  {
    name: "Statistik",
    href: "/dashboard/statistics",
    icon: "chart-area",
  },
  { name: "Admin", href: "/dashboard/admin", icon: "file-lock-2" },
];

const moderator: LinkArrProps = [
  { name: "Inställningar", href: "/dashboard/settings", icon: "user-round-cog" },
  {
    name: "Statistik",
    href: "/dashboard/statistics",
    icon: "chart-area",
  },
];

const user: LinkArrProps = [
  { name: "Inställningar", href: "/dashboard/settings", icon: "user-round-cog" },
];

export const navLinks: LinkArrProps = [
  { name: "Hem", href: "/dashboard", icon: "house" },
  { name: "Bokning", href: "/dashboard/booking/create", icon: "plus-circle"},
  { name: "Kalender", href: "/dashboard/bookings", icon: "calendar" },
  { name: "Profil", href: "/dashboard/profile", icon: "circle-user-round" },
];

export const dashboardLinks = {
  admin: admin,
  super_admin: admin,
  moderator: moderator,
  user: user,
};