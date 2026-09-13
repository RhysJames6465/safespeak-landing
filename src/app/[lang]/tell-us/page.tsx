import Link from 'next/link';
import { getDict, type Locale } from '@/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TellUsForm from '@/components/TellUsForm';

export default async function TellUsPage({ params }: { params: { lang: Locale } }) {
  const t = await getDict(params.lang);
  return <><Header t={t} locale={params.lang} /><main className="bg-page px-5 py-12 md:px-8 md:py-16"><div className="mx-auto max-w-6xl"><Link href={`/${params.lang}`} className="text-sm font-medium text-brand-primary underline-offset-4 hover:underline">← {t.tellBack}</Link><div className="mt-10 max-w-3xl"><h1 className="text-4xl font-medium leading-tight md:text-5xl">{t.tellHeading}</h1><p className="mt-5 max-w-[55ch] text-lg leading-relaxed text-brand-muted">{t.tellSupport}</p><TellUsForm t={t} /></div></div></main><Footer t={t} locale={params.lang} /></>;
}
