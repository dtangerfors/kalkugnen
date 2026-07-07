/// <reference lib="webworker" />

import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    // Injected by @serwist/next at build time with the precache manifest.
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
});

serwist.addEventListeners();

// --- Push notifications ------------------------------------------------------
// Preserved from the previous hand-written public/sw.js. Serwist now generates
// public/sw.js, so these handlers must live in the worker source.

self.addEventListener("push", (event) => {
  if (!event.data) return;

  const { title, body, primaryKey, badge, url } = event.data.json();
  const options = {
    body,
    icon: "/favicon/web-app-manifest-192x192.png",
    badge: badge || "/push-badge.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey,
      url,
    },
  } as NotificationOptions;

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  const { url } = event.notification.data ?? {};
  event.notification.close();

  if (url) {
    event.waitUntil(self.clients.openWindow(url));
  }
});
