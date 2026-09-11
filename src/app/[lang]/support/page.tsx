import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getDict, locales, type Dict, type Locale } from '@/i18n';
import EmergencyBar from '@/components/EmergencyBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowIcon } from '@/components/Icons';

const audiences = [
  { title: 'audW', desc: 'audWd', img: '/images/support-women.webp', alt: 'altSupportW' },
  { title: 'audS', desc: 'audSd', img: '/images/support-seniors.webp', alt: 'altSupportS' },
  { title: 'audF', desc: 'audFd', img: '/images/support-families.svg', alt: 'altSupportF' },
  { title: 'audY', desc: 'audYd', img: '/images/support-youth.webp', alt: 'altSupportY' },
] as const;

const helplines = [
  { name: 'Lifeline', num: '13 11 14', tel: '131114', desc: 'dLife' },
  { name: '1800RESPECT', num: '1800 737 732', tel: '1800737732', desc: 'dResp' },
  { name: '13YARN', num: '13 92 76', tel: '139276', desc: 'dYarn' },
  { name: 'Beyond Blue', num: '1300 22 4636', tel: '1300224636', desc: 'dBlue', web: 'https://www.beyondblue.org.au' },
] as const;

const questions = ['q1', 'q2', 'q3', 'q4'] as const;

const legalRows = [
  { name: 'lAid', desc: 'dAid', url: 'https://www.legalaid.nsw.gov.au' },
  { name: 'lClc', desc: 'dClc', url: 'https://clc.org.au' },
  { name: 'lFw', desc: 'dFw', url: 'https://www.fairwork.gov.au' },
] as const;

const privacyItems = ['pv1', 'pv2', 'pv3', 'pv4', 'pv5'] as const;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const t = await getDict(params.lang as Locale);
  return {
    title: `${t.cta2} — SafeSpeak`,
    description: t.bridgeP,
  };
}

export default async function SupportPage({ params }: { params: { lang: string } }) {
  const locale = params.lang as Locale;
  if (!locales.includes(locale)) notFound();
  const t = await getDict(locale);

  return (
    <>
      <EmergencyBar t={t} />
      <Header t={t} locale={locale} />
      <main>
        {/* 1. Back to home */}
        <div className="mx-auto max-w-6xl px-5 pt-6 md:px-8">
          <a
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-muted hover:text-brand-primary"
          >
            <ArrowIcon className="h-4 w-4 rotate-180" />
            {t.sBack}
          </a>
        </div>

        {/* 2. Audience cards */}
        <section className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <h1 className="text-3xl font-medium leading-tight">{t.cta2}</h1>
          <p className="mt-2 text-lg text-brand-muted">{t.supSub}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {audiences.map((a) => (
              <div key={a.title} className="overflow-hidden rounded-xl border border-brand-border bg-white">
                <div className="img-tint relative aspect-[4/3] w-full">
                  <Image
                    src={a.img}
                    alt={t[a.alt as keyof Dict] as string}
                    fill
                    sizes="(min-width:640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-base font-medium">{t[a.title as keyof Dict]}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-brand-muted">{t[a.desc as keyof Dict]}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs text-brand-muted">{t.supNote}</p>
        </section>

        {/* 3. Urgent help band */}
        <section className="bg-brand-emergency">
          <div className="mx-auto max-w-6xl px-5 py-10 text-white md:px-8">
            <h2 className="text-2xl font-medium">{t.sUrgentH}</h2>
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-white/90">{t.sUrgentP}</p>
            <div className="mt-6 flex flex-wrap items-center gap-5">
              <a
                href="tel:000"
                className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-3xl font-bold text-brand-emergency"
              >
                000
              </a>
              <div>
                <p className="text-base font-medium">{t.sUrgentTags}</p>
                <p className="mt-1 text-sm text-white/90">{t.em2}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Someone to talk to */}
        <section className="mx-auto max-w-6xl px-5 py-14 md:px-8">
          <h2 className="text-2xl font-medium">{t.sTalkH}</h2>
          <p className="mt-2 max-w-2xl text-base text-brand-muted">{t.sInterp}</p>
          <div className="mt-6 grid gap-4">
            {helplines.map((h) => (
              <div
                key={h.name}
                className="flex flex-col gap-4 rounded-2xl border border-brand-border bg-white p-5 sm:flex-row sm:items-center"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-medium">{h.name}</h3>
                    <span className="rounded-md bg-brand-soft px-2 py-0.5 text-xs font-medium text-brand-primary">
                      {t.s24}
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-brand-muted">
                    {t[h.desc as keyof Dict]}
                  </p>
                  {'web' in h && (
                    <a
                      href={h.web}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-sm text-brand-muted underline hover:text-brand-primary"
                    >
                      Website ↗
                    </a>
                  )}
                </div>
                <a
                  href={`tel:${h.tel}`}
                  className="inline-flex flex-none items-center justify-center rounded-xl bg-brand-primary px-6 py-3.5 text-lg font-medium tracking-wide text-white hover:opacity-90"
                >
                  {h.num}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Before you decide */}
        <section className="mx-auto max-w-6xl px-5 pb-14 md:px-8">
          <h2 className="text-2xl font-medium">{t.sBeforeH}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {questions.map((q, i) => (
              <div key={q} className="rounded-2xl border border-brand-border bg-white p-5">
                <div className="flex items-start gap-3">
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-brand-soft text-sm font-medium text-brand-primary">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-base font-medium">{t[`${q}h` as keyof Dict]}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-brand-muted">
                      {t[`${q}p` as keyof Dict]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Legal and workplace */}
        <section className="mx-auto max-w-6xl px-5 pb-14 md:px-8">
          <h2 className="text-2xl font-medium">{t.sLegalH}</h2>
          <div className="mt-6 grid gap-3">
            {legalRows.map((r) => (
              <a
                key={r.name}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-4 rounded-xl border border-brand-border bg-white px-5 py-4 hover:border-brand-primary"
              >
                <span className="min-w-0">
                  <span className="block text-base font-medium">{t[r.name as keyof Dict]}</span>
                  <span className="mt-0.5 block text-sm text-brand-muted">{t[r.desc as keyof Dict]}</span>
                </span>
                <span className="flex flex-none items-center gap-1 text-sm text-brand-muted">
                  <span className="hidden sm:inline">{r.url.replace('https://www.', '')}</span>
                  <span aria-hidden="true">↗</span>
                </span>
              </a>
            ))}
          </div>
          <p className="mt-4 text-xs text-brand-muted">{t.sLegalNote}</p>
        </section>

        {/* 7. Protect your privacy */}
        <section className="mx-auto max-w-6xl px-5 pb-14 md:px-8">
          <h2 className="text-2xl font-medium">{t.sPrivH}</h2>
          <p className="mt-2 max-w-2xl text-base text-brand-muted">{t.sPrivP}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {privacyItems.map((pv) => (
              <div key={pv} className="rounded-xl border border-brand-border bg-white p-4">
                <h3 className="text-sm font-medium">{t[`${pv}h` as keyof Dict]}</h3>
                <p className="mt-1 text-sm leading-relaxed text-brand-muted">{t[`${pv}p` as keyof Dict]}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Help me choose (stub) */}
        <section className="mx-auto max-w-6xl px-5 pb-14 md:px-8">
          <div className="rounded-2xl border border-dashed border-brand-border bg-white p-6">
            <h2 className="text-2xl font-medium">{t.sQuizH}</h2>
            <p className="mt-2 max-w-2xl text-base text-brand-muted">{t.sQuizP}</p>
            <button
              type="button"
              aria-disabled="true"
              className="mt-5 inline-flex cursor-not-allowed items-center justify-center rounded-xl bg-brand-primary px-6 py-3.5 text-base font-medium text-white opacity-50"
            >
              {t.sQuizBtn}
            </button>
            <p className="mt-3 text-xs text-brand-muted">{t.sQuizNote}</p>
          </div>
        </section>

        {/* 9. Closing card */}
        <section className="mx-auto max-w-6xl px-5 pb-16 md:px-8">
          <div className="rounded-2xl bg-brand-soft p-8 md:p-10">
            <h2 className="text-2xl font-medium md:text-3xl">{t.bridgeH}</h2>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-brand-muted">{t.bridgeP}</p>
            <a
              href={`/${locale}/#tell`}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-6 py-3.5 text-base font-medium text-white hover:opacity-90"
            >
              {t.sCloseBtn}
              <ArrowIcon className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>
      <Footer t={t} />
    </>
  );
}
