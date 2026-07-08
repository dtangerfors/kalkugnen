# Stenbrottsvägen

A booking app (PWA) for a shared family house. Family members can reserve dates, see who's staying when on a calendar, browse booking history, and get push notifications — installable to the home screen like a native app.

> The interface is in Swedish. Manifest tagline: _"En bokningsapp för vårt släkthus."_

## Features

- **Bookings** — create, edit and cancel reservations with arrival/departure dates, number of guests (adults & children), rooms and a message.
- **Calendar & list views** — see all upcoming and past stays at a glance.
- **Statistics** — bookings, guests and booked days per year.
- **Push notifications** — web push (VAPID) for booking updates, plus transactional email.
- **Auth** — sign-in and onboarding via Clerk.
- **PWA** — web app manifest, service worker and add-to-home-screen support for an app-like experience.

## Tech stack

- [Next.js 15](https://nextjs.org) (App Router, Turbopack) + [React 19](https://react.dev) + TypeScript
- [Prisma](https://www.prisma.io) ORM with a PostgreSQL database
- [Clerk](https://clerk.com) for authentication
- [Tailwind CSS](https://tailwindcss.com) with [Radix UI](https://www.radix-ui.com) primitives
- [Resend](https://resend.com) + [React Email](https://react.email) for transactional email
- [web-push](https://github.com/web-push-libs/web-push) for push notifications
- Deployed on [Vercel](https://vercel.com)

## Scripts

- `npm run dev` — start the dev server (Turbopack)
- `npm run build` — generate the Prisma client and build for production
- `npm run start` — run the production build
- `npm run lint` — lint the project

## Deployment

The app is deployed on [Vercel](https://vercel.com). Pushing to `main` deploys to production; branches and pull requests get preview deployments. Environment variables are managed per environment (Production / Preview / Development) in the Vercel dashboard.
