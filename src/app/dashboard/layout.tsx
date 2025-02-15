import DesktopNav from "@/components/dashboard/desktop-nav";
import { MobileNav } from "@/components/dashboard/mobile-nav";
import clsx from "clsx";
import AppProvider from "./app-context";
import { Toaster } from "@/components/ui/toaster"
import { PushNotificationsProvider } from "@/lib/client/notifications/provider";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <AppProvider>
      <PushNotificationsProvider>
      <div className="flex min-h-dvh bg-background">
        <div className={clsx(
          "fixed bottom-0 left-0 z-20 w-full bg-white px-6 pb-safe-bottom",
          "lg:w-72 lg:h-full lg:bg-surface lg:p-6"
          )}>
            <div className="hidden lg:block">
              <DesktopNav />
            </div>
            <div className="block lg:hidden">
              <MobileNav />
            </div>
        </div>
        <main className="flex-1 lg:ml-72">{children}</main>
      </div>
      <Toaster />
      </PushNotificationsProvider>
    </AppProvider>
  );
}
