import type { Metadata, Viewport } from 'next'
import './globals.css'
import ServiceWorkerRegistration from '@/components/vitib/ServiceWorkerRegistration'

export const metadata: Metadata = {
  title: 'VITIB Digital Academy — FEMUA 2026',
  description:
    "Rejoignez l'académie numérique du futur. Intelligence artificielle, cybersécurité, data et entrepreneuriat. Laissez vos coordonnées pour être informé du lancement des programmes VITIB.",
  applicationName: 'VITIB Digital Academy',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'VITIB',
  },
  formatDetection: { telephone: false },
  openGraph: {
    title: 'VITIB Digital Academy — FEMUA 2026',
    description:
      "Formations d'excellence en numérique et IA. Manifestez votre intérêt dès maintenant.",
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0b1e3e',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="h-full">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
      </head>
      <body className="min-h-full antialiased">
        {children}
        <ServiceWorkerRegistration />
      </body>
    </html>
  )
}
