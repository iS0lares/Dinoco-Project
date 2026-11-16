'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export type GalleryItem =
  | { kind: 'photo'; src: string; caption: string }
  | { kind: 'video'; src: string; caption: string; poster?: string };

export function Gallery({ items }: { items: GalleryItem[] }) {
  const [selected, setSelected] = useState(0);
  const frame = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const item = items[selected];

  useEffect(() => {
    const stage = frame.current;
    if (!stage) return;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let tick = 0;
    const update = () => {
      tick = 0;
      if (motion.matches) return;
      const { top, height } = stage.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (innerHeight - top) / (innerHeight * .45 + height * .5)));
      stage.style.setProperty('--gallery-camera', progress.toFixed(3));
    };
    const schedule = () => {
      if (!tick) tick = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    motion.addEventListener('change', schedule);
    return () => {
      cancelAnimationFrame(tick);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      motion.removeEventListener('change', schedule);
    };
  }, [items.length]);

  if (!item) return null;

  const move = (offset: number) => {
    setSelected(current => (current + offset + items.length) % items.length);
  };

  return (
    <div className="media-gallery" role="group" aria-label="Mídia do Dinoco"
      onKeyDown={event => {
        if (event.target instanceof HTMLVideoElement || items.length < 2) return;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          move(event.key === 'ArrowLeft' ? -1 : 1);
        }
      }}>
      <figure className="media-figure">
        <div ref={frame} className="media-frame"
          onTouchStart={event => {
            if (item.kind === 'video') return;
            const touch = event.touches[0];
            touchStart.current = { x: touch.clientX, y: touch.clientY };
          }}
          onTouchCancel={() => { touchStart.current = null; }}
          onTouchEnd={event => {
            const start = touchStart.current;
            touchStart.current = null;
            if (!start || items.length < 2) return;
            const end = event.changedTouches[0];
            const dx = end.clientX - start.x;
            if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(end.clientY - start.y)) move(dx > 0 ? -1 : 1);
          }}>
          {items.map((entry, index) => {
            const active = index === selected;
            return (
              <div className="media-layer" key={entry.kind + entry.src} data-active={active} aria-hidden={!active}>
                {entry.kind === 'photo'
                  ? <Image src={entry.src} alt={active ? entry.caption : ''} fill sizes="(max-width: 760px) 100vw, 1280px" unoptimized />
                  : active && <video src={entry.src} poster={entry.poster} controls playsInline preload="metadata" aria-label={entry.caption} />}
              </div>
            );
          })}
        </div>
        <figcaption aria-live="polite">
          {item.caption}
          {items.length > 1 && <span>{selected + 1} / {items.length}</span>}
        </figcaption>
      </figure>
      {items.length > 1 && (
        <nav className="media-controls" aria-label="Controles da galeria">
          <button type="button" onClick={() => move(-1)} aria-label="Mídia anterior">←</button>
          <div className="media-dots">
            {items.map((entry, index) => (
              <button key={entry.kind + entry.src} type="button" aria-label={'Exibir ' + entry.caption}
                aria-current={index === selected ? 'true' : undefined} onClick={() => setSelected(index)}><span /></button>
            ))}
          </div>
          <button type="button" onClick={() => move(1)} aria-label="Próxima mídia">→</button>
        </nav>
      )}
    </div>
  );
}
