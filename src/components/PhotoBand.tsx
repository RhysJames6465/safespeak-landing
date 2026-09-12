import Image from 'next/image';
import type { Dict } from '@/i18n';

export default function PhotoBand({ t }: { t: Dict }) {
  return (
    <section aria-label={t.capT}>
      <div className="grade-warm relative">
        {/* Desktop: full triptych */}
        <Image
          src="/images/band.webp"
          alt={t.altBand}
          width={1600}
          height={666}
          className="hidden w-full object-cover md:block"
          loading="lazy"
        />
        {/* Mobile: single panel (train) so faces stay legible */}
        <Image
          src="/images/band-mobile.webp"
          alt={t.altBand}
          width={720}
          height={720}
          className="aspect-[4/3] w-full object-cover md:hidden"
          loading="lazy"
        />
      </div>
    </section>
  );
}
