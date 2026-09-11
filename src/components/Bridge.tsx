import SupportButton from './SupportButton';
import { ArrowIcon } from './Icons';
import type { Dict } from '@/i18n';

export default function Bridge({ t }: { t: Dict }) {
  return (
    <section className="bg-brand-soft py-16">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <h2 className="text-2xl font-medium md:text-3xl">{t.bridgeH}</h2>
        <p className="mt-3 text-lg leading-relaxed text-brand-muted">{t.bridgeP}</p>
        <div className="mt-7">
          <SupportButton variant="primary">
            {t.cta2}
            <ArrowIcon className="h-4 w-4" />
          </SupportButton>
        </div>
      </div>
    </section>
  );
}
