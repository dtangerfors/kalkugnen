import { UserProfile } from '@clerk/nextjs'

export default function SettingsPage() {
  return (
    <div className="h-full pb-safe-bottom">
      <UserProfile appearance={{
        elements: {
          rootBox: "w-full h-full",
          cardBox: "w-full h-full max-w-none rounded-none shadow-none",
          scrollBox: "rounded-none rounded-none"
        }
      }} />
    </div>
  )
}