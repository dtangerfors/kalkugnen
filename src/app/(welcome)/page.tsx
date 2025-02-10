import { SignInButton, SignedOut } from "@clerk/nextjs";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

export default async function Welcome() {
  return (
    <>
      <div className="relative z-10 my-6">
        <Typography level="h1" variant="xl" color="text-foreground-primary">
          <span>Stenbrottsvägen</span>
        </Typography>
      </div>
      <div className="relative z-10 w-full max-w-md mx-auto p-6 text-center">
        <SignedOut>
          <SignInButton>
            <Button size={"lg"} style={{width: "100%"}}>Logga in</Button>
          </SignInButton>
        </SignedOut>
        <div className="py-6 md:pt-12 md:pb-0 text-center">
          <p className="font-sans font-normal text-black">
            Har du inget konto?{" "}
            <a href="/auth/login?screen_hint=signup" className="font-bold">
              Skapa ett nu.
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
