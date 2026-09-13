'use client';

import { useRef, useState } from 'react';
import type { Dict } from '@/i18n';

export default function TellUsForm({ t }: { t: Dict }) {
  const [value, setValue] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const meaningful = value.trim().length > 0;
  const submit = () => {
    if (!meaningful) return;
    setSubmitted(true);
    requestAnimationFrame(() => resultRef.current?.focus());
  };
  return <form onSubmit={event => { event.preventDefault(); submit(); }} className="mt-8 max-w-2xl rounded-2xl border border-brand-border bg-brand-story p-5 shadow-sm sm:p-7">
    <label htmlFor="tell-story" className="text-base font-medium">{t.tellLabel}</label>
    <textarea id="tell-story" name="story" value={value} onChange={event => { setValue(event.target.value.slice(0, 2000)); setSubmitted(false); }} placeholder={t.tellPlaceholder} dir="auto" maxLength={2000} rows={8} className="mt-3 min-h-44 w-full resize-y rounded-xl border border-brand-border bg-white p-4 text-base leading-relaxed text-brand-ink outline-none transition-shadow placeholder:text-brand-muted focus-visible:ring-2 focus-visible:ring-brand-primary" aria-describedby="tell-privacy tell-counter tell-validation" />
    <div className="mt-2 flex flex-wrap justify-between gap-2 text-sm text-brand-muted"><span id="tell-counter">{t.tellCounter.replace('{count}', String(value.length))}</span><span aria-live="polite">{!meaningful && value.length > 0 ? t.tellValidation : ''}</span></div>
    <p id="tell-privacy" className="mt-4 text-sm leading-relaxed text-brand-muted">{t.tellPrivacy}</p>
    <div className="mt-5 flex flex-col gap-3 sm:flex-row"><button type="submit" disabled={!meaningful} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand-primary px-6 py-3 text-base font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-45">{t.tellPrimary}</button><button type="button" onClick={() => { setValue(''); setSubmitted(false); }} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-brand-primary px-6 py-3 text-base font-medium text-brand-primary transition-colors hover:bg-brand-soft">{t.tellClear}</button></div>
    {submitted && <div ref={resultRef} tabIndex={-1} role="status" aria-live="polite" className="mt-6 rounded-xl border border-brand-primary/30 bg-brand-soft p-4 outline-none"><h2 className="text-lg font-medium">{t.tellExamplesHeading}</h2><p className="mt-1 text-sm text-brand-muted">{t.tellExamplesIntro}</p><ul className="mt-3 list-disc space-y-1 ps-5 text-sm"><li>{t.tellOptionUnderstand}</li><li>{t.tellOptionSupport}</li><li>{t.tellOptionReport}</li></ul></div>}
  </form>;
}
