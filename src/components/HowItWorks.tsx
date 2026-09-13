import type { Dict } from '@/i18n';
import HowItWorksClient from './HowItWorksClient';

export default function HowItWorks({ t, locale }: { t: Dict; locale: string }) {
  return <HowItWorksClient t={t} locale={locale} />;
}
