'use client';

import { useRef, useState } from 'react';

export function ColdStart() {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  async function toggle() {
    const player = audio.current;
    if (!player) return;

    setFailed(false);
    if (!player.paused) {
      player.pause();
      return;
    }
    try {
      await player.play();
    } catch (error) {
      if (!(error instanceof DOMException && error.name === 'AbortError')) {
        setFailed(true);
      }
    }
  }

  return (
    <div className="cold-start">
      <audio
        ref={audio}
        src="/cold-start.m4a"
        preload="none"
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onError={() => { setPlaying(false); setFailed(true); }}
      />
      <button className="cold-start-button" type="button" onClick={toggle}>
        <span aria-hidden="true">{playing ? 'Ⅱ' : '▶'}</span>
        {playing ? 'Pausar o ronco' : 'Ouvir o Dinoco'}
      </button>
      {failed && <span className="cold-start-error" role="status">O áudio não carregou. Tente de novo.</span>}
    </div>
  );
}
