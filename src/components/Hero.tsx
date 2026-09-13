import Image from 'next/image';
import { ShieldIcon } from './Icons';
import HeroVideoSurface from './HeroVideoSurface';
import type { Dict } from '@/i18n';

export default function Hero({ t, locale }: { t: Dict; locale: string }) {
  return (
    <section id="tell" className="relative isolate mx-auto max-w-6xl px-5 pb-8 pt-8 md:px-8 md:pb-14 md:pt-14">
      <HeroVideoSurface playLabel={t.heroPlay} pauseLabel={t.heroPause} replayLabel={t.heroReplay} />
      <div className="relative z-10 grid gap-12 md:grid-cols-1 md:items-center md:gap-10 min-[1100px]:grid-cols-[50fr_50fr] min-[1100px]:gap-14">
        <div className="hero-copy md:pt-3">
          <p className="mb-5 max-w-[42ch] text-sm font-medium leading-relaxed text-brand-primary">
            {t.heroIntro}
          </p>
          <h1 className="max-w-[16ch] text-3xl font-medium leading-[1.12] md:text-[2.75rem] min-[1100px]:w-[37.5rem] min-[1100px]:max-w-[22ch] min-[1100px]:text-[clamp(3.5rem,3.9vw,3.875rem)] min-[1100px]:leading-[1.03]">
            {t.h1}
          </h1>
          <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-brand-muted">{t.sub}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={`/${locale}/tell-us`}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-primary px-6 py-3 text-base font-medium text-white transition-opacity duration-150 hover:opacity-90"
            >
              {t.cta1}
            </a>
            <a
              href={`/${locale}/support`}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border-[1.5px] border-brand-primary px-6 py-3 text-base font-medium text-brand-primary transition-colors duration-150 hover:bg-brand-soft"
            >
              {t.cta2}
            </a>
          </div>
          <p className="mt-5 flex items-center gap-2 text-sm font-medium">
            <ShieldIcon className="h-4 w-4 flex-none text-brand-primary" />
            {t.tr}
          </p>
        </div>

        <div className="hero-visual relative self-start md:block min-[1100px]:hidden md:pt-0">
          <div className="hero-artwork relative aspect-[1052/778] w-full">
            <Image
              src="/images/hero1.webp"
              alt={t.altHeroCommunity}
              width={1052}
              height={778}
              className="h-full w-full object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
