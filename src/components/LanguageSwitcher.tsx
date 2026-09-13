'use client';

import { useEffect, useRef, useState } from 'react';
import { GlobeIcon } from './Icons';

type LanguageOption = {
  code: string;
  native: string;
  english: string;
  available: boolean;
  direction?: 'rtl' | 'ltr';
};

export const languageOptions: LanguageOption[] = [
  { code: 'en', native: 'English (Australia)', english: 'English', available: true },
  { code: 'ar', native: 'العربية', english: 'Arabic', available: true, direction: 'rtl' },
  { code: 'zh', native: '中文（普通话）', english: 'Mandarin Chinese', available: true },
  { code: 'yue', native: '廣東話', english: 'Cantonese', available: true },
  { code: 'vi', native: 'Tiếng Việt', english: 'Vietnamese', available: true },
  { code: 'pa', native: 'ਪੰਜਾਬੀ', english: 'Punjabi', available: true },
  { code: 'hi', native: 'हिन्दी', english: 'Hindi', available: true },
  { code: 'ne', native: 'नेपाली', english: 'Nepali', available: true },
  { code: 'el', native: 'Ελληνικά', english: 'Greek', available: true },
];

const fallbackMessage = 'This language is shown for the client demo. The translated site is not available yet.';

function routeFor(option: LanguageOption, locale: string, currentUrl: string) {
  if (!option.available) return undefined;
  const fallback = `/${locale}`;
  const source = currentUrl || fallback;
  const prefix = `/${locale}`;
  return source === prefix || source.startsWith(`${prefix}/`) || source.startsWith(`${prefix}?`) || source.startsWith(`${prefix}#`)
    ? `/${option.code}${source.slice(prefix.length) || ''}`
    : `/${option.code}`;
}

export default function LanguageSwitcher({ locale }: { locale: string }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const [currentUrl, setCurrentUrl] = useState(`/${locale}`);
  const current = languageOptions.find((option) => option.code === locale) ?? languageOptions[0];

  useEffect(() => {
    setCurrentUrl(`${window.location.pathname}${window.location.search}${window.location.hash}`);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        detailsRef.current?.removeAttribute('open');
        setOpen(false);
        summaryRef.current?.focus({ preventScroll: true });
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!detailsRef.current?.contains(event.target as Node)) {
        detailsRef.current?.removeAttribute('open');
        setOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  return (
    <details
      ref={detailsRef}
      open={open}
      className="relative"
      onToggle={(event) => setOpen((event.currentTarget as HTMLDetailsElement).open)}
    >
      <summary
        ref={summaryRef}
        className="flex min-h-11 max-w-[9rem] cursor-pointer list-none items-center gap-2 rounded-full border border-brand-border bg-brand-bg px-3 py-2 text-sm text-brand-ink transition-colors duration-150 hover:border-brand-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary motion-reduce:transition-none sm:max-w-none [&::-webkit-details-marker]:hidden"
        aria-label="Choose language"
      >
        <GlobeIcon className="h-4 w-4 text-brand-primary" />
        <span className="max-w-[10rem] truncate" lang={current.code} dir={current.direction ?? 'ltr'}>{current.code === 'en' ? current.english : current.native}</span>
        <span aria-hidden="true" className="text-xs text-brand-muted">⌄</span>
      </summary>

      <div
        role="dialog"
        aria-label="Language options"
        aria-modal="false"
        className="fixed inset-x-4 top-20 z-50 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-2xl border border-brand-border bg-brand-bg p-2 shadow-lg sm:absolute sm:left-auto sm:right-0 sm:top-auto sm:mt-2 sm:w-80 sm:max-h-[min(70vh,32rem)]"
      >
        <div className="px-3 pb-2 pt-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand-muted">Languages</div>
        <div className="grid gap-1">
          {languageOptions.map((option) => {
            const href = routeFor(option, locale, currentUrl);
            const isCurrent = option.code === locale;
            return option.available ? (
              <a
                key={option.code}
                href={href}
                lang={option.code}
                dir={option.direction ?? 'ltr'}
                aria-current={isCurrent ? 'true' : undefined}
                className={`flex min-h-11 items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm transition-colors duration-150 hover:bg-brand-soft focus-visible:bg-brand-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-primary motion-reduce:transition-none ${isCurrent ? 'bg-brand-soft text-brand-primary' : 'text-brand-ink'}`}
              >
                <span className="min-w-0">
                  <bdi className="block truncate font-medium">{option.native}</bdi>
                  <bdi className="block truncate text-xs text-brand-muted" dir="ltr">{option.english}</bdi>
                </span>
                <span aria-hidden="true" className="flex-none text-base text-brand-primary">{isCurrent ? '✓' : ''}</span>
              </a>
            ) : (
              <button
                key={option.code}
                type="button"
                lang={option.code}
                dir={option.direction ?? 'ltr'}
                onClick={() => setNotice(fallbackMessage)}
                className="flex min-h-11 w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm text-brand-muted transition-colors duration-150 hover:bg-brand-soft focus-visible:bg-brand-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-primary motion-reduce:transition-none"
              >
                <span className="min-w-0">
                  <bdi className="block truncate font-medium text-brand-ink">{option.native}</bdi>
                  <bdi className="block truncate text-xs" dir="ltr">{option.english}</bdi>
                </span>
                <span className="flex-none text-[11px]">Coming soon</span>
              </button>
            );
          })}
        </div>
        {notice && <p role="status" className="mx-2 mt-2 rounded-lg bg-brand-soft px-3 py-2 text-xs leading-5 text-brand-muted">{notice}</p>}
        <button
          type="button"
          onClick={() => { detailsRef.current?.removeAttribute('open'); setOpen(false); summaryRef.current?.focus({ preventScroll: true }); }}
          className="mt-2 min-h-11 w-full rounded-xl border border-brand-border px-3 py-2 text-sm font-medium text-brand-primary transition-colors duration-150 hover:border-brand-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary motion-reduce:transition-none"
        >
          Close
        </button>
      </div>
    </details>
  );
}
