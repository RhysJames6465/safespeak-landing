"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { Dict } from '@/i18n';

const EVENT = 'safespeak:support';

export function openSupport() {
  window.dispatchEvent(new CustomEvent(EVENT));
}

const audiences = [
  { title: 'audW', desc: 'audWd', img: '/images/support-women.webp', alt: 'altSupportW' },
  { title: 'audS', desc: 'audSd', img: '/images/support-seniors.webp', alt: 'altSupportS' },
  { title: 'audF', desc: 'audFd', img: '/images/support-families.svg', alt: 'altSupportF' },
  { title: 'audY', desc: 'audYd', img: '/images/support-youth.webp', alt: 'altSupportY' },
] as const;

export default function SupportOverlay({ t }: { t: Dict }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(EVENT, onOpen);
    return () => window.removeEventListener(EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.cta2}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm sm:items-center"
      onClick={() => setOpen(false)}
    >
      <div
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-white p-6 sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-medium">{t.cta2}</h2>
            <p className="mt-1 text-base text-brand-muted">{t.supSub}</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label={t.supClose}
            className="rounded-full border border-brand-border px-3 py-1.5 text-sm text-brand-muted hover:text-brand-primary"
          >
            ✕
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {audiences.map((a) => (
            <div key={a.title} className="overflow-hidden rounded-xl border border-brand-border">
              <div className="img-tint relative aspect-[4/3] w-full">
                <Image
                  src={a.img}
                  alt={t[a.alt as keyof Dict] as string}
                  fill
                  sizes="(min-width:640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-base font-medium">{t[a.title as keyof Dict]}</h3>
                <p className="mt-1 text-sm leading-relaxed text-brand-muted">
                  {t[a.desc as keyof Dict]}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-5 border-t border-brand-border pt-4 text-xs text-brand-muted">{t.supNote}</p>
      </div>
    </div>
  );
}
