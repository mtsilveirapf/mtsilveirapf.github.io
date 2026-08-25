// Padding horizontal das seções full-bleed (Header, Footer, main de todas as páginas).
// Fonte única para não divergir entre áreas. Ajustado a pedido do usuário: 160px passa a
// valer a partir de 1440px (breakpoint "wide", fora do sistema de breakpoints do Framer),
// em vez de esperar o xxl real (1920px).
export const PAGE_PADDING_X = "px-6 tablet:px-10 desktop:px-20 wide:px-40";

// Largura de leitura do case study (gestao-prazos): ~75 caracteres por linha para texto
// corrido, aprovado explicitamente pelo usuário na reconstrução da página do zero. Imagens e
// ilustrações não usam essa largura — só parágrafos/citações/listas.
export const PROSE_WIDTH = "max-w-[75ch]";
