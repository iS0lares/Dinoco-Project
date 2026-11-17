'use client';

import { useState } from 'react';
import { DetailPhoto } from './DetailPhoto';
import styles from './RideHeight.module.css';

export function RideHeight({ title, description, photo }: {
  title: string;
  description: string;
  photo: string;
}) {
  const [lowered, setLowered] = useState(false);

  return (
    <article className="build-chapter" id="suspensao" aria-labelledby="suspensao-title">
      <header className="build-copy">
        <h3 id="suspensao-title">{title}</h3>
        <p>{description}</p>
        <button className={styles.control} type="button" aria-controls="suspensao-foto"
          onClick={() => setLowered(value => !value)}>
          {lowered ? 'Simular altura original' : 'Rebaixar o Dinoco'}
        </button>
        <p className={styles.status} role="status">
          {lowered ? 'Altura atual' : 'Altura original simulada'}
        </p>
      </header>
      <figure className="build-visual" id="suspensao-foto">
        <div className="build-image">
          <DetailPhoto part="suspensao" src={photo} label={title + ' no Dinoco'} raised={!lowered} />
        </div>
      </figure>
    </article>
  );
}
