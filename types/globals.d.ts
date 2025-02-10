export {}

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      onboardingComplete?: boolean
      avatarId?: string,
      user_role?: string
    }
  }
}