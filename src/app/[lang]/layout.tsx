import type { Metadata } from 'next';
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
      <body className="font-sans">{children}</body>
    </html>
  );
}
