# Projeto — Reconstrução do Framer

## Fonte de verdade

O projeto existente no Framer, acessado através do MCP, é a fonte
de verdade para a implementação visual e estrutural deste projeto.

Sempre que houver alguma dúvida sobre layout, estilo, espaçamento,
tipografia, componentes, conteúdo, responsividade ou comportamento,
consulte o projeto Framer através do MCP antes de fazer suposições.

Não invente valores quando eles puderem ser obtidos ou inferidos
diretamente do projeto Framer.

---

## Objetivo

Reconstruir em código o site existente no Framer com a maior
fidelidade visual e funcional possível.

O objetivo é reproduzir o projeto existente, e não criar uma nova
versão ou redesign.

Não:
- modernize o design;
- simplifique componentes;
- altere a identidade visual;
- melhore o layout por conta própria;
- substitua imagens sem necessidade;
- altere textos;
- invente elementos;
- remova elementos que pareçam desnecessários.

Qualquer alteração em relação ao Framer deve ser solicitada
explicitamente.

---

## Uso do MCP do Framer

O MCP do Framer deve ser utilizado como referência durante todo
o processo de desenvolvimento.

Antes de implementar uma página ou componente:

1. Consulte o projeto correspondente no Framer.
2. Entenda sua estrutura.
3. Identifique os componentes utilizados.
4. Identifique estilos e propriedades relevantes.
5. Identifique comportamento responsivo.
6. Identifique interações e animações.
7. Só então implemente em código.

Quando uma informação não estiver clara, consulte novamente o
Framer em vez de assumir.

---

## Processo de desenvolvimento

Trabalhe em pequenas etapas.

Para cada página ou componente:

1. Analise a implementação correspondente no Framer.
2. Planeje a implementação necessária.
3. Faça a menor alteração necessária no código.
4. Execute o projeto.
5. Verifique erros e warnings.
6. Compare a implementação com o Framer.
7. Identifique diferenças.
8. Corrija as diferenças.
9. Só então avance para a próxima parte.

Não tente implementar o projeto inteiro de uma única vez.

---

## Fidelidade visual

A prioridade máxima é a fidelidade ao projeto Framer.

Preste atenção especialmente a:

- tipografia;
- família das fontes;
- peso das fontes;
- tamanho das fontes;
- line-height;
- letter-spacing;
- cores;
- gradientes;
- espaçamentos;
- margens;
- paddings;
- largura dos containers;
- altura das seções;
- alinhamento;
- grid;
- tamanho das imagens;
- proporção das imagens;
- bordas;
- border-radius;
- sombras;
- opacidade;
- posicionamento;
- z-index;
- overflow;
- estados de hover;
- estados de interação;
- animações;
- transições.

Não considere uma implementação concluída apenas porque
"parece parecida".

Procure diferenças visuais e corrija-as.

---

## Responsividade

A implementação deve reproduzir o comportamento responsivo
existente no Framer.

Não trate mobile simplesmente como uma versão reduzida do desktop.

Analise no Framer:

- breakpoints;
- mudanças de layout;
- alterações de tamanho;
- alterações de espaçamento;
- elementos que desaparecem;
- elementos que aparecem;
- mudança de ordem dos elementos;
- alteração de alinhamento;
- menus mobile;
- comportamento de imagens;
- comportamento de grids e cards.

Quando o comportamento responsivo do Framer não estiver claro,
consulte o projeto antes de decidir.

---

## Componentes

Crie componentes reutilizáveis quando houver padrões realmente
repetidos no projeto Framer.

Exemplos:

- Header;
- Footer;
- Button;
- Card;
- Container;
- Section;
- Navigation;
- componentes de formulário.

Evite abstração excessiva.

Não crie componentes genéricos apenas para reduzir algumas linhas
de código.

Primeiro identifique padrões reais no Framer. Depois abstraia.

---

## Design system

Quando houver valores recorrentes, centralize-os de forma
consistente.

Isso inclui:

- cores;
- tipografia;
- espaçamentos;
- tamanhos;
- border-radius;
- sombras;
- largura de containers;
- breakpoints.

Sempre que possível, mantenha esses valores consistentes com
o projeto Framer.

---

## Motion

Todas as páginas de conteúdo do site (case studies, páginas de leitura,
seções da Home) usam por padrão o mesmo sistema de entrada em scroll,
definido em `src/lib/use-scroll-reveal.ts` e `src/components/motion/Reveal.tsx`.

Regra principal: a animação de entrada acontece no nível da SEÇÃO
INTEIRA, nunca em elementos internos isolados. Cada seção numerada
(cabeçalho + todo o conteúdo daquele bloco) é envolvida em um único
`<Reveal>` — fade + leve translateY, sem stagger entre os filhos
(parágrafos, cards, imagens, StatCards entram todos juntos, no mesmo
frame). Ver `Chapter` em `CaseStudyPage.tsx` e `MobileAppPage.tsx`, e
`Section` em `DataDrivenPage.tsx` como referência de implementação —
novas páginas devem seguir o mesmo padrão local (cada página define seu
próprio helper de seção, não existe um `Chapter` compartilhado).

Novas páginas/seções devem aplicar esse mesmo padrão por padrão, sem
precisar ser pedido de novo.

Exceção: o Hero da Home (`src/app/page.tsx`) usa sua própria animação
de entrada (`useHeroReveal`, disparada no mount, não em scroll) — não
migrar esse hero para o Reveal genérico nem duplicar animação nele.

Cards repetidos em grid (ex: FeatureGrid, QuoteCard, LawCard, DataGrid,
MetricCard) e blocos de imagem (ex: StackedImage, SolutionCarousel,
GalleryPlaceholder) ganham microinteração de hover — leve
`translate-y`/`scale` + borda mais clara (`hover:border-white/25`),
`transition-all duration-300`. Isso é hover, não entrada: não faz
stagger e não é afetado por prefers-reduced-motion.

A contagem numérica dos StatCards (`useCountUp`) mantém seu próprio
timing interno, independente do Reveal da seção ao redor.

`prefers-reduced-motion` é sempre respeitado (já embutido no
`useScrollReveal`) — nenhuma exceção.

---

## Assets

Priorize os assets originais utilizados no Framer.

Não recrie ou substitua:

- logos;
- imagens;
- ícones;
- vídeos;
- ilustrações;
- fontes;

quando o asset original estiver disponível.

Preserve a qualidade e a proporção dos assets.

Use nomes de arquivos claros e semânticos quando precisar
adicionar ou organizar arquivos.

---

## Código

Mantenha o código:

- simples;
- legível;
- organizado;
- tipado;
- reutilizável quando apropriado;
- fácil de manter.

Não introduza complexidade sem necessidade.

Não instale dependências novas sem uma razão clara.

Não altere a stack do projeto sem autorização explícita.

Não modifique arquivos que não sejam relevantes para a tarefa atual.

---

## Alterações

Antes de fazer mudanças significativas:

1. Entenda como o código atual funciona.
2. Verifique se existe um componente ou padrão que já resolve
   o problema.
3. Consulte o Framer quando a mudança estiver relacionada ao
   comportamento ou visual original.
4. Faça a menor alteração necessária.

Não faça refatorações grandes enquanto estiver implementando
uma página ou componente específico, a menos que sejam
necessárias.

---

## Validação

Depois de cada implementação relevante:

1. Execute o projeto.
2. Verifique erros de compilação.
3. Verifique erros no console.
4. Verifique problemas de layout.
5. Verifique responsividade.
6. Compare com o Framer.
7. Corrija as diferenças encontradas.

Quando houver screenshots ou outras referências visuais,
utilize-as como referência adicional para validação.

---

## Ordem recomendada

Siga, preferencialmente, esta ordem:

1. Análise do projeto Framer.
2. Definição da arquitetura.
3. Configuração da aplicação.
4. Fontes e tipografia.
5. Design tokens.
6. Componentes globais.
7. Header e navegação.
8. Footer.
9. Homepage.
10. Validação da Homepage.
11. Demais páginas, uma por vez.
12. Responsividade.
13. Interações.
14. Animações.
15. Performance.
16. Acessibilidade.
17. SEO.
18. Refatoração final.

Não avance para uma etapa enquanto a anterior estiver
significativamente incompleta.

---

## Regra principal

Quando houver conflito entre uma preferência de implementação
e o que existe no Framer, o Framer vence.

Quando houver dúvida:

**Não suponha. Consulte o Framer através do MCP.**

Prioridade:

**Fidelidade ao Framer > preferência pessoal de implementação.**