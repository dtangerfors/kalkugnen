"use client";

import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useRouter } from "next/navigation";

const BookingModalLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <Drawer
      defaultOpen={true}
      onOpenChange={(open) => {
        if (!open) {
          router.back();
        }
      }}
    >
      <DrawerContent>
        {children}
      </DrawerContent>
    </Drawer>
  );
};

export default BookingModalLayout;