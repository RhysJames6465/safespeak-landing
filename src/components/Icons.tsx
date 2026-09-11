// Inline SVG icons — stroke 1.8, currentColor (matches approved icon set)
export const PhoneIcon = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={p.className} fill="currentColor" aria-hidden="true">
    <path d="M6.6 3.8c-1 0-1.9.9-1.9 1.9 0 7.3 6.3 13.6 13.6 13.6 1 0 1.9-.9 1.9-1.9v-2.4c0-.8-.6-1.4-1.3-1.6l-2.2-.7c-.6-.2-1.3 0-1.7.5l-.7.8a11.6 11.6 0 0 1-5.9-5.9l.8-.7c.5-.4.7-1.1.5-1.7l-.7-2.2c-.2-.7-.8-1.2-1.4-1.2Z" />
  </svg>
);

export const ExitIcon = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={p.className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M10 4H5.5A1.5 1.5 0 0 0 4 5.5v13A1.5 1.5 0 0 0 5.5 20H10M14 8l4 4-4 4M8.5 12H18" />
  </svg>
);

export const MicIcon = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={p.className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
    <rect x="9" y="3" width="6" height="10" rx="3" />
    <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3" />
  </svg>
);

export const ShieldIcon = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={p.className} fill="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M17 3.8H7C5.78 3.8 4.8 4.78 4.8 6v9.76c0 .81.44 1.55 1.16 1.94l5 2.69c.65.35 1.43.35 2.08 0l5-2.69c.72-.39 1.16-1.13 1.16-1.94V6c0-1.22-.98-2.2-2.2-2.2ZM7 2C4.79 2 3 3.79 3 6v9.76c0 1.47.81 2.83 2.1 3.52l5 2.7a4 4 0 0 0 3.8 0l5-2.7A4 4 0 0 0 21 15.76V6c0-2.21-1.79-4-4-4H7Z" fill="currentColor" />
    <path fillRule="evenodd" clipRule="evenodd" d="M16.72 8.63a1.27 1.27 0 0 1 0 1.8l-4.96 4.96a1.27 1.27 0 0 1-1.8 0l-2.67-2.67a1.27 1.27 0 0 1 1.8-1.8l2.03 2.03 4.33-4.32a1.27 1.27 0 0 1 1.8 0Z" fill="currentColor" />
  </svg>
);

export const GlobeIcon = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={p.className} fill="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M8.1 2.2a.9.9 0 0 1 1.2.4l.75 1.5H13.5a.9.9 0 1 1 0 1.8h-1.19c-.06.33-.14.74-.29 1.2a9.9 9.9 0 0 1-1.79 3.22 13.5 13.5 0 0 0 2.22 1.28c.53.2.9.33 1.2.41l1.71-3.42a.9.9 0 0 1 1.6 0l3.49 6.98.8 1.6a.9.9 0 0 1-1.6.8l-.75-1.5H13.56l-.75 1.6a.9.9 0 1 1-1.6-.8l.99-1.99 1.71-3.42c-.31-.09-.68-.22-1.2-.41a15.3 15.3 0 0 1-2.87-1.6 10.4 10.4 0 0 1-2.09 1.53c-.5.26-.91.38-1.2.45l-.13.02a.9.9 0 0 1-.2-1.79h.06c.13-.02.36-.08.76-.24.61-.25 1.4-.7 2.25-1.5a8.1 8.1 0 0 1-1.72-2.63l-.29-.94H6.9a.9.9 0 1 1 0-1.8h1.19L7.7 3a.9.9 0 0 1 .4-1.2Z" fill="currentColor" />
  </svg>
);

export const ArrowIcon = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={p.className} fill="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M21.44 12.81a.9.9 0 0 0 0-1.27l-5.54-5.54a.9.9 0 0 0-1.27 1.27l4 4H2.8a.9.9 0 1 0 0 1.8h15.84l-4.01 4.05a.9.9 0 1 0 1.28 1.26l5.53-5.57Z" fill="currentColor" />
  </svg>
);

export const LangSwitcher = ({ locale }: { locale: string }) => {
  const order = ['en', 'ar', 'zh', 'vi'];
  const names: Record<string, string> = { en: 'English', ar: 'العربية', zh: '中文', vi: 'Tiếng Việt' };
  return (
    <div className="flex gap-1" role="group" aria-label="Language / اللغة / 语言 / Ngôn ngữ">
      {order.map((l) => (
        <a
          key={l}
          href={`/${l}`}
          lang={l}
          aria-current={l === locale ? 'true' : undefined}
          className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
            l === locale
              ? 'bg-brand-primary text-white font-medium'
              : 'text-brand-muted hover:text-brand-primary'
          }`}
        >
          {names[l]}
        </a>
      ))}
    </div>
  );
};
