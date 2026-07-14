import type { Metadata } from 'next'
import { Manrope, DM_Mono, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
// import { MobileSubscribeBanner } from '@/components/navigation/MobileSubscribeBanner'
import { getCategories } from '@/lib/wordpress'
import { buildWebsiteJsonLd } from '@/utils/seo'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://founderfocus.tech'),
  title: {
    default: 'FounderFocus — Signal for builders',
    template: '%s | FounderFocus',
  },
  description:
    'FounderFocus is a live field manual for people building the next software economy. The important releases, ideas, tools and lessons—without the ambient noise.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://founderfocus.tech',
    siteName: 'FounderFocus',
    title: 'FounderFocus — Signal for builders',
    description:
      'FounderFocus — the operating system for builders. AI, tech, and startup signals every weekday.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FounderFocus',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@founderfocus',
    title: 'FounderFocus — Signal for builders',
    description:
      'FounderFocus — the operating system for builders. AI, tech, and startup signals every weekday.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://founderfocus.tech',
    types: {
      'application/rss+xml': 'https://founderfocus.tech/rss.xml',
    },
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Fetch categories for nav + footer (cached 24h)
  const categories = await getCategories().catch(() => [])

  const websiteJsonLd = buildWebsiteJsonLd()

  return (
    <html
      lang="en"
      className={`${manrope.variable} ${dmMono.variable} ${geistMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Header — no Topline per owner instruction */}
        <Header categories={categories} />

        {/* Main content */}
        <div style={{ flex: 1 }}>{children}</div>

        {/* Footer */}
        <Footer categories={categories} />

        {/* Mobile subscribe banner (fixed bottom, mobile only) */}
        {/* <MobileSubscribeBanner /> */}
      </body>
    </html>
  )
}
