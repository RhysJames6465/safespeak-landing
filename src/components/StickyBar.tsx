"use client";

import { useEffect, useState } from 'react';
import { MicIcon, ArrowIcon } from './Icons';
import type { Dict } from '@/i18n';

export default function StickyBar({ t }: { t: Dict }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-border bg-white/95 backdrop-blur-sm">
      <a
        href="#tell"
        className="mx-auto flex max-w-6xl items-center gap-3 px-5 py-3 md:px-8"
      >
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-brand-primary text-white">
          <MicIcon className="h-5 w-5" />
        </span>
        <span className="flex-1 text-base font-medium">{t.sticky}</span>
        <ArrowIcon className="h-5 w-5 text-brand-primary rtl:rotate-180" />
      </a>
    </div>
  );
}
