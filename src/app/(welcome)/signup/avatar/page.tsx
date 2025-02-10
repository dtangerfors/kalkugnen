
import AvatarEditor from "@/components/forms/edit-avatar/avatar-editor";
import { Typography } from "@/components/ui/typography";

export default async function CreateAvatarPage() {
  return (
    <div className="flex flex-col gap-12 p-6 max-w-md">
      <header>
        <Typography level="h1" variant="xl">
          Skapa din avatar
        </Typography>
        <Typography level="p" variant="body">
          Gör din profil personlig med en avatar!
        </Typography>
        </header>
      <AvatarEditor />
    </div>
  )
}