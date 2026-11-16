import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dinoco | Diário automotivo de Moisés Solares',
  description: 'Galeria e histórico do Dinoco, o Honda azul de Moisés Solares.',
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
