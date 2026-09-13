'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function HeroVideoSurface({ playLabel, pauseLabel, replayLabel }: { playLabel: string; pauseLabel: string; replayLabel: string }) {
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [attached, setAttached] = useState(false);
  const [active, setActive] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const stop = (reset = true) => { const current = video.current; if (!current) return; current.pause(); if (reset) current.currentTime = 0; setPlaying(false); setActive(false); };
  const start = (deliberate = false) => { const current = video.current; if (!current || (!autoplay && !deliberate)) return; setActive(true); current.play()?.then(() => { setPlaying(true); setActive(true); }).catch(() => stop()); };
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    setAutoplay(!reduced && !connection?.saveData && !/(^|-)2g$/.test(connection?.effectiveType ?? ''));
    if (window.matchMedia('(min-width: 768px)').matches) setAttached(true);
    const section = root.current;
    if (!section || typeof IntersectionObserver === 'undefined') { setAttached(true); return; }
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setAttached(true); else stop(); }, { threshold: 0.1, rootMargin: '120px 0px' });
    observer.observe(section);
    const onVisibility = () => { if (document.hidden) stop(); };
    document.addEventListener('visibilitychange', onVisibility);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', onVisibility); };
  }, []);
  useEffect(() => { if (attached && autoplay) start(); }, [attached, autoplay]);
  return <div ref={root} className="hero-video-surface pointer-events-none absolute inset-0 hidden overflow-hidden bg-[#FDEDD6] min-[1100px]:block" aria-label="Hero video">
    <Image src="/images/hero-vid-1-poster.webp" alt="" fill sizes="65vw" className={"hero-video-media absolute bottom-0 end-0 !left-auto h-full !w-[65%] object-contain transition-opacity duration-200 motion-reduce:transition-none " + (active ? 'opacity-0' : 'opacity-100')} priority />
    <video ref={video} src={attached ? '/images/hero-vid-1-web.mp4' : undefined} muted playsInline preload="none" onEnded={() => { setPlaying(false); setEnded(true); }} onError={() => stop()} className={"hero-video-media absolute bottom-0 end-0 h-full !w-[65%] object-contain transition-opacity duration-200 motion-reduce:transition-none " + (active ? 'opacity-100' : 'opacity-0')} />
    <button type="button" onClick={() => { if (playing) stop(false); else { if (ended && video.current) { video.current.currentTime = 0; setEnded(false); } start(true); } }} className="pointer-events-auto absolute bottom-5 end-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-brand-primary bg-[#FFF8F1] text-brand-primary shadow-sm transition-colors duration-150 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary motion-reduce:transition-none" aria-label={playing ? pauseLabel : ended ? replayLabel : playLabel}>
      {playing ? (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M8 6v12M16 6v12" />
        </svg>
      ) : (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 11a8 8 0 1 0 1 4" />
          <path d="M20 5v6h-6" />
        </svg>
      )}
    </button>
  </div>;
}
