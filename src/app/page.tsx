import Image from 'next/image';
import { DinocoLoop } from '../components/DinocoLoop';
import { Dinoco } from '../components/Dinoco';
import { modifications } from '../content/build';

export default function Home() {
  return (
    <>
      <a className="skip" href="#conteudo">Pular para o conteúdo</a>
      <header className="garage-nav"><div className="wrap">
        <a href="#inicio">DINOCO<span>.</span></a>
        <nav aria-label="Navegação principal"><a href="#historico">Modificações</a></nav>
      </div></header>
      <main id="conteudo">
        <Dinoco />
        <section className="build-section" id="historico" aria-labelledby="history-title">
          <DinocoLoop />
          <div className="wrap garage-section build-content">
            <header className="section-intro">
              <h2 id="history-title">Modificações.</h2>
            </header>
            <div className="build-story">
              {modifications.map(item => {
                const photo = item.photo;
                return (
                  <article className="build-chapter" key={item.id} id={item.id} aria-labelledby={item.id + '-title'}>
                    <header className="build-copy">
                      <h3 id={item.id + '-title'}>{item.title}</h3>
                      <p>{item.description}</p>
                      {item.date && <time>{item.date}</time>}
                    </header>
                    {(photo || item.video) && (
                      <figure className="build-visual">
                        {item.video
                          ? <video src={item.video} poster={photo} controls playsInline preload="metadata" aria-label={item.title + ' no Dinoco'} />
                          : photo && <div className="build-image"><Image src={photo} alt={item.title + ' no Dinoco'} fill unoptimized /></div>}
                      </figure>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <footer className="wrap garage-footer"><span>Dinoco / Moisés Solares</span><a href="#inicio">Voltar ao topo ↑</a></footer>
    </>
  );
}
