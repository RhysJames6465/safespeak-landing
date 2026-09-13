import type { Dict } from '@/i18n';
import StoriesGrid from './StoriesGrid';

const cards = [
  { key: 'p1', category: 'storyCategoryWorkplace', img: '/images/story-1.webp', video: '/images/story-1-web.mp4', alt: 'altCard1', scamShield: false },
  { key: 'p2', category: 'storyCategorySchool', img: '/images/story-2.webp', video: '/images/story-2-web.mp4', alt: 'altCard2', scamShield: false },
  { key: 'p3', category: 'storyCategoryOnline', img: '/images/story-3.webp', video: '/images/story-3-web.mp4', alt: 'altCard3', scamShield: false },
  { key: 'p4', category: 'storyCategoryPublic', img: '/images/story-4.webp', video: '/images/story-4-web.mp4', alt: 'altCard4', scamShield: false },
  { key: 'p5', category: 'storyCategoryUnsure', img: '/images/story-5.webp', video: '/images/story-5-web.mp4', alt: 'altCard5', scamShield: false },
  { key: 'capScam', category: 'storyCategoryScam', img: '/images/scamcheck.webp', video: '/images/scamcheck-web.mp4', alt: 'altScam', scamShield: true },
] as const;

export default function Stories({ t }: { t: Dict }) {
  return (
    <section id="stories" className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-14 pt-10 md:px-8 md:pt-16">
      <h2 className="text-2xl font-medium">{t.ask}</h2>
      <p className="mt-2 max-w-[62ch] text-base leading-relaxed text-brand-muted">{t.sh}</p>
      <StoriesGrid
        cards={cards.map((c) => ({
          key: c.key,
          category: t[c.category as keyof Dict] as string,
          text: t[c.key as keyof Dict] as string,
          alt: t[c.alt as keyof Dict] as string,
          img: c.img,
          video: c.video,
          scamShield: c.scamShield,
        }))}
      />
    </section>
  );
}
