import clsx from "clsx";
import { dashboardLinks, navLinks,  } from "@/app/dashboard/links";
import { SignOutButton } from "@clerk/nextjs";
import { NavLink } from "./nav-link";
import { LogOut } from "lucide-react";

export default function Navigation({ role }: { role: string }) {
  const roleLinks = dashboardLinks[role as keyof typeof dashboardLinks];
  const links = [...navLinks, ...roleLinks];

  return (
    <nav className="w-full">
      <ul
        className={clsx(
          "flex flex-col gap-px lg:gap-2 lg:-mx-1 max-lg:rounded-2xl max-lg:overflow-hidden"
        )}
      >
        {links.map((link) => <NavLink key={link.name} name={link.name} icon={link.icon} href={link.href} />)}
        <li key={`menu-item-logout`}>
          <SignOutButton redirectUrl="/">
            <button
              className="group flex grow items-center w-full font-sans text-base text-left font-normal transition-all
                          hover:bg-gray-100 hover:text-black
                          dark:hover:bg-gray-800 dark:hover:text-white
                          gap-4 p-5 bg-white
                          lg:gap-2 lg:p-1 lg:rounded-xl"
            >
              <span
                className="grid place-items-center rounded-lg transition-all
                                lg:size-8 lg:group-hover:bg-gray-300 lg:group-hover:text-secondary-950
                                lg:group-hover:dark:bg-gray-100"
              >
                <LogOut className="w-6 lg:w-4" />
              </span>
              <p className="grow">Logga ut</p>
            </button>
          </SignOutButton>
        </li>
      </ul>
    </nav>
  );
}