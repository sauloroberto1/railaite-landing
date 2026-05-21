import type { Metadata } from 'next'
import { Geist, Geist_Mono, Newsreader } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const newsreader = Newsreader({
  variable: '--font-newsreader',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: 'Railaite — Uma forma mais calma de gerir sua clínica particular',
  description: 'Agenda, sessões, cobrança Pix integrada e nota fiscal para psicólogos e terapeutas. Feito no Brasil, em português.',
  metadataBase: new URL('https://www.railaite.com.br'),
  openGraph: {
    title: 'Railaite — Gestão calma para clínicas particulares',
    description: 'Agenda, Pix integrado e NFS-e para psicólogos e terapeutas.',
    locale: 'pt_BR',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable}`}>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.history.scrollRestoration='manual';window.scrollTo(0,0);`,
          }}
        />
        {children}
      </body>
    </html>
  )
}
