import type { Dict } from '@/i18n';
import HowItWorksClient from './HowItWorksClient';

export default function HowItWorks({ t }: { t: Dict }) {
  return <HowItWorksClient t={t} />;
}
