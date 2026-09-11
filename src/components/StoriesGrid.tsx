'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export type StoryCard = {
  key: string;
  text: string;
  alt: string;
  img: string;
  video: string;
  primary: boolean;
};

export default function StoriesGrid({ cards }: { cards: StoryCard[] }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const timersRef = useRef<number[]>([]);
  const eligibleRef = useRef<Set<number>>(new Set());
  const playedOnceRef = useRef<Set<number>>(new Set());
  const entranceDoneRef = useRef(false);
  const touchRef = useRef(false);
  // Static during SSR/hydration; upgraded after client-side capability checks.
  const [staticMode, setStaticMode] = useState(true);
  const [attachSources, setAttachSources] = useState(false);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const section = grid.closest('section') ?? grid;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const slow = Boolean(conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType ?? '')));
    const canPlay = document.createElement('video').canPlayType('video/mp4') !== '';
    if (reduce || slow || !canPlay) return; // keep static images, no observers
    setStaticMode(false);

    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    touchRef.current = isTouch;

    const cleanups: Array<() => void> = [];
    const videos = () => videoRefs.current;
    const pauseAll = () => videos().forEach((v) => v && !v.paused && v.pause());

    // Attach sources only when the section approaches the viewport.
    const attachIO = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setAttachSources(true);
          attachIO.disconnect();
        }
      },
      { rootMargin: '50% 0px' }
    );
    attachIO.observe(section);
    cleanups.push(() => attachIO.disconnect());

    if (!isTouch) {
      // Entrance: when the section is ~40% visible, play each video once,
      // staggered ~500ms in card order. Pause all if it leaves the viewport.
      const entranceIO = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting && !entranceDoneRef.current) {
            entranceDoneRef.current = true;
            videos().forEach((v, i) => {
              if (!v) return;
              const id = window.setTimeout(() => {
                v.play().catch(() => {});
              }, i * 500);
              timersRef.current.push(id);
            });
            entranceIO.disconnect();
          } else if (!entry.isIntersecting) {
            pauseAll();
          }
        },
        { threshold: 0.4 }
      );
      entranceIO.observe(section);
      cleanups.push(() => entranceIO.disconnect());
    } else {
      // Touch: play only the eligible card closest to the viewport centre.
      const pickCentre = () => {
        const mid = window.innerHeight / 2;
        let best = -1;
        let bestDist = Infinity;
        eligibleRef.current.forEach((i) => {
          const v = videoRefs.current[i];
          if (!v) return;
          const r = v.getBoundingClientRect();
          const d = Math.abs((r.top + r.bottom) / 2 - mid);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        });
        videos().forEach((v, i) => {
          if (!v) return;
          if (i === best && !playedOnceRef.current.has(i)) {
            playedOnceRef.current.add(i);
            v.play().catch(() => {});
          } else if (!v.paused) {
            v.pause();
          }
        });
      };
      Array.from(grid.children).forEach((child, i) => {
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((en) => {
              if (en.intersectionRatio >= 0.6) eligibleRef.current.add(i);
              else eligibleRef.current.delete(i);
            });
            pickCentre();
          },
          { threshold: [0, 0.6, 1] }
        );
        io.observe(child);
        cleanups.push(() => io.disconnect());
      });
    }

    const onVisibility = () => {
      if (document.hidden) pauseAll();
    };
    document.addEventListener('visibilitychange', onVisibility);
    cleanups.push(() => document.removeEventListener('visibilitychange', onVisibility));

    return () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
      timersRef.current = [];
      cleanups.forEach((fn) => fn());
    };
  }, []);

  const replay = (i: number) => {
    if (staticMode || touchRef.current) return;
    const v = videoRefs.current[i];
    if (!v) return;
    videoRefs.current.forEach((o, j) => {
      if (j !== i && o && !o.paused) o.pause();
    });
    try {
      v.currentTime = 0;
    } catch {
      /* not seekable yet */
    }
    v.play().catch(() => {});
  };

  const stopReplay = (i: number) => {
    if (staticMode || touchRef.current) return;
    const v = videoRefs.current[i];
    if (!v) return;
    v.pause();
    try {
      v.currentTime = 0;
    } catch {
      /* not seekable yet */
    }
  };

  return (
    <div ref={gridRef} className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
      {cards.map((c, i) => {
        const cls = c.primary
          ? 'bg-brand-soft font-medium'
          : 'border border-brand-border bg-white font-normal';
        return (
          <a
            key={c.key}
            href="#tell"
            className={`group overflow-hidden rounded-xl transition-shadow hover:shadow-md focus-visible:shadow-md ${
              c.primary ? 'sm:col-span-1 lg:col-span-2' : 'sm:col-span-1 lg:col-span-2'
            }`}
            onMouseEnter={() => replay(i)}
            onMouseLeave={() => stopReplay(i)}
            onFocus={() => replay(i)}
            onBlur={() => stopReplay(i)}
          >
            <div className="img-tint relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={c.img}
                alt={c.alt}
                fill
                sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                className="object-cover"
                loading="lazy"
              />
              {!staticMode && (
                <video
                  ref={(el) => {
                    videoRefs.current[i] = el;
                  }}
                  src={attachSources ? c.video : undefined}
                  poster={c.img}
                  muted
                  playsInline
                  preload="none"
                  aria-hidden="true"
                  tabIndex={-1}
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
            </div>
            <div className={`min-h-[5.5rem] p-5 ${cls}`}>
              <p className="text-base leading-snug">{c.text}</p>
            </div>
          </a>
        );
      })}
    </div>
  );
}
