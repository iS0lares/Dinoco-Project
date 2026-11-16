import type { GalleryItem } from '../components/Gallery';
import { modifications } from './build';

export const gallery: GalleryItem[] = [
  { kind: 'photo', src: "/galeria/luzes-da-cidade.webp", caption: "Dinoco sob as luzes da cidade" },
  { kind: 'photo', src: "/galeria/moises-e-dinoco.webp", caption: "Moisés com o Dinoco" },
  { kind: 'photo', src: "/galeria/frente-no-mural.webp", caption: "De frente para o mural" },
  { kind: 'photo', src: "/galeria/lanternas.webp", caption: "Lanternas e reflexos no asfalto" },
  { kind: 'photo', src: "/galeria/perfil.webp", caption: "Perfil do Dinoco com as rodas pretas" },
  { kind: 'photo', src: "/galeria/traseira.webp", caption: "Traseira com aerofólio e saída dupla" },
  { kind: 'photo', src: "/galeria/farois-azuis.webp", caption: "Dinoco com os faróis azuis acesos" },
  { kind: 'photo', src: '/dinoco-studio.webp', caption: 'Dinoco de frente · arte de estúdio a partir da foto original' },
];

for (const item of modifications) {
  if (item.photo && !gallery.some(entry => entry.src === item.photo)) gallery.push({ kind: 'photo', src: item.photo, caption: item.title + ' no Dinoco' });
  if (item.video) gallery.push({ kind: 'video', src: item.video, poster: item.photo, caption: 'Vídeo: ' + item.title });
}
