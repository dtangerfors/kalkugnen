import { createClerkClient } from '@clerk/backend'

export const clerkBackend = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })