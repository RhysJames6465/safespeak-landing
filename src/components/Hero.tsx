import Image from 'next/image';
import TryItBox from './TryItBox';
import SupportButton from './SupportButton';
import { ShieldIcon, ArrowIcon } from './Icons';
import type { Dict } from '@/i18n';

export default function Hero({ t, locale }: { t: Dict; locale: string }) {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-10 pt-6 md:grid-cols-[1.05fr_0.95fr] md:px-8 md:pt-10 lg:gap-14">
      <div>
        <h1 className="text-3xl font-medium leading-tight md:text-[2.4rem]">{t.h1}</h1>
        <p className="mt-4 text-lg leading-relaxed text-brand-muted">{t.sub}</p>
        <p className="mt-3 flex items-center gap-2 text-sm font-medium">
          <ShieldIcon className="h-4 w-4 flex-none text-brand-primary" />
          {t.tr}
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <a
            href="#tell"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-6 py-3.5 text-base font-medium text-white hover:opacity-90"
          >
            {t.cta1}
          </a>
          <SupportButton variant="outline">{t.cta2}</SupportButton>
        </div>
        {/* Desktop: hero photo beside text. Hidden on mobile (band image carries the warmth). */}
        <div className="grade-warm mt-8 hidden overflow-hidden rounded-2xl md:block">
          <Image
            src="/images/hero.webp"
            alt={t.altHero}
            width={1200}
            height={900}
            className="hero-photo h-64 w-full object-cover object-[75%_center] lg:h-72"
            priority
          />
        </div>
      </div>
      <div id="tell">
        <TryItBox t={t} lang={locale} />
      </div>
    </section>
  );
}
