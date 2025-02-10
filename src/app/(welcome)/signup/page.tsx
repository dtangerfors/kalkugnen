import { CompleteRegistration } from "@/components/forms/complete-registration";
import { Typography } from "@/components/ui/typography";
import { auth0 } from "@/lib/auth0";
import { getUserProfileData } from "@/services/profile.service";

export default async function SignUpPage() {
  // const user = await getUserProfileData();
  const session = await auth0.getSession();
  const user = session?.user
  const hasPrefilledValue = user.hasOwnProperty("given_name") && user.hasOwnProperty("family_name");

  const text = {
    prefilled: {
      heading: "Stämmer dina uppgifter?",
      body: "Ditt namn har hämtats direkt från tjänsten du använde för att skapa konto med. Är uppgifterna rätt kan du slutföra registreringen genom att klicka på Fortsätt."
    },
    noValues: {
      heading: "Komplettera din profil",
      body: "För att slutföra registreringen behöver du fylla i ditt namn nedan."
    }
  }

  return (
    <div className="flex flex-col gap-12 p-6 max-w-md">
      <header>
        <Typography level="h1" variant="xl">
          {hasPrefilledValue ? text.prefilled.heading : text.noValues.heading}
        </Typography>
        <Typography level="p" variant="body">
          {hasPrefilledValue ? text.prefilled.body : text.noValues.body}
        </Typography>
        </header>
      <CompleteRegistration user={user} />
    </div>
  )
}