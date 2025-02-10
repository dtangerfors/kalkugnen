import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Stenbrottsvägen',
    short_name: 'SBV 3',
    description: 'En bokningsapp för vårt släkthus',
    start_url: '/',
    theme_color: "#383c2b",
    background_color: "#383c2b",
    display: "standalone",
    orientation: "portrait",
    icons: [
      {
        src: '/favicon/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/favicon/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}