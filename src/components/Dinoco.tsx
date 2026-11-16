'use client';

import { useEffect, useRef, useState } from 'react';

export function Dinoco() {
  const track = useRef<HTMLElement>(null);
  const [flash, setFlash] = useState(0);

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    function update() {
      frame = 0;
      if (!element) return;
      const bounds = element.getBoundingClientRect();
      const stage = element.firstElementChild;
      if (!stage) return;
      const stageHeight = stage.getBoundingClientRect().height;
      const stickyTop = Number.parseFloat(getComputedStyle(stage).top) || 0;
      const range = Math.max(1, bounds.height - stageHeight);
      const p = preference.matches || bounds.height <= stageHeight ? 0 : Math.max(0, Math.min(1, (stickyTop - bounds.top) / range));
      element.style.setProperty('--drive', p.toFixed(4));
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    preference.addEventListener('change', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      preference.removeEventListener('change', schedule);
    };
  }, []);

  return (
    <section ref={track} id="inicio" className="drive" aria-labelledby="dinoco-title">
      <div className="drive-stage">
        <div className="drive-grid" aria-hidden="true" />
        <div className="drive-heading">
          <p>Diário automotivo de Moisés Solares</p>
          <h1 id="dinoco-title">DINOCO<span>.</span></h1>
        </div>
        <div className="car-frame">
          <button
            className="car-headlight-trigger"
            type="button"
            aria-label="Piscar os faróis do Dinoco"
            onClick={() => setFlash(current => current + 1)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/dinoco-studio.webp" alt="Dinoco, o Honda azul de Moisés visto de frente" fetchPriority="high" draggable={false} />
            {flash > 0 && <span key={flash} className="car-headlight-flash" aria-hidden="true" />}
          </button>
        </div>
        <div className="drive-caption">
          <p>Meu Civic azivis e a história do que fiz nele.</p>
          <a href="#historico">Ver histórico <span aria-hidden="true">↓</span></a>
        </div>
        <div className="drive-progress" aria-hidden="true" />
      </div>
    </section>
  );
}
