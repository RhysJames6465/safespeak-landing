import { ArrowIcon } from './Icons';
import type { Dict } from '@/i18n';

export default function Bridge({ t, locale }: { t: Dict; locale: string }) {
  return (
    <section className="bg-brand-soft py-16">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <h2 className="text-2xl font-medium md:text-3xl">{t.bridgeH}</h2>
        <p className="mt-3 text-lg leading-relaxed text-brand-muted">{t.bridgeP}</p>
        <div className="mt-7">
          <a
            href={`/${locale}/support`}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-6 py-3.5 text-base font-medium text-white hover:opacity-90"
          >
            {t.cta2}
            <ArrowIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
