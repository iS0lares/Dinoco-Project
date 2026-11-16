'use client';

import { useEffect, useRef } from 'react';

export function DinocoLoop() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) {
        video.pause();
      } else if (!preference.matches) {
        void video.play().catch(() => {});
      }
    }, { threshold: 0.25 });

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="build-backdrop" aria-hidden="true">
      <video
        ref={ref}
        className="dinoco-loop"
        src="/dinoco-loop.mp4"
        poster="/dinoco-loop-poster.jpg"
        loop
        muted
        playsInline
        preload="none"
      />
    </div>
  );
}
