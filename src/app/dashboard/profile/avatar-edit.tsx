import Avatar from "@/components/avatar";
import { Pencil } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import AvatarEditor from "@/components/forms/edit-avatar/avatar-editor";
import { Button } from "@/components/ui/button-primary";
import { NiceAvatarProps } from "@/components/avatar/types";

export default function AvatarEdit({config}: {config: NiceAvatarProps}) {
  return (
    <div className="flex relative">
      <picture className="p-1 rounded-full aspect-square overflow-hidden bg-white">
        <Avatar className="size-40 rounded-full" {...config}/>
      </picture>
      <Drawer>

      <DrawerTrigger className="absolute bottom-1 right-1 grid place-items-center size-11 rounded-full bg-gray-50 border-2 border-white text-black">
        <span className="sr-only"></span>
        <Pencil size={16} strokeWidth={3} />
      </DrawerTrigger>
      <DrawerContent className="mb-20 px-6 border-none">
        <div className="sr-only">
        <DrawerHeader>
          <DrawerTitle>Redigera Avatar</DrawerTitle>
          <DrawerDescription>Gör din avatar unik</DrawerDescription>
        </DrawerHeader>
        </div>
        <div className="mt-6">
          <AvatarEditor {...config} />
        </div>
        <DrawerClose asChild className="inline-flex mx-auto mt-6">
          <Button type="button" variant="tertiary" size="small">Stäng</Button>
        </DrawerClose>
      </DrawerContent>
      </Drawer>
    </div>
  )
}