import Image from 'next/image';
import type { Dict } from '@/i18n';

const cards = [
  { key: 'p1', img: '/images/story-1.webp', alt: 'altCard1', primary: true },
  { key: 'p2', img: '/images/story-2.webp', alt: 'altCard2', primary: true },
  { key: 'p3', img: '/images/story-3.webp', alt: 'altCard3', primary: false },
  { key: 'p4', img: '/images/story-4.webp', alt: 'altCard4', primary: false },
  { key: 'p5', img: '/images/story-5.webp', alt: 'altCard5', primary: false },
  { key: 'capScam', img: '/images/scamcheck.webp', alt: 'altScam', primary: false },
] as const;

export default function Stories({ t }: { t: Dict }) {
  return (
    <section id="stories" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-14 md:px-8">
      <h2 className="text-2xl font-medium">{t.ask}</h2>
      <p className="mt-2 text-base text-brand-muted">{t.sh}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {cards.map((c) => {
          const text = t[c.key as keyof Dict] as string;
          const cls = c.primary
            ? 'bg-brand-soft font-medium'
            : 'border border-brand-border bg-white font-normal';
          return (
            <a
              key={c.key}
              href="#tell"
              className={`group overflow-hidden rounded-xl transition-shadow hover:shadow-md focus-visible:shadow-md ${
                c.primary ? 'sm:col-span-1 lg:col-span-2' : 'sm:col-span-1 lg:col-span-2'
              }`}
            >
              {c.img ? (
                <div className="img-tint relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={c.img}
                    alt={t[c.alt as keyof Dict] as string}
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              ) : null}
              <div className={`min-h-[5.5rem] p-5 ${cls}`}>
                <p className="text-base leading-snug">{text}</p>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
