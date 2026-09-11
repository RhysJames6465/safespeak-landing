import { notFound } from 'next/navigation';
import { getDict, locales, type Locale } from '@/i18n';
import EmergencyBar from '@/components/EmergencyBar';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Stories from '@/components/Stories';
import HowItWorks from '@/components/HowItWorks';
import PhotoBand from '@/components/PhotoBand';
import Reassurance from '@/components/Reassurance';
import StickyBar from '@/components/StickyBar';
import SupportOverlay from '@/components/SupportOverlay';
import Footer from '@/components/Footer';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Page({ params }: { params: { lang: string } }) {
  const locale = params.lang as Locale;
  if (!locales.includes(locale)) notFound();
  const t = await getDict(locale);

  return (
    <>
      <EmergencyBar t={t} />
      <Header t={t} locale={locale} />
      <main>
        <Hero t={t} locale={locale} />
        <Stories t={t} />
        <HowItWorks t={t} />
        <PhotoBand t={t} />
        <Reassurance t={t} />
      </main>
      <Footer t={t} />
      <StickyBar t={t} />
      <SupportOverlay t={t} />
    </>
  );
}
