"use client";

import { useRef, useState } from 'react';
import { MicIcon } from './Icons';
import type { Dict } from '@/i18n';

// Production path: swap the demo handler for the RAG-backed /api/understand
// endpoint. Web Speech API gives free on-device ASR for the 4 launch languages.
export default function TryItBox({ t, lang }: { t: Dict; lang: string }) {
  const [value, setValue] = useState('');
  const [listening, setListening] = useState(false);
  const [answered, setAnswered] = useState(false);
  const recRef = useRef<{ stop: () => void } | null>(null);

  const demo = () => {
    setValue(t.voice);
    setAnswered(true);
  };

  const onMic = () => {
    setAnswered(false);
    const SR =
      (window as unknown as { SpeechRecognition?: new () => never; webkitSpeechRecognition?: new () => never })
        .SpeechRecognition ??
      (window as unknown as { webkitSpeechRecognition?: new () => never }).webkitSpeechRecognition;
    if (!SR) {
      // Graceful fallback: simulate capture so the flow is never dead.
      setListening(true);
      setTimeout(() => {
        setListening(false);
        demo();
      }, 2400);
      return;
    }
    const rec = new SR();
    recRef.current = rec;
    (rec as unknown as { lang: string }).lang = lang === 'zh' ? 'zh-CN' : lang;
    (rec as unknown as { onresult: (e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void }).onresult = (e) => {
      setValue(e.results[0][0].transcript);
      setAnswered(true);
    };
    (rec as unknown as { onend: () => void }).onend = () => setListening(false);
    setListening(true);
    (rec as unknown as { start: () => void }).start();
  };

  return (
    <div className="rounded-2xl border border-brand-border bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.05)]">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-medium leading-tight">{t.heroTryHeading}</h2>
          <p className="mt-1 text-sm text-brand-muted">{t.try}</p>
        </div>
        <span className="flex-none rounded-md border border-brand-border px-2 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-brand-muted">
          {t.heroTryPreview}
        </span>
      </div>
      <div className="flex min-h-[3.5rem] items-center gap-2 rounded-xl border border-brand-border bg-brand-bg py-1 pe-1 ps-4">
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setAnswered(false);
          }}
          placeholder={t.ph}
          aria-label={t.ph}
          className="min-w-0 flex-1 bg-transparent text-base outline-none"
        />
        <button
          onClick={onMic}
          aria-label={lang === 'ar' ? 'تحدثي' : 'Speak'}
          className={`flex h-11 w-11 flex-none items-center justify-center rounded-lg text-white transition-colors ${
            listening ? 'bg-brand-emergency' : 'bg-brand-primary hover:opacity-90'
          }`}
        >
          {listening ? (
            <span className="flex items-end gap-0.5" aria-hidden="true">
              <i className="h-1.5 w-0.5 animate-pulse rounded bg-white" />
              <i className="h-3 w-0.5 animate-pulse rounded bg-white [animation-delay:150ms]" />
              <i className="h-2 w-0.5 animate-pulse rounded bg-white [animation-delay:300ms]" />
            </span>
          ) : (
            <MicIcon className="h-5 w-5" />
          )}
        </button>
      </div>
      {answered && (
        <div className="mt-4 border-t border-dashed border-brand-border pt-4">
          <span className="mb-2 inline-block rounded-md bg-brand-soft px-2.5 py-1 text-xs font-medium text-brand-primary">
            {t.tag}
          </span>
          <p className="text-sm leading-relaxed">{t.resp}</p>
        </div>
      )}
    </div>
  );
}
