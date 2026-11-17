'use client';

import { useState } from 'react';
import styles from './DinocoCard.module.css';

const specs = [
  ['Potência', '106 cv'],
  ['Suspensão', 'Molas cortadas com amortecedores preparados'],
  ['Escapamento', 'Direto em inox 2,5″ com saída dupla'],
  ['Rodas', 'GM aro 15, pretas'],
  ['Front lip'],
  ['Aerofólio'],
];

export function DinocoCard() {
  const [showBack, setShowBack] = useState(false);

  return (
    <section className={styles.section} id="card" aria-labelledby="card-title">
      <h2 id="card-title">Card do Dinoco</h2>
      <div id="dinoco-card-faces" className={styles.card} data-flipped={showBack}>
        <div className={styles.front} aria-hidden={showBack}>
          <p className={styles.label}>Projeto de Moisés Solares</p>
          <p className={styles.name}>DINOCO</p>
          <img src="/dinoco-studio.webp" alt="Dinoco, o Honda Civic azul de Moisés Solares" loading="lazy" decoding="async" />
          <p className={styles.model}>Honda Civic LX</p>
        </div>
        <div className={styles.back} aria-hidden={!showBack}>
          <p className={styles.label}>Dinoco</p>
          <h3>Ficha do projeto</h3>
          <dl>
            {specs.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                {value && <dd>{value}</dd>}
              </div>
            ))}
          </dl>
        </div>
      </div>
      <button type="button" aria-controls="dinoco-card-faces" aria-expanded={showBack} onClick={() => setShowBack(!showBack)}>
        {showBack ? 'Ver frente' : 'Ver ficha'}
      </button>
    </section>
  );
}
