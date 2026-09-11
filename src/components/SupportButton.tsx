"use client";

import { openSupport } from './SupportOverlay';

export default function SupportButton({
  children,
  variant = 'outline',
}: {
  children: React.ReactNode;
  variant?: 'outline' | 'link' | 'primary';
}) {
  const styles =
    variant === 'outline'
      ? 'inline-flex items-center justify-center gap-2 rounded-xl border-[1.5px] border-brand-primary px-6 py-3.5 text-base font-medium text-brand-primary hover:bg-brand-soft'
      : variant === 'primary'
        ? 'inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-6 py-3.5 text-base font-medium text-white hover:opacity-90'
        : 'hover:text-brand-primary';

  return (
    <button onClick={openSupport} className={styles}>
      {children}
    </button>
  );
}
