import type { Metadata, Viewport } from 'next';
import { Atkinson_Hyperlegible } from 'next/font/google';
import { locales, dir, type Locale } from '@/i18n';
import '../globals.css';

const body = Atkinson_Hyperlegible({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  title: 'SafeSpeak — Tell us what happened, in your own words',
  description:
    'Free, independent, multilingual help to understand your options after racism, abuse or scams in Australia. Not the police, not government. You decide what happens.',
  openGraph: {
    title: 'SafeSpeak — Tell us what happened, in your own language',
    description: 'Type or speak in your language. Understand your options. You decide what happens next.',
    images: [{ url: '/images/og.jpg', width: 1200, height: 630 }],
    locale: 'en_AU',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/logo/favicon.svg', type: 'image/svg+xml' },
      { url: '/logo/favicon.ico', sizes: 'any' },
    ],
    shortcut: ['/logo/favicon.ico'],
    apple: ['/logo/apple-touch-icon.png'],
  },
  manifest: '/logo/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#33695D',
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html lang={params.lang} dir={dir(params.lang)} className={body.variable}>
      <head>
        <link rel="mask-icon" href="/logo/safari-pinned-tab.svg" color="#33695D" />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
