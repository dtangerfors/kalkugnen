import { UpdateUserForm } from "@/components/forms/update-user";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ExtendedUser } from "@/lib/types";
import { Family } from "@prisma/client";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Pencil } from "lucide-react";

export function UserDialog({ user, families }: { user: ExtendedUser, families: Family[] }) {
  const values = {
    user_id: user.id,
    user_role: user.user_role,
    family_id: user.family_id,
  }
  return (
    <Dialog>
      <DialogTrigger className="relative grid place-items-center size-8 rounded-full bg-gray-50 text-black hover:bg-gray-100">
        <span className="sr-only">Klicka för att redigera användare</span>
        <Pencil size={16} strokeWidth={3} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Redigera användare</DialogTitle>
        </DialogHeader>
        <UpdateUserForm values={values} families={families}/>
      </DialogContent>
    </Dialog>
  )
}