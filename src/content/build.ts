type Modification = {
  id: string;
  title: string;
  description: string;
  date?: string;
  photo?: string;
  video?: string;
};

export const modifications: Modification[] = [
  { id: 'suspensao', title: 'Molas cortadas e amortecedores preparados', description: 'A configuração de suspensão do Dinoco combina molas cortadas com amortecedores preparados.', photo: '/galeria/suspensao.webp' },
  { id: 'escapamento', title: 'Escapamento direto full inox', description: 'Diretão em inox de 2,5 polegadas com saída dupla.', photo: '/galeria/traseira.webp' },
  { id: 'rodas', title: 'Rodas GM aro 15', description: 'Jogo de rodas GM de 15 polegadas.', photo: '/galeria/rodas-gm.webp' },
  { id: 'front-lip', title: 'Front lip', description: 'Lip instalado na parte inferior do para-choque dianteiro.', photo: '/galeria/front-lip.webp' },
  { id: 'aerofolio', title: 'Aerofólio', description: 'Aerofólio instalado na traseira do Dinoco.', photo: '/galeria/luzes-da-cidade.webp' },
];
