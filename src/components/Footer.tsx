import { ShieldIcon } from './Icons';
import type { Dict } from '@/i18n';

export default function Footer({ t }: { t: Dict }) {
  return (
    <footer id="about" className="border-t border-brand-border bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_0.6fr_1fr] md:px-8">
        <div>
          <p className="mb-3 flex items-center gap-2 text-lg font-medium text-brand-primary">
            <ShieldIcon className="h-5 w-5" />
            SafeSpeak
          </p>
          <p className="text-xs italic leading-relaxed text-brand-muted">{t.ack}</p>
        </div>
        <nav className="flex flex-col gap-2 text-sm text-brand-primary" aria-label="Footer">
          <a href="#about" className="hover:underline">{t.f1}</a>
          <a href="#privacy" className="hover:underline">{t.f2}</a>
          <a href="#terms" className="hover:underline">{t.f3}</a>
        </nav>
        <div>
          <p className="mb-2 text-xs text-brand-muted">{t.op}</p>
          <small className="block text-xs leading-relaxed text-brand-muted">{t.disc}</small>
        </div>
      </div>
    </footer>
  );
}
