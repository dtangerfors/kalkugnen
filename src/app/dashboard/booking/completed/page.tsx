"use client"
import { Main, Section } from "@/components/dashboard/sections";
import { Typography } from "@/components/ui/typography";
import Lottie from "lottie-react";
import sailAnimation from "@/lib/animations/sail.json"
import { Button } from "@/components/ui/button-primary";

export default function BookingCompletedPage() {
  return (
    <>
      <header className="relative bg-primary pt-safe-top">
        <div className="flex flex-col items-center gap-6 max-w-screen-sm mx-auto p-6 pb-12">
          <div className="relative grid place-items-center size-40">
            <Lottie animationData={sailAnimation} style={{position: 'absolute', width: '15rem'}} />
          </div>
        </div>
      </header>
      <Main>
        <Section>
          <div className="text-center">
            <Typography variant="xl" level="h1">Alleman ombord</Typography>
            <Typography variant="body" level="p">Din bokning är bekräftad och finns nu inlagd i systemet. Trevlig resa!</Typography>
          </div>
          <div className="mt-12 text-center mx-auto">
          <Button variant="primary" href={'/dashboard/profile'} width="auto">Mina bokningar</Button>
          </div>
        </Section>
      </Main>
    </>
  )
}