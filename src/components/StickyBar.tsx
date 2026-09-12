"use client";

import { useEffect, useState } from 'react';
import { MicIcon, ArrowIcon } from './Icons';
import type { Dict } from '@/i18n';

export default function StickyBar({ t }: { t: Dict }) {
  const [visible, setVisible] = useState(false);
  const [footerNear, setFooterNear] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;
    const io = new IntersectionObserver(
      (entries) => setFooterNear(entries.some((e) => e.isIntersecting)),
      { threshold: 0 }
    );
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  if (!visible) return null;

  const hidden = footerNear;
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-brand-border bg-white/95 backdrop-blur-sm transition-all duration-200 motion-reduce:transition-none ${
        hidden ? 'pointer-events-none translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      <a
        href="#tell"
        tabIndex={hidden ? -1 : undefined}
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
