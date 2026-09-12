'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { MicIcon, ListIcon, HandCheckIcon } from './Icons';
import type { Dict } from '@/i18n';

const steps = ['s1', 's2', 's3'] as const;
const icons = [MicIcon, ListIcon, HandCheckIcon];
const rowWidths = ['72%', '52%', '62%'];

type CardState = 'inactive' | 'active' | 'complete';

export default function HowItWorksClient({ t }: { t: Dict }) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const pointerRef = useRef(false);
  const reduceRef = useRef(false);
  const seqStartedRef = useRef(false);
  const timersRef = useRef<Array<{ id: number; start: number; delay: number; fn: () => void }>>([]);

  const [states, setStates] = useState<CardState[]>(['inactive', 'inactive', 'inactive']);
  const [runId, setRunId] = useState([0, 0, 0]);
  const [waveDone, setWaveDone] = useState([true, true, true]);
  const [conn1, setConn1] = useState(0);
  const [conn2, setConn2] = useState(0);
  const [payoff, setPayoff] = useState(false);
  const [deskLinks, setDeskLinks] = useState<number[] | null>(null);
  const [mobLinks, setMobLinks] = useState<number[] | null>(null);

  const schedule = useCallback((delay: number, fn: () => void) => {
    const item = { id: 0, start: performance.now(), delay, fn };
    item.id = window.setTimeout(() => {
      timersRef.current = timersRef.current.filter((x) => x !== item);
      fn();
    }, delay);
    timersRef.current.push(item);
  }, []);

  const setCard = useCallback((i: number, s: CardState) => {
    setStates((prev) => prev.map((v, j) => (j === i ? s : v)));
  }, []);

  const triggerCard = useCallback(
    (i: number) => {
      setRunId((r) => r.map((v, j) => (j === i ? v + 1 : v)));
      if (!reduceRef.current) {
        setWaveDone((w) => w.map((v, j) => (j === i ? false : v)));
        schedule(900, () => setWaveDone((w) => w.map((v, j) => (j === i ? true : v))));
      }
      setCard(i, 'active');
    },
    [schedule, setCard]
  );

  const pauseTimers = useCallback(() => {
    const now = performance.now();
    timersRef.current.forEach((tm) => {
      window.clearTimeout(tm.id);
      tm.delay = Math.max(0, tm.delay - (now - tm.start));
    });
  }, []);

  const resumeTimers = useCallback(() => {
    timersRef.current.forEach((tm) => {
      tm.start = performance.now();
      tm.id = window.setTimeout(() => {
        timersRef.current = timersRef.current.filter((x) => x !== tm);
        tm.fn();
      }, tm.delay);
    });
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const cleanups: Array<() => void> = [];

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      // Completed visual state immediately; no travel, no staggered entrances.
      reduceRef.current = true;
      setStates(['complete', 'complete', 'complete']);
      setRunId([1, 1, 1]);
      return;
    }

    const pointer = !window.matchMedia('(hover: none), (pointer: coarse)').matches;
    pointerRef.current = pointer;

    if (pointer) {
      // Desktop: run the whole pathway sequence once, at ~40% visibility.
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting) && !seqStartedRef.current) {
            seqStartedRef.current = true;
            io.disconnect();
            triggerCard(0);
            schedule(1400, () => setConn1((k) => k + 1));
            schedule(1860, () => {
              setCard(0, 'complete');
              triggerCard(1);
            });
            schedule(3260, () => setConn2((k) => k + 1));
            schedule(3720, () => {
              setCard(1, 'complete');
              triggerCard(2);
            });
            schedule(5160, () => {
              setCard(2, 'complete');
              setPayoff(true);
              schedule(900, () => setPayoff(false));
            });
          }
        },
        { threshold: 0.4 }
      );
      io.observe(section);
      cleanups.push(() => io.disconnect());
    } else {
      // Touch: animate each card once when ~60% visible, one at a time.
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const io = new IntersectionObserver(
          (entries) => {
            if (entries.some((e) => e.intersectionRatio >= 0.6)) {
              io.disconnect();
              // Keep to one animating card at a time: settle any still-active card.
              setStates((prev) => prev.map((v) => (v === 'active' ? 'complete' : v)));
              triggerCard(i);
              schedule(1500, () => setCard(i, 'complete'));
            }
          },
          { threshold: [0.6] }
        );
        io.observe(el);
        cleanups.push(() => io.disconnect());
      });
    }

    const onVisibility = () => {
      if (document.hidden) pauseTimers();
      else resumeTimers();
    };
    document.addEventListener('visibilitychange', onVisibility);
    cleanups.push(() => document.removeEventListener('visibilitychange', onVisibility));

    return () => {
      cleanups.forEach((f) => f());
      timersRef.current.forEach((tm) => window.clearTimeout(tm.id));
      timersRef.current = [];
    };
  }, [schedule, setCard, triggerCard, pauseTimers, resumeTimers]);

  // Measure circle positions so the teal pathway can connect them in LTR and RTL.
  useEffect(() => {
    const measure = () => {
      const stage = stageRef.current;
      if (!stage) return;
      const sr = stage.getBoundingClientRect();
      const pts = circleRefs.current.map((el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2 - sr.left, y: r.top + r.height / 2 - sr.top, rad: r.width / 2 };
      });
      const desk: number[] = [];
      const mob: number[] = [];
      for (let i = 0; i + 1 < pts.length; i++) {
        const a = pts[i];
        const b = pts[i + 1];
        if (!a || !b) continue;
        desk.push(a.x + a.rad + 3, a.y, b.x - b.rad - 3, b.y);
        mob.push(a.x, a.y + a.rad + 3, b.x, b.y - b.rad - 3);
      }
      setDeskLinks(desk.length ? desk : null);
      setMobLinks(mob.length ? mob : null);
    };
    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('load', measure);
    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('load', measure);
    };
  }, []);

  const renderPathway = (arr: number[] | null, cls: string, withDots: boolean) => (
    <svg className={`pointer-events-none absolute inset-0 z-20 h-full w-full ${cls}`} aria-hidden="true">
      {arr &&
        (() => {
          const els = [];
          for (let i = 0; i < arr.length; i += 4) {
            els.push(
              <line
                key={`l${i}`}
                x1={arr[i]}
                y1={arr[i + 1]}
                x2={arr[i + 2]}
                y2={arr[i + 3]}
                stroke="#0E6B5C"
                strokeWidth="1.5"
                strokeDasharray={withDots ? undefined : '3 5'}
                opacity="0.35"
              />
            );
            if (withDots) {
              const key = i === 0 ? conn1 : i === 4 ? conn2 : 0;
              if (key > 0) {
                els.push(
                  <circle
                    key={`d${i}-${key}`}
                    className="pw-dot"
                    r="3.5"
                    fill="#0E6B5C"
                    style={{
                      offsetPath: `path('M ${arr[i]} ${arr[i + 1]} L ${arr[i + 2]} ${arr[i + 3]}')`,
                    }}
                  />
                );
              }
            }
          }
          return els;
        })()}
    </svg>
  );

  return (
    <section ref={sectionRef} id="how" className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-14 md:px-8">
      <h2 className="text-2xl font-medium">{t.how}</h2>
      <p className="mt-2 text-sm font-medium text-brand-primary">{t.howMeta}</p>
      <div ref={stageRef} className="relative mt-6">
        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => {
            const Icon = icons[i];
            return (
              <div
                key={s}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                data-state={states[i]}
                className="pw-card rounded-2xl border border-brand-border bg-white p-6"
                onMouseEnter={() => {
                  if (pointerRef.current) triggerCard(i);
                }}
                onMouseLeave={() => {
                  if (pointerRef.current) setCard(i, 'complete');
                }}
              >
                <div className="mb-4 flex items-center gap-2.5">
                  <span
                    ref={(el) => {
                      circleRefs.current[i] = el;
                    }}
                    className="pw-circle flex h-8 w-8 flex-none items-center justify-center rounded-full bg-brand-soft text-sm font-medium text-brand-primary"
                  >
                    {i + 1}
                  </span>
                  <Icon className="h-5 w-5 text-brand-primary" />
                </div>
                <div className="relative mb-4 h-[84px] overflow-hidden">
                  {runId[i] === 0 ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-brand-primary opacity-70" />
                    </div>
                  ) : (
                    <div key={runId[i]} className="absolute inset-0">
                      {i === 0 && <TellVisual waveDone={waveDone[i]} />}
                      {i === 1 && <OptionsVisual />}
                      {i === 2 && <DecideVisual />}
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-medium">{t[`${s}t` as keyof Dict]}</h3>
                <p className="mt-2 text-base leading-relaxed text-brand-muted">
                  {t[`${s}d` as keyof Dict]}
                </p>
                <p className="mt-4 border-t border-dashed border-brand-border pt-3 text-xs leading-relaxed text-brand-muted">
                  {t[`${s}r` as keyof Dict]}
                </p>
              </div>
            );
          })}
        </div>
        {renderPathway(deskLinks, 'hidden md:block', true)}
        {renderPathway(mobLinks, 'md:hidden', false)}
      </div>

      <details
        className={`pw-details mt-6 rounded-2xl border border-brand-border bg-white px-6 py-4${
          payoff ? ' pw-payoff' : ''
        }`}
      >
        <summary className="cursor-pointer select-none text-base font-medium text-brand-primary">
          {t.exBtn}
        </summary>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-brand-border bg-brand-bg p-4">
            <p className="text-sm font-medium">{t.exT1}</p>
            <p className="mt-2 text-sm leading-relaxed text-brand-muted">{t.exB1}</p>
          </div>
          <div className="rounded-xl border border-brand-border bg-brand-bg p-4">
            <p className="text-sm font-medium">{t.exT2}</p>
            <p className="mt-2 text-sm leading-relaxed text-brand-muted">{t.exB2}</p>
          </div>
          <div className="rounded-xl border border-brand-border bg-brand-bg p-4">
            <p className="text-sm font-medium">{t.exT3}</p>
            <p className="mt-2 text-sm leading-relaxed text-brand-muted">{t.exB3}</p>
          </div>
        </div>
      </details>

      <p className="mt-8 text-center text-sm font-medium text-brand-muted">{t.howClose}</p>
    </section>
  );
}

/* --- Step 1: mic pulse -> waveform -> abstract transcript lines (decorative) --- */
function TellVisual({ waveDone }: { waveDone: boolean }) {
  return (
    <div className="flex h-full items-center gap-3" aria-hidden="true">
      <span className="relative flex h-10 w-10 flex-none items-center justify-center">
        <span className="pw-pulse absolute inset-0 rounded-full border border-brand-primary" />
        <MicIcon className="h-5 w-5 text-brand-primary" />
      </span>
      <span className="relative block h-12 flex-1">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 120 48" preserveAspectRatio="xMidYMid meet">
          <rect className="pw-line" x="4" y="7" width="104" height="7" rx="3.5" fill="#E6E3DD" style={{ animationDelay: '0.95s' }} />
          <rect className="pw-line" x="4" y="21" width="76" height="7" rx="3.5" fill="#E6E3DD" style={{ animationDelay: '1.05s' }} />
          <rect className="pw-line" x="4" y="35" width="92" height="7" rx="3.5" fill="#E6E3DD" style={{ animationDelay: '1.15s' }} />
        </svg>
        {!waveDone && (
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 120 48" preserveAspectRatio="xMidYMid meet">
            {[0, 1, 2, 3, 4, 5, 6].map((b) => (
              <rect
                key={b}
                className="pw-bar"
                x={10 + b * 15}
                y="10"
                width="4"
                height="28"
                rx="2"
                fill="#0E6B5C"
                opacity="0.75"
                style={{ animationDelay: `${0.05 + b * 0.05}s`, transformBox: 'fill-box', transformOrigin: 'center' }}
              />
            ))}
          </svg>
        )}
      </span>
    </div>
  );
}

/* --- Step 2: three sourced option rows appearing in sequence (decorative) --- */
function OptionsVisual() {
  return (
    <div className="flex h-full flex-col justify-center gap-2.5" aria-hidden="true">
      {rowWidths.map((w, i) => (
        <div key={i} className="pw-row flex items-center gap-2.5" style={{ animationDelay: `${i * 0.18}s` }}>
          <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full border border-brand-primary bg-white">
            <svg viewBox="0 0 12 12" className="h-3 w-3">
              <path
                className="pw-draw"
                d="M2.5 6.4 5 8.9 9.5 4"
                fill="none"
                stroke="#0E6B5C"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ animationDelay: `${0.55 + i * 0.2}s` }}
              />
            </svg>
          </span>
          <span className="h-2 rounded-full bg-brand-border" style={{ width: w }} />
        </div>
      ))}
    </div>
  );
}

/* --- Step 3: one choice becomes selected, then a restrained consent check (decorative) --- */
function DecideVisual() {
  return (
    <div className="flex h-full items-center justify-center gap-3" aria-hidden="true">
      <span className="pw-pill flex h-8 w-24 flex-none items-center justify-center rounded-full border bg-white">
        <span className="h-2 w-12 rounded-full bg-brand-border" />
      </span>
      <span className="flex h-8 w-24 flex-none items-center justify-center rounded-full border border-brand-border bg-white">
        <span className="h-2 w-9 rounded-full bg-brand-border" />
      </span>
      <span className="pw-consent flex h-8 w-8 flex-none items-center justify-center">
        <svg viewBox="0 0 32 32" className="h-8 w-8">
          <circle className="pw-ring" cx="16" cy="16" r="13" fill="none" stroke="#0E6B5C" strokeWidth="2" />
          <path
            className="pw-tick"
            d="M10.5 16.6 14.5 20.6 22 12.6"
            fill="none"
            stroke="#0E6B5C"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
}
