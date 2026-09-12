import { ExitIcon, ListIcon, ShieldIcon } from './Icons';
import LangSwitcher from './LanguageSwitcher';
import type { Dict } from '@/i18n';

export default function Header({ t, locale }: { t: Dict; locale: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-border bg-white">
      <div className="mx-auto flex min-h-[4.5rem] max-w-6xl flex-wrap items-center gap-3 gap-y-1 px-5 py-3 md:min-h-[6.25rem] md:gap-6 md:px-8 md:py-4">
        <a
          href={`/${locale}`}
          className="flex min-h-11 flex-none items-center gap-2 text-xl font-medium text-brand-primary focus-visible:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary md:w-[18rem] md:text-2xl"
          aria-label="SafeSpeak home"
        >
          <ShieldIcon className="h-8 w-8 md:h-10 md:w-10" />
          SafeSpeak
        </a>
        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-5 text-sm text-brand-muted lg:flex xl:gap-7" aria-label="Sections">
          <a href="#stories" className="rounded-md px-1 py-2 transition-colors duration-150 hover:text-brand-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary motion-reduce:transition-none">{t.ask}</a>
          <a href="#how" className="rounded-md px-1 py-2 transition-colors duration-150 hover:text-brand-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary motion-reduce:transition-none">{t.how}</a>
          <a href={`/${locale}/support`} className="rounded-md px-1 py-2 transition-colors duration-150 hover:text-brand-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary motion-reduce:transition-none">{t.cta2}</a>
          <a href="#about" className="rounded-md px-1 py-2 transition-colors duration-150 hover:text-brand-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary motion-reduce:transition-none">{t.f1}</a>
        </nav>
        <div className="ms-auto flex flex-none items-center gap-2 max-sm:basis-full max-sm:justify-end md:gap-3">
          <LangSwitcher locale={locale} />
          <a
            href="https://www.google.com"
            rel="noopener"
            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border border-brand-primary px-3 py-2 text-sm font-medium text-brand-primary transition-colors duration-150 hover:bg-brand-primary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary motion-reduce:transition-none sm:px-4"
          >
            <ExitIcon className="h-4 w-4" />
            <span>{t.fExit}</span>
          </a>
          <details className="relative lg:hidden">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-center rounded-full border border-brand-border p-2 text-brand-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary [&::-webkit-details-marker]:hidden">
              <ListIcon className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </summary>
            <nav className="absolute end-0 top-14 z-40 min-w-56 rounded-xl border border-brand-border bg-white p-2 shadow-lg" aria-label="Sections">
              <a href="#stories" className="flex min-h-11 items-center rounded-lg px-3 py-2 text-sm text-brand-ink hover:bg-brand-soft">{t.ask}</a>
              <a href="#how" className="flex min-h-11 items-center rounded-lg px-3 py-2 text-sm text-brand-ink hover:bg-brand-soft">{t.how}</a>
              <a href={`/${locale}/support`} className="flex min-h-11 items-center rounded-lg px-3 py-2 text-sm text-brand-ink hover:bg-brand-soft">{t.cta2}</a>
              <a href="#about" className="flex min-h-11 items-center rounded-lg px-3 py-2 text-sm text-brand-ink hover:bg-brand-soft">{t.f1}</a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
