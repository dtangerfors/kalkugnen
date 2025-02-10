'use client'

import * as React from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { completeOnboarding } from './_actions'
import { Typography } from "@/components/ui/typography"
import { Button } from "@/components/ui/button-primary"
import dynamic from 'next/dynamic'
import { genConfig } from "@/components/avatar"
 
const AvatarEditor = dynamic(() => import('@/components/forms/edit-avatar/avatar-editor'), { ssr: false })

export default function OnboardingComponent() {
  const [error, setError] = React.useState('');
  const { user } = useUser();
  const router = useRouter();
  const avatarConfig = genConfig();

  const handleSubmit = async (formData: FormData) => {
    const res = await completeOnboarding(formData)
    if (res?.message) {
      // Reloads the user's data from the Clerk API
      await user?.reload()
      router.push('/dashboard')
    }
    if (res?.error) {
      setError(res?.error)
    }
  }
  return (
    <div className="flex flex-col gap-4 items-center">
      <header className="text-center">
        <Typography variant="xl" level="h1">Skapa avatar</Typography>
        <Typography variant="body" level="p">Hej {user?.firstName}, skapa en unik avatar till din profil. Klicka på alternativen nedanför.</Typography>
      </header>
      <form action={handleSubmit} className="flex flex-col gap-6">
        <AvatarEditor {...avatarConfig}/>
        {error && <p className="text-red-600">Error: {error}</p>}
        <Button variant="primary" type="submit">Fortsätt</Button>
      </form>
    </div>
  )
}