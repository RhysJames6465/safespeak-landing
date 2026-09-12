import type { Dict } from '@/i18n';
import StoriesGrid from './StoriesGrid';

const cards = [
  { key: 'p1', img: '/images/story-1.webp', video: '/images/story-1-web.mp4', alt: 'altCard1', primary: true },
  { key: 'p2', img: '/images/story-2.webp', video: '/images/story-2-web.mp4', alt: 'altCard2', primary: true },
  { key: 'p3', img: '/images/story-3.webp', video: '/images/story-3-web.mp4', alt: 'altCard3', primary: false },
  { key: 'p4', img: '/images/story-4.webp', video: '/images/story-4-web.mp4', alt: 'altCard4', primary: false },
  { key: 'p5', img: '/images/story-5.webp', video: '/images/story-5-web.mp4', alt: 'altCard5', primary: false },
  { key: 'capScam', img: '/images/scamcheck.webp', video: '/images/scamcheck-web.mp4', alt: 'altScam', primary: false },
] as const;

export default function Stories({ t }: { t: Dict }) {
  return (
    <section id="stories" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-14 md:px-8">
      <h2 className="text-2xl font-medium">{t.ask}</h2>
      <p className="mt-2 text-base text-brand-muted">{t.sh}</p>
      <StoriesGrid
        cards={cards.map((c) => ({
          key: c.key,
          text: t[c.key as keyof Dict] as string,
          alt: t[c.alt as keyof Dict] as string,
          img: c.img,
          video: c.video,
          primary: c.primary,
        }))}
      />
    </section>
  );
}
