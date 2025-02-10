import type { Metadata, Viewport } from "next";
import { Familjen_Grotesk } from "next/font/google";
import "./globals.css";
import { getDeviceType } from "@/lib/server-utils";
import clsx from "clsx";
import {
  ClerkProvider
} from '@clerk/nextjs'
import AddToHomeScreen from "@/components/pwa/AddToHomeScreen";

const familjenGrotesk = Familjen_Grotesk({
  variable: "--font-familjen",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stenbrottsvägen",
  appleWebApp: { statusBarStyle: 'black-translucent', capable: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  userScalable: false,
};

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  const { isMobile } = await getDeviceType();
  return (
    <ClerkProvider>
      <html lang="sv">
        <head>
          <meta name="apple-mobile-web-app-title" content="Stenbrottet" />
        </head>
        <body className={clsx(`${familjenGrotesk.variable} antialiased`, isMobile && 'app-mobile')}>
          <div data-vaul-drawer-wrapper>
          {children}
          </div>
          <AddToHomeScreen />
        </body>
      </html>
    </ClerkProvider>
  );
}
