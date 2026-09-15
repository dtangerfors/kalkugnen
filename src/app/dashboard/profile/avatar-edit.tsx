"use client"

import { useState } from "react";
import Avatar from "@/components/avatar";
import { Pencil, Loader2 } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { Button as PrimaryButton } from "@/components/ui/button-primary";
import { NiceAvatarProps } from "@/components/avatar/types";
import { updateAvatar } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";

export default function AvatarEdit({config}: {config: NiceAvatarProps}) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsSaving(true);
    const res = await updateAvatar(formData);
    setIsSaving(false);

    if (res?.error) {
      toast({ description: res.error });
      return;
    }

    setOpen(false);
    toast({ description: res?.message ?? "Avatar uppdaterad" });
  };

  return (
    <div className="flex relative">
      <picture className="p-1 rounded-full aspect-square overflow-hidden bg-white">
        <Avatar className="size-40 rounded-full" {...config}/>
      </picture>
      <Drawer open={open} onOpenChange={setOpen}>

      <DrawerTrigger className="absolute bottom-1 right-1 grid place-items-center size-11 rounded-full bg-gray-50 border-2 border-white text-black">
        <span className="sr-only">Redigera avatar</span>
        <Pencil size={16} strokeWidth={3} />
      </DrawerTrigger>
      <DrawerContent className="mb-20 px-6 border-none">
        <div className="sr-only">
        <DrawerHeader>
          <DrawerTitle>Redigera Avatar</DrawerTitle>
          <DrawerDescription>Gör din avatar unik</DrawerDescription>
        </DrawerHeader>
        </div>
        <form action={handleSubmit} className="mt-6 flex flex-col items-center gap-6">
          <AvatarEditor {...config} />
          <div className="flex flex-col items-center gap-3 w-full max-w-xs">
            <Button type="submit" disabled={isSaving} className="w-full">
              {isSaving ? <Loader2 className="animate-spin" /> : "Spara"}
            </Button>
            <DrawerClose asChild>
              <PrimaryButton type="button" variant="tertiary" size="small">Avbryt</PrimaryButton>
            </DrawerClose>
          </div>
        </form>
      </DrawerContent>
      </Drawer>
    </div>
  )
}
