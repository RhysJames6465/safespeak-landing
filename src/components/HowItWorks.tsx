import type { Dict } from '@/i18n';

const steps = ['s1', 's2', 's3'] as const;

export default function HowItWorks({ t }: { t: Dict }) {
  return (
    <section id="how" className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-14 md:px-8">
      <h2 className="text-2xl font-medium">{t.how}</h2>
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {steps.map((s, i) => (
          <div key={s} className="rounded-2xl border border-brand-border bg-white p-6">
            <span className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-brand-soft text-sm font-medium text-brand-primary">
              {i + 1}
            </span>
            <h3 className="text-lg font-medium">{t[`${s}t` as keyof Dict]}</h3>
            <p className="mt-2 text-base leading-relaxed text-brand-muted">
              {t[`${s}d` as keyof Dict]}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
