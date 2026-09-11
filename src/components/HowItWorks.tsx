import { MicIcon, ListIcon, HandCheckIcon } from './Icons';
import type { Dict } from '@/i18n';

const steps = ['s1', 's2', 's3'] as const;
const icons = [MicIcon, ListIcon, HandCheckIcon];

export default function HowItWorks({ t }: { t: Dict }) {
  return (
    <section id="how" className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-14 md:px-8">
      <h2 className="text-2xl font-medium">{t.how}</h2>
      <p className="mt-2 text-sm font-medium text-brand-primary">{t.howMeta}</p>
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {steps.map((s, i) => {
          const Icon = icons[i];
          return (
            <div key={s} className="rounded-2xl border border-brand-border bg-white p-6">
              <div className="mb-4 flex items-center gap-2.5">
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-brand-soft text-sm font-medium text-brand-primary">
                  {i + 1}
                </span>
                <Icon className="h-5 w-5 text-brand-primary" />
              </div>
              <h3 className="text-lg font-medium">{t[`${s}t` as keyof Dict]}</h3>
              <p className="mt-2 text-base leading-relaxed text-brand-muted">
                {t[`${s}d` as keyof Dict]}
              </p>
              <p className="mt-4 border-t border-dashed border-brand-border pt-3 text-xs leading-relaxed text-brand-muted">
                {t[`${s}r` as keyof Dict]}
              </p>
            </div>
          );
        })}
      </div>

      <details className="mt-6 rounded-2xl border border-brand-border bg-white px-6 py-4">
        <summary className="cursor-pointer select-none text-base font-medium text-brand-primary">
          {t.exBtn}
        </summary>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-brand-border bg-brand-bg p-4">
            <p className="text-sm font-medium">{t.exT1}</p>
            <p className="mt-2 text-sm leading-relaxed text-brand-muted">{t.exB1}</p>
          </div>
          <div className="rounded-xl border border-brand-border bg-brand-bg p-4">
            <p className="text-sm font-medium">{t.exT2}</p>
            <p className="mt-2 text-sm leading-relaxed text-brand-muted">{t.exB2}</p>
          </div>
          <div className="rounded-xl border border-brand-border bg-brand-bg p-4">
            <p className="text-sm font-medium">{t.exT3}</p>
            <p className="mt-2 text-sm leading-relaxed text-brand-muted">{t.exB3}</p>
          </div>
        </div>
      </details>

      <p className="mt-8 text-center text-sm font-medium text-brand-muted">{t.howClose}</p>
    </section>
  );
}
