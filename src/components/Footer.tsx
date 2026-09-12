import { ShieldIcon, PhoneIcon, ExitIcon, LangSwitcher } from './Icons';
import type { Dict } from '@/i18n';

const linkCls =
  'text-sm text-brand-primary underline decoration-transparent underline-offset-2 transition-colors duration-150 hover:decoration-current focus-visible:decoration-current';

export default function Footer({ t, locale }: { t: Dict; locale: string }) {
  return (
    <footer id="about" className="border-t border-brand-border bg-white">
      {/* Band 1 — primary: brand, navigation, safety actions */}
      <div className="mx-auto grid max-w-6xl gap-8 px-5 pt-10 pb-8 md:grid-cols-[2fr_1fr_1.4fr_2.4fr] md:gap-6 md:px-8">
        <div className="order-2 md:order-1">
          <a href={`/${locale}`} className="flex items-center gap-2 text-xl font-medium text-brand-primary">
            <ShieldIcon className="h-6 w-6" />
            SafeSpeak
          </a>
          <p className="mt-3 max-w-[30ch] text-sm leading-relaxed text-brand-muted">{t.fBrandP}</p>
        </div>

        <nav className="order-3 md:order-2" aria-label={t.fHelpH}>
          <h3 className="text-sm font-medium text-brand-ink">{t.fHelpH}</h3>
          <ul className="mt-3 space-y-2.5">
            <li>
              <a href={`/${locale}/support`} className={linkCls}>
                {t.fHelpSafety}
              </a>
            </li>
            <li>
              <a href="#how" className={linkCls}>
                {t.how}
              </a>
            </li>
          </ul>
        </nav>

        <nav className="order-4 md:order-3" aria-label={t.fAboutH}>
          <h3 className="text-sm font-medium text-brand-ink">{t.fAboutH}</h3>
          <ul className="mt-3 space-y-2.5">
            <li>
              <a href="#about" className={linkCls}>
                {t.fAboutSafe}
              </a>
            </li>
          </ul>
        </nav>

        <div className="order-1 md:order-4">
          <div className="rounded-2xl border border-brand-border bg-brand-bg p-5">
            <h3 className="text-base font-medium text-brand-ink">{t.fUrgentH}</h3>
            <p className="mt-1 text-sm leading-relaxed text-brand-muted">{t.fUrgentP}</p>
            <a
              href="tel:000"
              className="mt-4 flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-brand-emergency px-4 py-2.5 text-sm font-medium text-white transition-opacity duration-150 hover:opacity-90"
            >
              <PhoneIcon className="h-4 w-4" />
              {t.fCall000}
            </a>
            <div className="mt-4 border-t border-dashed border-brand-border pt-4">
              <a
                href="https://www.google.com"
                rel="noopener"
                className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-brand-border bg-white px-4 py-2.5 text-sm font-medium text-brand-primary transition-colors duration-150 hover:border-brand-primary"
              >
                <ExitIcon className="h-4 w-4" />
                {t.fExit}
              </a>
              <p className="mt-2 text-xs leading-relaxed text-brand-muted">{t.fExitP}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Band 2 — Acknowledgement of Country */}
      <div className="border-t border-brand-border bg-brand-bg">
        <div className="mx-auto max-w-6xl px-5 py-5 md:px-8">
          <p className="max-w-[75ch] text-xs leading-relaxed text-brand-muted">{t.ack}</p>
        </div>
      </div>

      {/* Band 3 — legal and accessibility */}
      <div className="border-t border-brand-border bg-brand-bg">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-5 py-4 md:px-8">
          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Legal">
            <a href="#privacy" className={linkCls}>
              {t.f2}
            </a>
            <a href="#terms" className={linkCls}>
              {t.f3}
            </a>
          </nav>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-brand-muted">{t.fLang}</span>
            <LangSwitcher locale={locale} />
          </div>
          <small className="text-xs leading-relaxed text-brand-muted md:ml-auto md:max-w-md">
            {t.disc}
          </small>
        </div>
      </div>
    </footer>
  );
}
