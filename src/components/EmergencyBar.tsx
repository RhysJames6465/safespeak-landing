import { PhoneIcon, ExitIcon } from './Icons';
import type { Dict } from '@/i18n';

export default function EmergencyBar({ t }: { t: Dict }) {
  return (
    <div className="bg-brand-emergency text-white" role="alert">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-5 py-2.5 text-sm md:px-8">
        <a href="tel:000" className="flex items-center gap-2 font-medium">
          <PhoneIcon className="h-4 w-4" />
          {t.em1}
        </a>
        <p className="order-3 w-full text-xs opacity-90 md:order-none md:w-auto">{t.em2}</p>
        <a
          href="https://www.google.com"
          rel="noopener"
          className="flex items-center gap-1.5 rounded-lg bg-white/15 px-3 py-1.5 text-xs font-medium hover:bg-white/25"
        >
          <ExitIcon className="h-3.5 w-3.5" />
          {t.hide}
        </a>
      </div>
    </div>
  );
}
