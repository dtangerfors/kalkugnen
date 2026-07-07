import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  // The push-notifications provider registers the service worker itself because
  // it needs the registration object to manage push subscriptions, so don't let
  // @serwist/next inject its own registration script.
  register: false,
  reloadOnOnline: true,
  // Turbopack dev doesn't run the webpack plugin; keep the SW to production
  // builds only.
  disable: process.env.NODE_ENV === "development",
});

export default withSerwist(nextConfig);
