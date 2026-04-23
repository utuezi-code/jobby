import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'VITIB Digital Academy',
    short_name: 'VITIB',
    description:
      "Laissez vos coordonnées pour être informé du lancement des programmes VITIB. FEMUA 2026.",
    start_url: '/',
    display: 'standalone',
    background_color: '#0b1e3e',
    theme_color: '#0b1e3e',
    orientation: 'portrait',
    categories: ['education', 'productivity'],
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
    shortcuts: [
      {
        name: "S'inscrire",
        url: '/interet',
        description: 'Enregistrer mon intérêt',
      },
      {
        name: 'Quiz IA',
        url: '/quiz',
        description: 'Tester mes connaissances',
      },
    ],
  }
}
