import { ShieldIcon, PhoneIcon, ExitIcon } from './Icons';
import type { Dict } from '@/i18n';

const linkCls =
  'inline-flex min-h-[44px] items-center text-sm text-brand-primary underline decoration-transparent underline-offset-4 transition-colors duration-150 hover:decoration-current focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary motion-reduce:transition-none sm:min-h-0';

const navHeadingCls =
  'text-xs font-semibold uppercase tracking-[0.12em] text-brand-ink';

export default function Footer({ t, locale }: { t: Dict; locale: string }) {
  return (
    <footer id="about" className="border-t border-brand-border bg-brand-bg">
      {/* Band 1 — primary: brand, navigation, safety actions */}
      <div className="mx-auto grid max-w-7xl gap-10 px-6 pb-12 pt-14 md:grid-cols-[minmax(0,1fr)_minmax(16rem,0.72fr)] md:gap-x-10 md:gap-y-12 md:px-8 md:pb-14 md:pt-16 xl:grid-cols-[minmax(0,28fr)_minmax(0,42fr)_minmax(15rem,23fr)] xl:gap-12">
        <div className="order-1 self-start">
          <a
            href={`/${locale}`}
            className="inline-flex min-h-[44px] items-center gap-2 text-xl font-medium text-brand-primary focus-visible:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
          >
            <ShieldIcon className="h-7 w-7" />
            SafeSpeak
          </a>
          <p className="mt-6 max-w-[30ch] text-sm leading-6 text-brand-muted">{t.fBrandP}</p>
        </div>

        <div className="order-3 grid self-start gap-8 sm:grid-cols-3 sm:gap-6 md:col-span-2 xl:order-2 xl:col-span-1 xl:gap-10">
          <nav aria-label={t.fHelpH}>
            <h3 className={navHeadingCls}>{t.fHelpH}</h3>
            <ul className="mt-5 space-y-0.5 sm:mt-6 sm:space-y-4">
              <li>
                <a href={`/${locale}/support`} className={linkCls}>
                  {t.fHelpSafety}
                </a>
              </li>
              <li>
                <a href={`/${locale}#how`} className={linkCls}>
                  {t.how}
                </a>
              </li>
              <li>
                <a href={`/${locale}/support#legal`} className={linkCls}>
                  {t.fResources}
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label={t.fTrustH}>
            <h3 className={navHeadingCls}>{t.fTrustH}</h3>
            <ul className="mt-5 space-y-0.5 sm:mt-6 sm:space-y-4">
              <li>
                <a href={`/${locale}/support#privacy`} className={linkCls}>
                  {t.f2}
                </a>
              </li>
              <li>
                <a href={`/${locale}#ai-transparency`} className={linkCls}>
                  {t.fAiTransparency}
                </a>
              </li>
              <li>
                <a href={`/${locale}/support#legal`} className={linkCls}>
                  {t.fSources}
                </a>
              </li>
              <li>
                <a href={`/${locale}/support#accessibility`} className={linkCls}>
                  {t.fAccessibility}
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label={t.fAboutH}>
            <h3 className={navHeadingCls}>{t.fAboutH}</h3>
            <ul className="mt-5 space-y-0.5 sm:mt-6 sm:space-y-4">
              <li>
                <a href={`/${locale}#about`} className={linkCls}>
                  {t.fAboutSafe}
                </a>
              </li>
              <li>
                <a href={`/${locale}#how`} className={linkCls}>
                  {t.fOurApproach}
                </a>
              </li>
              <li>
                <a href={`/${locale}/support#talk`} className={linkCls}>
                  {t.fContact}
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="order-2 self-start xl:order-3">
          <h3 className={navHeadingCls}>{t.fUrgentH}</h3>
          <p className="mt-5 max-w-[32ch] text-sm leading-6 text-brand-muted">{t.fUrgentP}</p>
          <div className={`mt-5 grid items-start gap-3 ${locale === 'ar' ? '' : 'xl:grid-cols-2'}`}>
            <a
              href="tel:000"
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-emergency px-4 py-2.5 text-sm font-medium text-white transition-opacity duration-150 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-emergency motion-reduce:transition-none"
            >
              <PhoneIcon className="h-4 w-4" />
              {t.fCall000}
            </a>
            <div>
              <a
                href="https://www.google.com"
                rel="noopener"
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-brand-primary bg-transparent px-4 py-2.5 text-sm font-medium text-brand-primary transition-colors duration-150 hover:bg-brand-primary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary motion-reduce:transition-none"
              >
                <ExitIcon className="h-4 w-4" />
                {t.fExit}
              </a>
              <p className="mt-2 text-xs leading-5 text-brand-muted">{t.fExitP}</p>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
