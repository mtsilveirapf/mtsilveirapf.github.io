# Auditoria do Projeto Framer — Portfolio Matheus Francisco

> Auditoria de descoberta, 100% read-only via Framer MCP (session `1`). Nenhuma alteração foi feita no projeto Framer. Fonte de verdade: projeto Framer (`FkM6cEIZmv40ohdVwqWt`).
> Gerado em 2026-08-22.

## Visão geral

- **3 templates de página únicos**, cada um com versão PT e EN = **6 `WebPageNode`** no total.
- Cada página tem **4 breakpoints**: Desktop (1200–1919.98px), Tablet (810–1199.98px), Phone (≤809.98px), XXL (≥1920px — **não auditado em nenhuma página**, pendente).
- Site **dark-mode fixo** (sem toggle, tokens só têm valor `light`), sem CMS/Collections — todo o conteúdo é estático.
- **Sem Layout Template do Framer**: header e footer são duplicados manualmente em cada página (não são component instances nem layout template), mas estruturalmente idênticos entre as 6 páginas.
- **Sem Text Style Presets**: toda a tipografia é definida inline em cada `RichTextNode`, com inconsistências reais (mistura de `em`/`%`/`px` para line-height).
- O projeto **parte de um template Framer comercial ("Norvin Agency")**: biblioteca de ~25 componentes externos do template está no arquivo mas **não é usada** no site real (confirmado pelo texto de copyright não editado "© 2026 Norvin Agency. All Rights Reserved" e nomes de variantes do componente `Menu` como Home/Work/Photography/Blog/Contact).
- Cor de destaque (lime) `rgb(207, 230, 78)` é usada em toda a identidade visual mas **não é um token** — está hardcoded nos nós.
- Há bastante **conteúdo órfão/oculto** (`visible:false`, posições off-canvas) resultante de duplicações no Framer — não deve ser reproduzido no código.

---

## 1. Mapa de páginas

| Template | Path PT | Path EN | Node ID PT | Node ID EN |
|---|---|---|---|---|
| Home | `/` | `/home-en` | `augiA20Il` | `MXSVw4ako` |
| Task Management (case study) | `/gestao-prazos` | `/task-management` | `oSdXj14Xg` | `xNUsHOEA2` |
| Data Driven (case study) | `/data-driven` | `/data-driven-en` | `CJijhBA2N` | `LX7QsCVQb` |

Estrutura de seções confirmada como **idêntica** entre PT/EN em todos os 3 templates (spot-check); apenas conteúdo textual e alguns slugs de link mudam. Ver diferenças pontuais na seção 9.

Breakpoints (mesmo range em todas as páginas):
- Desktop: `min-width: 1200px` e `max-width: 1919.98px`
- Tablet: `min-width: 810px` e `max-width: 1199.98px`
- Phone: `max-width: 809.98px`
- XXL: `min-width: 1920px` — **não auditado**

---

## 2. Árvores estruturais

### 2.1 Home (`/` — PT)

```
Home (/)
├── Header (sticky, top:0)
│   ├── Icon "Yinyang Balance" (logo mark, lime)
│   ├── "MATHEUS FRANCISCO" (wordmark)
│   ├── divisor 1px
│   └── Nav: link E-MAIL (mailto) · link LINKEDIN
├── Hero (86vh)
│   ├── Language Tab (seletor de idioma PT/EN, variante "PTBR")
│   ├── Top Content: avatar (119×119) + bio multi-linha (JetBrains Mono)
│   ├── H1 "Senior Product Designer & Data Analyst Associate" (80px)
│   └── Companies: 4 logos parceiros (Thomson Reuters, Pecege, +2)
├── Subheading "Tenho mais de 5 anos..."
├── Destaques / Projetos
│   ├── Card principal → link /gestao-prazos
│   │   "Liderando o redesign da jornada de maior impacto na retenção"
│   │   Badges: Jornada de Usuário / Gen AI / Otimização de UX
│   │   Stats: Etapas -4 · Satisfação 4.6 · Retenção 73%
│   ├── Card "App mobile Google Material Design" (Badges Mobile/iOS&Android/Material Design 3; +21% MAU / ~70% retenção)
│   └── Card "Reduzindo churn de cadastro via UX" (Badges Jornada/WEB; -30% abandono / 70% conversão)
├── IA / Desafio de Design
│   └── Card "Professional" (fundo gradiente radial roxo) — logo GoDaddy, "Agentic Product Designer", badge "Em breve"
├── Perfil / Sobre mim
│   ├── Work History (coluna esquerda: foto 410px + nome/cargo)
│   └── Philosophy (coluna direita: parágrafo + componente Work History variant="Closed",
│       3 experiências: Zenvia 2026-atual / Thomson Reuters 2023-2026 / Pecege 2022-2023)
├── "5+ ANOS" / Por que eu?
│   └── 4 itens empilhados: Data Analytics & BI · Gen AI (Prototipação/Pesquisa) · Colaboração Multidisciplinar · HTML & CSS
├── LEITURA / Data-Driven Design
│   ├── Card 1 → link /data-driven — componente "Users LIne Graph" + "Estratégia e pensamento de produto"
│   └── Card 2 "AI + Figma" — mock de editor de código com componente de código TypingAnimation
└── Footer (sticky)
    ├── Icon Yinyang
    ├── H1 "Obrigado."
    ├── "Sinta-se à vontade para me mandar uma mensagem. / Vamos trabalhar juntos!"
    ├── Nav: E-MAIL · LINKEDIN
    └── "© 2026"
```

**Nota:** existe um bloco inteiro oculto (`visible:false`) de "Outros projetos" (grid 2×2: Moderação MBA USP, Aulas MBA USP, Gestão de Tickets, Live Chat/Q&A) — resíduo de iteração anterior, **não reproduzir**.

### 2.2 Task Management / "Gestão de Prazos" (`/gestao-prazos` — PT)

```
Gestão de Prazos (/gestao-prazos)
├── Header (sticky) — idêntico ao da Home, com link "voltar" (wordmark → "/")
├── Hero (case study)
│   ├── Link "← voltar ao portfólio"
│   ├── H1 "Liderando o redesign da jornada de maior impacto na retenção"
│   ├── Aviso de privacidade (ícone Information, fundo azul)
│   ├── Imagem de capa (radius 8px)
│   └── Metadados: Data "Q2 - 2026" · Função "Product Designer" · Responsabilidade "End-to-End UX & UI"
├── Discovery
│   ├── Texto + lista numerada de evidências (37% registros UX, nota 3,9/5, 16% cancelamentos)
│   ├── Parágrafo sobre 7 entrevistas em profundidade
│   └── Grid de 5 citações de usuários (cards)
├── Leis de UX
│   └── Grid 2×2: Choice Overload · Cognitive Load · Hick's Law · Peak-End Rule
├── Processos de Design
│   └── Grid 2×2: Discovery com IA · Prototipação com IA · Testes de Usabilidade · Handoff
├── Construção da Solução (maior seção)
│   ├── Ideação: brainstorming, alternativa descartada (notificações), alternativa escolhida
│   │   (Controle de Prazos) + matriz de decisão
│   ├── Imagem "mapa" clicável → lightbox
│   ├── Aviso de privacidade (protótipo/Design System)
│   └── 3 blocos lado a lado (título+descrição+imagem full-screen clicável → lightbox):
│       "Entidade 'Prazo'" · "Lista, Priorização & Sinalização Visual" · "Kanban individual por prazo"
└── PoC - Proof of Concept
    ├── Métricas: Amostra 20 clientes · Usuários 113 · Tempo 4 semanas · Metodologia Opt-in
    ├── Resultados PoC: Etapas -4 · CSAT 4.6/5 · Retenção 73%
    ├── Aprendizados (lista, 4 itens sobre uso de IA no processo)
    └── Próximos passos (lista, 3 itens)
Footer — idêntico ao da Home
```

Header/footer **sem** Language Tab nesta página (case studies não têm seletor de idioma visível).

### 2.3 Data Driven (`/data-driven` — PT)

```
Data Driven (/data-driven)
├── Header — mesma estrutura, mas NÃO sticky (position: relative) no desktop/tablet;
│           no Phone é substituído por uma "Sticky Mobile Nav" separada (sticky, vertical)
├── Hero
│   ├── H1 "Data-Driven Design" (72px, lime)
│   ├── Subhead "Investigar o passado, acompanhar o presente e planejar o futuro através de dados"
│   └── 3 screenshots de dashboard sobrepostos em leque (rotação -3°/6°/8°)
├── Parágrafo de corpo (2 parágrafos sobre metodologia: SQL, observabilidade)
├── Flow Section — diagrama de organização (org chart)
│   Pill central "Product Designer" conectada a 4 pills: Times internos · Product Operations ·
│   Métricas de Produto · Métricas de UX (cada uma com ícone Lucide)
├── Grade de dashboards (3 linhas × 2 colunas)
│   6 cards: Tempo por view · Usuários ativos · Matriz de engajamento · Monitoramento de uso de
│   feature · Percentil75 LCP/INP · Volume de visitas
├── Citação/CTA — "O cruzamento entre dados e decisão é o que sustenta um design realmente
│   orientado a **resultados.**" (ícone Mage Dashboard Chart Arrow)
└── Footer — idêntico (com bug: link de e-mail do footer tem "mail to:" com espaço, mailto inválido)
```

Esta é a página mais "crua" do projeto: **zero `ComponentInstanceNode`** — tudo construído com frames/textos/ícones soltos, nenhum componente reutilizável usado.

---

## 3. Mapa de componentes

### Componentes efetivamente em uso

| Componente | Tipo | Páginas | Instâncias | Variantes/controles usados |
|---|---|---|---|---|
| **Badge** | externo | Home PT/EN, Gestão/Task | 338 (49+49+120+120) | `title`, `logoVisible:false`, `background: rgb(13,13,13)` |
| **Language Tab** | local | Home PT/EN | 10 | `PTBR` / `EN` / `Mobile PT` / `Mobile EN` |
| **Work History** | local | Home PT/EN | 2 | variante `Closed` (só a fechada é usada) — internamente usa 4× o componente **Work Card** local |
| **Users LIne Graph** | local | Home PT/EN | 2 | sem controles (gráfico estático) |
| **Phosphor** (wrapper de ícone) | externo | Home PT/EN | 9 | campos `name`/`name1` alternados por boolean `select`, cor via token |
| **TypingAnimation** | code component | Home PT/EN | 2 | props: `words`, `typeSpeed` 150, `deleteSpeed` 80, `delay` 2000, `showCursor`, `fontFamily` Inter, `fontSize` 32 |

Gestão de Prazos/Task Management usa **apenas Badge** (120 instâncias, todas dentro de blocos ocultos — projetos relacionados não renderizados). Data Driven **não usa nenhum componente**.

### Header e Footer

**Não são componentes no Framer** (sem Layout Template, sem ComponentInstance) — são `FrameNode` duplicados manualmente, mas com estrutura idêntica nas 6 páginas. **Recomendação para o código**: extrair como componentes `Header` e `Footer` reutilizáveis, já que a duplicação é só uma limitação de como esse projeto Framer foi montado, não uma diferença de design.

### Componentes órfãos do template (existem no arquivo, 0 usos — não implementar)

Navigation Bar, Menu, Client Section, Sub Title, Work Card (externo), Primary Button (2 versões), Underline Button, Marketing Card (local e externo), CTA Button, features, Benefit Card, Memoji, Carousel, Social Icon(s), Work History (externo), Availability, Call Button, Gumroad, Ticker, Time & Date, Scribbles, Blur Gradient, Layout Jump Preventer (usado só internamente dentro do Marketing Card órfão).

> Nota técnica: para componentes **externos**, o MCP não expõe fill/border/radius/shadow internos (aparecem como `ExternalModuleNode` opaco) — só os controles públicos (`readComponentControls`). Para o único externo em uso (**Badge**), a aparência visual real precisa ser confirmada por screenshot/inspeção manual no Framer antes de codificar (pendente).

---

## 4. Mapa de assets

### Imagens (URLs `framerusercontent.com`)

- Avatar/foto de perfil: `qykUV1P2LbGoPD3hue4zSiNMwbQ.jpeg` (Home, usada 2× — hero e "Sobre mim")
- Logos parceiros (Home): Thomson Reuters, Pecege (`5RDdGNTAVlSVJNkOHj0uREBa948.png`), Thomson Reuters (`QLLGIccZEq4plDLavaEe5bSvI.png`), + 1 logo vetorial sem nome identificado (**pendente**)
- Capa do case Gestão de Prazos: `YCLwbdBsZEPpVLhgwjZO1PfUQ0.png`
- Imagem "mapa" (Gestão de Prazos, lightbox): `uIBnIRVQXm72C5kdXNoF65nuQo.png`
- 3 telas de protótipo em altura total (~3900px, lightbox): `VnDxXD68oAzPDaW580ILBC5hfCE.png` ("Entidade Prazo"), `Abdgtzi39HCPO6u7DINwLehUA0.png` ("Lista/Priorização"), `LtrS6bizAGx8Fx8o3l0ac4GDtM.png` ("Kanban")
- Dashboards Data Driven: vários screenshots individuais (6 usados na grade + 3 no leque do hero)

### Ícones em uso, por set

- **Basicons**: Yinyang Balance (logo, recorrente), Privacy Lock, Switcher More, Sign Road Sign 3, Target 4/8, Battery Empty, Search 2, Mouse, Paper File, Buld Light Electricity, X Circle Close Delete, Check Box List Circle
- **Iconic**: Arrow Up Right (links externos, muito recorrente), Arrow Left, Information, Plus, Microphone
- **Sargam**: Code Muted, Album
- **Lucide**: Users, Settings, Chart Bar, Activity, X (fechar modal)
- **Mage**: Dashboard Chart Arrow
- **Phosphor**: só via componente wrapper (não como IconNode nativo)

Sets do inventário não observados em uso: Meteor, Material (podem existir em pontos não amostrados — pendente).

### Vídeos

Nenhum vídeo encontrado em nenhuma das páginas auditadas.

---

## 5. Tokens de design identificados

### 5.1 Cores (Color Style Tokens — todos só com valor `light`, site é dark fixo)

| Token | Valor |
|---|---|
| Black | `rgb(0, 0, 0)` |
| Dark Gray | `rgb(154, 154, 154)` |
| Grey D | `rgb(31, 31, 31)` |
| Border | `rgb(34, 34, 34)` (`#222`) |
| Smoke Gray | `rgb(122, 122, 122)` |
| Gray 50 | `rgb(130, 130, 130)` |
| White / White 100% / Text 100 / Primary Text | `rgb(255, 255, 255)` (4 tokens equivalentes) |
| Text 50 | `rgba(255, 255, 255, 0.5)` |
| Text 25 | `rgba(255, 255, 255, 0.25)` |
| secondary text | `rgb(204, 204, 204)` |

**Cor de destaque (accent) — hardcoded, sem token**: `rgb(207, 230, 78)` (lime). Usada em headlines de destaque, ícone de logo, eyebrows, ênfases de texto. Recomendo criar um token formal no código (`--color-accent` ou similar) já que é usada consistentemente.

Cor roxa `rgb(129, 74, 200)` aparece só no gradiente do card "Desafio de Design" (Home) e no componente CTA Button não usado — tratar como cor secundária pontual, não accent principal. Sem gradientes formais encontrados além desse radial-gradient específico.

### 5.2 Fontes do projeto

Inter, Inter Display, Figtree, JetBrains Mono, Switzer (sem custom fonts). Uso observado:
- **Inter**: fonte principal (headings e corpo, todas as páginas)
- **Inter Display**: só no texto de copyright do footer (14px/600)
- **Figtree**: usada pontualmente como alternativa ao Inter em alguns corpos/subtítulos (24px/500, 18px/400, 16px/300 e 600)
- **JetBrains Mono**: labels tipo "código"/monoespaçado (bio do hero da Home, stats)
- **Switzer**: uso único encontrado (nome "Matheus Francisco" na seção "Sobre mim" da Home, 22px/500)

### 5.3 Tipografia (sem Text Style Presets — valores inline, inconsistentes)

Combinações recorrentes observadas (fonte / peso / tamanho / line-height / letter-spacing):

| Papel | Fonte/peso/tamanho | line-height | letter-spacing |
|---|---|---|---|
| H1 hero Home | Inter 600 80px | 1.05em | -0.05em |
| H1 hero Data Driven | Inter 500 72px | 95% | -0.03em |
| H1 título de seção | Inter 500 32px | 1.05–1.2em | -0.02 a -0.05em |
| Subtítulo | Inter 500 24px | 1.05em | -0.05em |
| Subtítulo (variante) | Figtree 500 24px | 1.2em | -0.02em |
| Label "código" | JetBrains Mono 600 24px | 1.2em | — |
| Corpo padrão | Inter 400 16px | 1.2–1.5em (inconsistente) | -0.02 a -0.03em |
| Corpo (variante) | Figtree 400 18px | 1.4em | -0.02em |
| Corpo leve | Inter/Figtree 300 16px | 1.2–1.5em | -0.02em |
| Micro-label/badge | Inter Display 600 14px | 20px | 0em |
| Nome (Sobre mim) | Switzer 500 22px | 140% | -0.03em |

**Importante**: como não existem presets formais no Framer, a normalização dessa escala em tokens de código (H1/H2/Body/Caption) é uma decisão de implementação a ser validada visualmente contra o Framer página a página — não uma extração direta.

### 5.4 Espaçamento e containers

- Padding horizontal de seção: **80px desktop / 40px tablet / 24px phone** (padrão universal em todas as páginas)
- `maxWidth` do container de conteúdo: **1269px** (case studies) / **1040px** (Home, header/footer)
- Coluna de texto fixa: **520px** (hero e seções de case study no desktop) → colapsa para `1fr` no phone
- Bordas: **1px solid #222 (`rgb(34,34,34)`)**, usadas em containers de seção, cards, divisores
- Altura do header: **100px** fixo em todos os breakpoints
- Grids de 2 colunas (Leis de UX, Processos de Design, dashboards): sem gap entre células, bordas internas 1px

---

## 6. Comportamento responsivo

Padrão consistente nas 3 páginas (Replica Variants do Framer — Tablet/Phone herdam do Desktop com overrides pontuais):

- **Padding lateral**: 80px → 40px (tablet) → 24px (phone)
- **Tipografia**: tamanhos de heading reduzem por breakpoint (ex.: H1 hero Home 80px → 64px → 32px; H1 Data Driven 72px → 55px → 44px)
- **Grids 2×2 → stack vertical de 1 coluna** no Phone (Leis de UX, Processos, dashboards)
- **Colunas lado a lado → empilhamento vertical** no Tablet/Phone (cards de projeto, blocos de "Construção da Solução", "About Me")
- **Header/Footer**: `stackDirection` horizontal → vertical no Phone
- **Elementos que desaparecem no Phone**: bloco "companies" (logos parceiros) na Home vira grid 2×2 alternativo; segundo card secundário de projeto some no Tablet/Phone (Home)
- **Elementos que trocam por variante**: Language Tab desktop é substituído pela variante "Mobile PT/EN" no Phone (Home)
- **Caso especial (Data Driven)**: o header normal (`position: relative`) fica oculto no Phone e é substituído por uma "Sticky Mobile Nav" totalmente separada (`position: sticky`, layout vertical) — não é responsividade do mesmo componente, é troca de bloco inteiro
- **Caso especial (Data Driven)**: o Flow Diagram (org chart) parece ser escalado proporcionalmente (598px→325.83px, gap 10px→5.45px) — sugere `transform: scale()` no Framer em vez de recálculo de layout; atenção ao portar para CSS
- **Bug real preservado (Tablet, Home)**: a foto da seção "About Me" tem altura efetivamente ~0 no Tablet (`height: 410px→0.45px`) — parece um override incompleto no arquivo original, mas Phone recupera altura normal (302.77px). Reproduzir fielmente ou reportar para decisão do usuário.

**XXL (≥1920px) não foi auditado em nenhuma página** — pendente.

---

## 7. Interações e animações

- **Scroll reveal (`appearEffect`, `trigger: onInView` ou `onMount`)**: presente na Home e em Gestão de Prazos/Task Management — fade + `y: 150→0`, easing `tween 0.44,0,0.56,1`, duração 1s. Em Gestão de Prazos é aplicado a praticamente todos os blocos de conteúdo (`threshold: 0.5`).
- **Hover effects**: cards de projeto (Home) e cards relacionados ocultos mudam `backgroundColor` no hover, `spring-duration 0.4s`.
- **Lightbox/modal** (Gestão de Prazos): imagens de mapa e telas de protótipo abrem em `FixedOverlayNode` fullscreen (`backdrop: rgba(0,0,0,0.95)`, dismissible, bloqueia scroll), com animação de entrada em `scale: 0.96→1`.
- **Work History**: expande/colapsa via **clique** (`onTap → SET_VARIANT` entre `Closed`/`Open`), não é hover.
- **Header/Footer sticky**: `position: sticky` no header (Home, Gestão/Task) e no footer (todas). Na Home o footer tem `top: 4214px` herdado — sugere efeito de "revelar footer ao fim do scroll" (não testado em runtime).
- **Data Driven é estática**: nenhum `appearEffect`, hover ou onTap customizado encontrado nos nós de conteúdo.
- Nenhum Gesture Variant (`$gesture="hover"/"pressed"`) foi encontrado nos componentes locais inspecionáveis — hovers usam `hoverEffect` nativo do Framer nos próprios frames.

---

## 8. Navegação e links

| Link | Destino | Observação |
|---|---|---|
| Wordmark "MATHEUS FRANCISCO" (header) | `/` | em todas as páginas |
| E-MAIL (header/footer) | `mailto:matheusdasilveirapf@gmail.com` | nova aba — **exceto** footer da Data Driven, que tem bug `"mail to:..."` (espaço extra, mailto inválido) |
| LINKEDIN (header/footer) | `https://www.linkedin.com/in/mt-silveira/` | nova aba, em todas as páginas |
| Card "Gestão de Prazos" (Home) | `/gestao-prazos` (PT) / `/task-management` (EN) | slug muda por idioma |
| Card "Data-Driven Design" (Home) | `/data-driven` (PT) / `/data-driven-en` (EN) | slug muda por idioma |
| "← voltar" (Gestão de Prazos/Task Management) | `/` | ícone Arrow Left |
| Language Tab (Home) | comportamento interno não exposto pelos controls | **pendente confirmar** navegação exata PT↔EN |

Não há menu de navegação tradicional em nenhuma página — apenas wordmark (home), e-mail e LinkedIn.

---

## 9. Diferenças PT vs EN

- Estrutura de seções **idêntica** nos 3 templates (confirmado por spot-check).
- Slugs de link mudam por idioma (ver seção 8).
- Um card oculto na Home EN ainda referencia link em português (`/gestao-prazos`) — não atualizado, reforça que é conteúdo órfão.
- Data Driven EN mantém um card oculto/off-canvas com texto em português — mesmo padrão de resíduo.
- Nenhuma diferença estrutural real (seções faltando/extras/reordenadas) encontrada em nenhum par PT/EN.

---

## 10. Particularidades do Framer relevantes para a reconstrução

1. **Template comercial de base ("Norvin Agency")**: ~25 componentes externos no arquivo não são usados no site real — não implementar.
2. **Muito conteúdo duplicado/oculto** (`visible:false`, posições off-canvas) em praticamente todas as páginas — sempre confirmar visibilidade real antes de reproduzir algo.
3. **Nome do nó (`name`) ≠ texto renderizado** em vários pontos (ex.: copyright "Norvin Agency..." só aparece como `name`, texto real é "© 2026") — usar sempre o conteúdo real do `TextRun`, nunca o campo `name`.
4. **Sem Layout Template**: header/footer duplicados por página mas estruturalmente idênticos — bons candidatos a componentes no código mesmo não sendo assim no Framer.
5. **Sem Text Style Presets**: tipografia inline e inconsistente — normalização em tokens de código exige validação visual, não é extração direta.
6. **Componente de código `TypingAnimation`** (Home) precisa ser reimplementado como componente customizado (animação de digitação), não é nativo do Framer.
7. **Componentes externos são opacos ao MCP** (fill/border/radius/shadow não expostos) — o único externo em uso (`Badge`) precisa de inspeção visual (screenshot) antes de codificar com precisão.
8. **Overlays fullscreen para lightbox** (Gestão de Prazos) equivalem a um modal/dialog customizado em código.
9. **Bug real no Framer**: mailto do footer da Data Driven tem espaço extra (`"mail to:"`) — decisão do usuário se replica ou corrige.
10. **Escala proporcional (não recálculo de layout)** no Flow Diagram da Data Driven em Phone — pode precisar de `transform: scale()` em vez de resize de cada valor.
11. **Cor accent lime sem token formal** — recomendo formalizar como token no design system do código.

---

## 11. Arquitetura de código recomendada

> Recomendação de estrutura, a ser confirmada/ajustada com você antes de iniciar a implementação — esta auditoria não define stack/framework, que não foi especificado no CLAUDE.md.

**Design tokens** (`tokens.ts` ou CSS variables):
- Cores: os 10 tokens da seção 5.1 + token de accent lime formalizado
- Tipografia: escala normalizada a partir da tabela da seção 5.3 (validar visualmente por página antes de fixar)
- Espaçamento: padding de seção (80/40/24), maxWidth (1269/1040), borda padrão (#222 1px)
- Breakpoints: 1200px (desktop), 810px (tablet), 809.98px (phone), 1920px (XXL — pendente auditar)

**Componentes globais**:
- `Header` (com variante sticky para Home/case studies, variante estática para Data Driven + `MobileStickyNav` separada)
- `Footer`
- `Badge`
- `LanguageTab` (PT/EN, com variante mobile)
- `WorkHistory` (accordion Closed/Open, clique) + `WorkCard` interno
- `UsersLineGraph` (gráfico estático)
- `TypingAnimation` (componente de código customizado)
- `Lightbox`/`Modal` (para as imagens clicáveis de case study)
- `ProjectCard` (cards de destaque da Home — variantes com/sem imagem)

**Estrutura de páginas**:
- `/` e `/home-en` → template `HomePage`
- `/gestao-prazos` e `/task-management` → template `CaseStudyPage` (variante "Gestão de Prazos")
- `/data-driven` e `/data-driven-en` → template `CaseStudyPage` (variante "Data Driven") ou página própria, dado que a estrutura interna diverge bastante da Gestão de Prazos (sem discovery/leis de UX/processos — é mais orientada a dashboards)
- Roteamento i18n: mapear slugs PT↔EN conforme tabela da seção 8

---

## 12. Ordem ideal de implementação

Seguindo a "Ordem recomendada" do CLAUDE.md, aplicada a este projeto:

1. Confirmar stack técnica com o usuário (não definida no CLAUDE.md)
2. Design tokens (cores, tipografia normalizada, espaçamento, breakpoints) — validar visualmente contra o Framer
3. Componentes globais: `Header`, `Footer`, `Badge`
4. Homepage (maior página, define o padrão de `ProjectCard`, `LanguageTab`, `WorkHistory`)
5. Validação da Homepage (comparação visual, desktop primeiro)
6. Página Task Management (introduz `Lightbox`/modal)
7. Página Data Driven (introduz `MobileStickyNav`, diagrama Flow Section)
8. Responsividade das 3 páginas (Tablet → Phone, replicando os diffs documentados na seção 6)
9. Interações/animações (scroll reveal, hover effects, lightbox, accordion)
10. i18n / roteamento PT-EN
11. Revisão de particularidades pendentes (seção 13) antes do fechamento

---

## 13. Pendências consolidadas (não determinado nesta auditoria)

- Breakpoint **XXL** (≥1920px) não auditado em nenhuma página.
- Aparência visual real do componente **Badge** e dos demais componentes externos (MCP não expõe estilos internos) — precisa de screenshot/inspeção manual.
- Comportamento exato de navegação da **Language Tab** (para onde e como navega entre PT/EN).
- Comportamento do `onTap` em dois `RichTextNode` da seção "Data-Driven Design" (Home).
- Layout do estado **"Open"** (expandido) do componente Work History.
- Identidade da empresa do logo vetorial sem nome no hero da Home.
- Motivo/uso pretendido do bloco oculto "Outros projetos" da Home (se há alguma interação que o revela).
- Confirmação visual se o `position: sticky` do footer é intencional (comportamento em runtime não testado).
- Conteúdo visual exato da imagem "mapa" da Gestão de Prazos (só URL, não inspecionada visualmente).
- Se existe animação real de marquee/scroll infinito no bloco de Badges repetidos (atributos não mostram, mas pode estar em camada não coberta pelas queries).
- Se o frame de header oculto duplicado (achado na Data Driven) existe também nas outras 4 páginas.
- Ícones dos sets Meteor e Material não localizados em uso — podem estar em pontos não amostrados.
- Overrides de breakpoint não foram checados nó a nó em 100% da árvore de nenhuma página — usada amostragem representativa por seção; pequenos overrides finos podem não ter sido capturados.
