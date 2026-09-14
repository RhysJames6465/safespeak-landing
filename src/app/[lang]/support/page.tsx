import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getDict, locales, type Dict, type Locale } from '@/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowIcon } from '@/components/Icons';

const audiences = [
  { title: 'audW', desc: 'audWd', img: '/images/support-women2.webp', alt: 'altSupportW', focal: 'object-[54%_center]' },
  { title: 'audS', desc: 'audSd', img: '/images/support-seniors2.webp', alt: 'altSupportS', focal: 'object-[50%_45%]' },
  { title: 'audF', desc: 'audFd', img: '/images/support-famalies.webp', alt: 'altSupportF', focal: 'object-[50%_42%]' },
  { title: 'audY', desc: 'audYd', img: '/images/support-youth2.webp', alt: 'altSupportY', focal: 'object-[50%_44%]' },
] as const;
const helplines = [
  { name: 'Lifeline', num: '13 11 14', tel: '131114', desc: 'dLife', web: 'https://www.lifeline.org.au' },
  { name: '1800RESPECT', num: '1800 737 732', tel: '1800737732', desc: 'dResp', web: 'https://www.1800respect.org.au' },
  { name: '13YARN', num: '13 92 76', tel: '139276', desc: 'dYarn', web: 'https://www.13yarn.org.au' },
  { name: 'Beyond Blue', num: '1300 22 4636', tel: '1300224636', desc: 'dBlue', web: 'https://www.beyondblue.org.au' },
] as const;
const questions = ['q1', 'q2', 'q3', 'q4'] as const;
const privacyItems = ['pv1', 'pv2', 'pv3', 'pv4', 'pv5'] as const;
const legalRows = [
  { name: 'lAid', desc: 'dAid', url: 'https://www.legalaid.nsw.gov.au', host: 'legalaid.nsw.gov.au' },
  { name: 'lClc', desc: 'dClc', url: 'https://clc.org.au', host: 'clc.org.au' },
  { name: 'lFw', desc: 'dFw', url: 'https://www.fairwork.gov.au', host: 'fairwork.gov.au' },
] as const;

export function generateStaticParams() { return locales.map((lang) => ({ lang })); }
export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const t = await getDict(params.lang as Locale);
  return { title: t.cta2 + ' — SafeSpeak', description: t.supportIntro };
}

export default async function SupportPage({ params }: { params: { lang: string } }) {
  const locale = params.lang as Locale;
  if (!locales.includes(locale)) notFound();
  const t = await getDict(locale);
  return <>
    <Header t={t} locale={locale} />
    <main className="bg-page">
      <div className="mx-auto max-w-6xl px-5 pt-6 md:px-8">
        <a href={'/' + locale} className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-brand-muted hover:text-brand-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary">
          <ArrowIcon className="h-4 w-4 rotate-180" />{t.sBack}
        </a>
      </div>
      <section className="mx-auto max-w-6xl px-5 pb-10 pt-8 md:px-8 md:pb-14">
        <div className="grid gap-8 md:grid-cols-[1fr_0.72fr] md:items-center">
          <div><h1 className="text-3xl font-medium leading-tight md:text-4xl">{t.cta2}</h1><p className="mt-3 max-w-[52ch] text-lg leading-relaxed text-brand-muted">{t.supportIntro}</p>
            <a href="#support-pathways" className="mt-5 inline-flex min-h-12 items-center justify-center rounded-xl bg-brand-primary px-6 py-3 text-base font-medium text-white transition-opacity duration-150 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary motion-reduce:transition-none">{t.supportBrowseOptions}</a>
            <nav aria-label={t.cta2} className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-brand-primary">
              <a href="#urgent" className="hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary">{t.navUrgent}</a><a href="#talk" className="hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary">{t.navTalk}</a><a href="#before" className="hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary">{t.sBeforeH}</a><a href="#legal" className="hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary">{t.navLegal}</a>
            </nav>
          </div>
          <div className="relative aspect-[4/3] w-full max-w-[26rem] overflow-hidden rounded-2xl md:justify-self-end"><Image src="/images/support-women.webp" alt={t.altSupportW as string} fill sizes="(min-width: 768px) 30vw, 100vw" className="object-cover object-center" /></div>
        </div>
      </section>
      <section id="urgent" className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-12 md:px-8">
        <div className="rounded-2xl border border-brand-emergency bg-white p-5 md:flex md:items-center md:justify-between md:gap-8">
          <div><h2 className="text-xl font-medium">{t.sUrgentH}</h2><p className="mt-2 max-w-2xl text-sm leading-relaxed text-brand-muted">{t.sUrgentP}</p><p className="mt-2 text-sm text-brand-muted">{t.em2}</p></div>
          <a href="tel:000" className="mt-4 inline-flex min-h-12 items-center justify-center rounded-xl bg-brand-emergency px-6 py-3 text-base font-bold text-white md:mt-0">{t.fCall000}</a>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-14 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4"><div><h2 className="text-2xl font-medium">{t.sQuizH}</h2><p className="mt-2 max-w-2xl text-base text-brand-muted">{t.sQuizUnavailable}</p></div><a href="#talk" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand-primary px-5 py-3 text-sm font-medium text-white hover:opacity-90">{t.supportBrowse}<ArrowIcon className="h-4 w-4" /></a></div>
      </section>
      <section id="support-pathways" className="mx-auto max-w-6xl scroll-mt-32 px-5 pb-14 md:px-8"><h2 className="text-2xl font-medium">{t.supSub}</h2><div className="mt-6 grid gap-4 sm:grid-cols-2">
        {audiences.map((a) => <a key={a.title} href="#talk" className="support-audience-card group overflow-hidden rounded-2xl border border-brand-border bg-brand-story focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"><div className="relative aspect-[4/3] w-full overflow-hidden"><Image src={a.img} alt={t[a.alt as keyof Dict] as string} fill sizes="(min-width:640px) 50vw, 100vw" className={'object-cover ' + a.focal} /></div><div className="support-audience-panel p-5"><h3 className="text-base font-medium">{t[a.title as keyof Dict]}</h3><p className="mt-1 text-sm leading-relaxed text-brand-muted">{t[a.desc as keyof Dict]}</p><span className="support-audience-action mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-primary">{t.supportExplore}<ArrowIcon className="support-audience-arrow h-4 w-4" /></span></div></a>)}
      </div><p className="mt-5 text-xs text-brand-muted">{t.supNote}</p></section>
      <section id="talk" className="scroll-mt-24"><div className="mx-auto max-w-6xl px-5 py-14 md:px-8"><h2 className="text-2xl font-medium">{t.sTalkH}</h2><p className="mt-2 max-w-2xl text-base text-brand-muted">{t.sInterp}</p><div className="mt-6 grid gap-4 sm:grid-cols-2">
        {helplines.map((h) => <article key={h.name} className="rounded-2xl border border-brand-border bg-white p-5"><div className="flex flex-wrap items-center justify-between gap-2"><h3 className="text-base font-medium">{h.name}</h3><span className="rounded-md bg-brand-soft px-2 py-0.5 text-xs font-medium text-brand-primary">{t.s24}</span></div><p className="mt-2 text-sm leading-relaxed text-brand-muted">{t[h.desc as keyof Dict]}</p><div className="mt-4 flex flex-wrap gap-3"><a href={'tel:' + h.tel} className="inline-flex min-h-11 items-center justify-center rounded-xl bg-brand-primary px-4 py-2 text-sm font-medium text-white">{t.supportCall} {h.num}</a><a href={h.web} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-brand-primary px-4 py-2 text-sm font-medium text-brand-primary">{t.supportVisit}</a></div></article>)}
      </div></div></section>
      <section id="before" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-14 md:px-8"><h2 className="text-2xl font-medium">{t.sBeforeH}</h2><div className="mt-6 grid gap-3 sm:grid-cols-2">{questions.map((q, i) => <details key={q} className="support-question rounded-xl border border-brand-border bg-brand-story p-4"><summary className="flex min-h-11 cursor-pointer items-center gap-3 font-medium"><span className="support-question-number flex h-7 w-7 flex-none items-center justify-center rounded-full bg-brand-soft text-sm text-brand-primary">{i + 1}</span>{t[q + 'h' as keyof Dict]}</summary><p className="mt-3 ps-10 text-sm leading-relaxed text-brand-muted">{t[q + 'p' as keyof Dict]}</p></details>)}</div></section>
      <section id="legal" className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-14 md:px-8"><h2 className="text-2xl font-medium">{t.sLegalH}</h2><div className="mt-6 grid gap-3">{legalRows.map(r => <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer" className="support-legal-row flex min-h-16 items-center justify-between gap-4 rounded-xl border border-brand-border bg-brand-story px-5 py-4"><span><span className="block font-medium">{t[r.name as keyof Dict]}</span><span className="text-sm text-brand-muted">{t[r.desc as keyof Dict]}</span></span><span className="support-legal-indicator text-sm text-brand-muted">{r.host} ↗</span></a>)}</div><p className="mt-4 text-xs text-brand-muted">{t.sLegalNote}</p></section>
      <section id="privacy" className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-14 md:px-8"><h2 className="text-2xl font-medium">{t.sPrivH}</h2><p className="mt-2 max-w-2xl text-base text-brand-muted">{t.sPrivP}</p><div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{privacyItems.map(p => <div key={p} className="rounded-xl border border-brand-border bg-brand-story p-4"><h3 className="text-sm font-medium">{t[p + 'h' as keyof Dict]}</h3><p className="mt-1 text-sm leading-relaxed text-brand-muted">{t[p + 'p' as keyof Dict]}</p></div>)}</div></section>
      <section id="accessibility" className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-14 md:px-8"><h2 className="text-2xl font-medium">{t.sAccessibilityH}</h2><p className="mt-2 max-w-3xl text-base leading-relaxed text-brand-muted">{t.sAccessibilityP}</p></section>
    </main><Footer t={t} locale={locale} />
  </>;
}
