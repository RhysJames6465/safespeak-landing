import { ShieldIcon, LangSwitcher } from './Icons';
import SupportButton from './SupportButton';
import type { Dict } from '@/i18n';

export default function Header({ t, locale }: { t: Dict; locale: string }) {
  return (
    <header className="mx-auto flex max-w-6xl items-center gap-6 px-5 py-5 md:px-8">
      <a href={`/${locale}`} className="flex items-center gap-2 text-xl font-medium text-brand-primary">
        <ShieldIcon className="h-6 w-6" />
        SafeSpeak
      </a>
      <span className="flex-1" />
      <nav className="hidden items-center gap-6 text-sm text-brand-muted md:flex" aria-label="Sections">
        <a href="#stories" className="hover:text-brand-primary">{t.ask}</a>
        <a href="#how" className="hover:text-brand-primary">{t.how}</a>
        <SupportButton variant="link">{t.cta2}</SupportButton>
        <a href="#about" className="hover:text-brand-primary">{t.f1}</a>
      </nav>
      <LangSwitcher locale={locale} />
    </header>
  );
}
