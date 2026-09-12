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
  const eligibleRef = useRef<Set<number>>(new Set());
  const playedOnceRef = useRef<Set<number>>(new Set());
  const selectedRef = useRef<number | null>(null);
  const playRequestRef = useRef<number | null>(null);
  const startingRef = useRef<number | null>(null);
  const touchRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
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
    const pauseAndReset = (video: HTMLVideoElement | null) => {
      if (!video) return;
      video.pause();
      try {
        video.currentTime = 0;
      } catch {
        /* not seekable yet */
      }
    };
    const pauseAll = () => {
      playRequestRef.current = null;
      startingRef.current = null;
      selectedRef.current = null;
      videos().forEach(pauseAndReset);
      setActiveIndex(null);
    };

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

    if (isTouch) {
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

        if (selectedRef.current !== best) {
          selectedRef.current = best;
          playRequestRef.current = null;
          startingRef.current = null;
          videos().forEach((video, i) => {
            if (i !== best) pauseAndReset(video);
          });
          setActiveIndex(null);
        }

        if (best < 0 || playedOnceRef.current.has(best) || startingRef.current === best) return;
        const video = videoRefs.current[best];
        if (!video) return;

        playRequestRef.current = best;
        startingRef.current = best;
        if (video.readyState === HTMLMediaElement.HAVE_NOTHING) video.load();
        video.play().catch(() => {
          if (playRequestRef.current === best) {
            playRequestRef.current = null;
            startingRef.current = null;
            setActiveIndex(null);
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

      window.addEventListener('scroll', pickCentre, { passive: true });
      window.addEventListener('resize', pickCentre);
      cleanups.push(() => {
        window.removeEventListener('scroll', pickCentre);
        window.removeEventListener('resize', pickCentre);
      });
    }

    const onVisibility = () => {
      if (document.hidden) pauseAll();
    };
    document.addEventListener('visibilitychange', onVisibility);
    cleanups.push(() => document.removeEventListener('visibilitychange', onVisibility));

    return () => {
      playRequestRef.current = null;
      startingRef.current = null;
      selectedRef.current = null;
      videos().forEach(pauseAndReset);
      cleanups.forEach((fn) => fn());
    };
  }, []);

  const replay = (i: number) => {
    if (staticMode || touchRef.current) return;
    const v = videoRefs.current[i];
    if (!v) return;
    playRequestRef.current = i;
    setActiveIndex(null);
    videoRefs.current.forEach((other, j) => {
      if (j === i || !other) return;
      other.pause();
      try {
        other.currentTime = 0;
      } catch {
        /* not seekable yet */
      }
    });
    try {
      v.currentTime = 0;
    } catch {
      /* not seekable yet */
    }
    if (v.readyState === HTMLMediaElement.HAVE_NOTHING) v.load();
    v.play().catch(() => {
      if (playRequestRef.current === i) {
        playRequestRef.current = null;
        setActiveIndex(null);
      }
    });
  };

  const stopReplay = (i: number) => {
    if (staticMode || touchRef.current) return;
    const v = videoRefs.current[i];
    if (!v) return;
    if (playRequestRef.current === i) playRequestRef.current = null;
    v.pause();
    try {
      v.currentTime = 0;
    } catch {
      /* not seekable yet */
    }
    setActiveIndex((active) => (active === i ? null : active));
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
                  className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-none ${
                    activeIndex === i ? 'opacity-100' : 'opacity-0'
                  }`}
                  onPlaying={() => {
                    if (playRequestRef.current === i) {
                      startingRef.current = null;
                      if (touchRef.current) playedOnceRef.current.add(i);
                      setActiveIndex(i);
                    }
                  }}
                  onPause={() => {
                    setActiveIndex((active) => (active === i ? null : active));
                  }}
                  onCanPlay={(e) => {
                    if (
                      !touchRef.current ||
                      selectedRef.current !== i ||
                      playedOnceRef.current.has(i) ||
                      startingRef.current === i
                    ) {
                      return;
                    }
                    playRequestRef.current = i;
                    startingRef.current = i;
                    e.currentTarget.play().catch(() => {
                      if (playRequestRef.current === i) {
                        playRequestRef.current = null;
                        startingRef.current = null;
                        setActiveIndex(null);
                      }
                    });
                  }}
                  onEnded={(e) => {
                    if (playRequestRef.current === i) playRequestRef.current = null;
                    startingRef.current = null;
                    e.currentTarget.pause();
                    try {
                      e.currentTarget.currentTime = 0;
                    } catch {
                      /* not seekable yet */
                    }
                    setActiveIndex((active) => (active === i ? null : active));
                  }}
                  onError={(e) => {
                    if (playRequestRef.current === i) playRequestRef.current = null;
                    if (startingRef.current === i) startingRef.current = null;
                    setActiveIndex((active) => (active === i ? null : active));
                    e.currentTarget.pause();
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
