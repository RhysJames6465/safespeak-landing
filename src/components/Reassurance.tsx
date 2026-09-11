import type { Dict } from '@/i18n';

const items = [
  { title: 'r1t', body: 'reas' },
  { title: 'r2t', body: 'r2' },
  { title: 'r3t', body: 'ai' },
] as const;

export default function Reassurance({ t }: { t: Dict }) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-14 md:px-8">
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((it) => (
          <div key={it.title} className="rounded-2xl bg-brand-soft p-6">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-brand-muted">
              {t[it.title]}
            </p>
            <p className="text-base leading-relaxed">{t[it.body]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
