import type { Locale } from "@/lib/language-context";
import type { Metric, Quote, TitleDescription } from "@/content/gestao-prazos-content";

// Case study novo (rota /app-mobile, pt-BR e /en/mobile-app, en-US) — conteúdo bruto fornecido
// pelo próprio usuário (não extraído do Framer: o MCP não estava conectado nesta sessão).
// Estrutura de seções e ordem definidas pelo usuário, adaptadas do case gestao-prazos, mas sem
// replicar sua sequência 1:1 (esse case não tem "Leis de UX" nem "Alternativas descartadas").
// Métricas do hero (SUS 78 / +44% sessões / +21% MAU) são as 3 propostas pelo próprio usuário
// como candidatas mais fortes.
export type MobileAppContent = {
  backLink: string;
  hero: {
    navLabel: string;
    title: string;
    intro: string;
    metrics: Metric[];
  };
  context: {
    number: string;
    eyebrow: string;
    body: string;
  };
  ideation: {
    number: string;
    eyebrow: string;
    body: string;
  };
  research: {
    number: string;
    eyebrow: string;
    intro: string;
    quotes: Quote[];
  };
  mvp: {
    number: string;
    eyebrow: string;
    intro: string;
    features: TitleDescription[];
  };
  architecture: {
    number: string;
    eyebrow: string;
    body: string;
  };
  usability: {
    number: string;
    eyebrow: string;
    metrics: Metric[];
    body: string;
  };
  launch: {
    number: string;
    eyebrow: string;
    body: string;
  };
  featureDesign: {
    number: string;
    eyebrow: string;
    intro: string;
    metrics: Metric[];
    note: string;
  };
  retention: {
    number: string;
    eyebrow: string;
    body: string;
    imageNote: string;
  };
};

export const mobileAppContent: Record<Locale, MobileAppContent> = {
  "pt-BR": {
    backLink: "Voltar ao portfólio",
    hero: {
      navLabel: "Visão geral",
      title: "Criação de aplicativo híbrido utilizando Flutter e Google Material Design",
      intro:
        "Projeto de expansão da plataforma SaaS para o mobile, guiado por pesquisa contínua desde a definição do MVP até a feature mais utilizada do produto hoje.",
      metrics: [
        { value: "78", label: "SUS (System Usability Score)" },
        { value: "+44%", label: "Sessões após a feature de agenda" },
        { value: "+21%", label: "Usuários ativos mensais (MAU)" },
      ],
    },
    context: {
      number: "01",
      eyebrow: "Contexto",
      body: "Liderei o ciclo de design e desenvolvimento para a expansão da plataforma SaaS para o mobile. O objetivo era fornecer mobilidade e acesso às principais funcionalidades da versão web. A evolução do projeto, que parte de um MVP, mostra a importância da pesquisa contínua e da adaptação às necessidades do usuário.",
    },
    ideation: {
      number: "02",
      eyebrow: "Ideação",
      body: "A definição do escopo do MVP combinou duas abordagens. Análise quantitativa, com dados gerais de uso via Tableau e Datadog. Pesquisa qualitativa, com entrevistas com usuários. Decisão minha: cruzar as duas fontes antes de fechar o escopo, para não basear a priorização só no volume de uso no desktop.",
    },
    research: {
      number: "03",
      eyebrow: "Pesquisa qualitativa",
      intro:
        "Objetivo: mapear a jornada do usuário fora do escritório e suas prioridades de ação. Entrevistei usuários com perguntas como:",
      quotes: [
        {
          number: "01",
          title: "Urgência em campo",
          quote:
            "Quando você está longe do computador e precisa resolver algo urgente relacionado ao nosso sistema, qual é a primeira coisa que você tentaria fazer pelo celular?",
        },
        {
          number: "02",
          title: "Situação real",
          quote:
            "Descreva uma situação real em que você precisou usar o nosso sistema, mas só tinha seu celular ou tablet em mãos. Onde você estava e qual era o seu objetivo?",
        },
        {
          number: "03",
          title: "Tarefas que não esperam",
          quote:
            "Das tarefas que você realiza diariamente no desktop, como consultar andamentos ou agendar, quais delas não podem esperar até você retornar ao escritório?",
        },
        {
          number: "04",
          title: "Prioridade em 30 segundos",
          quote:
            "Se você pudesse fazer apenas três ações em 30 segundos usando o aplicativo móvel, quais seriam e por quê?",
        },
      ],
    },
    mvp: {
      number: "04",
      eyebrow: "O MVP",
      intro:
        "O MVP espelhava as funcionalidades mais usadas na versão web e mais relevantes para mobilidade.",
      features: [
        {
          title: "Agenda",
          description: "Acesso e consulta de agenda, para verificar compromissos fora do escritório.",
        },
        {
          title: "Andamentos",
          description: "Visualização de andamentos recentes dos processos.",
        },
        {
          title: "Pastas de processo",
          description: "Acompanhamento de pastas de processo direto pelo celular.",
        },
        {
          title: "Compartilhamento",
          description: "Compartilhamento de informações do processo com outras pessoas.",
        },
      ],
    },
    architecture: {
      number: "05",
      eyebrow: "Arquitetura e Design System",
      body: "O aplicativo foi desenvolvido em Angular, com interface em Google Material Design 3. Os comportamentos de navegação seguem os padrões nativos de cada sistema operacional, Android e iOS.",
    },
    usability: {
      number: "06",
      eyebrow: "Teste de usabilidade",
      metrics: [
        { value: "78", label: "SUS (usabilidade aceitável/boa)" },
        { value: "82", label: "CSAT (boa satisfação inicial)" },
      ],
      body: "Os resultados eram aceitáveis, mas o teste também indicou uma lacuna no escopo do produto. A função primária de um MVP é validar a hipótese inicial e identificar ajuste produto-mercado. Decisão minha: avançar para o lançamento mesmo com a lacuna identificada, em vez de esperar por um escopo mais completo.",
    },
    launch: {
      number: "07",
      eyebrow: "Lançamento",
      body: "Após o lançamento, acompanhei métricas quantitativas, como taxa de abandono e sessões, e feedback qualitativo, via surveys e entrevistas. O diagnóstico apontou a causa da lacuna: a impossibilidade de criar e editar agendas de atividade diretamente pelo aplicativo era o maior ponto de atrito.",
    },
    featureDesign: {
      number: "08",
      eyebrow: "Desenho da feature",
      intro: "Desenhei a funcionalidade de criar e editar agendas para fechar essa lacuna.",
      metrics: [
        { value: "+44%", label: "Sessões" },
        { value: "+21%", label: "Base de usuários" },
      ],
      note: "É a funcionalidade mais utilizada atualmente.",
    },
    retention: {
      number: "09",
      eyebrow: "Retenção",
      body: "O produto apresenta taxa de abandono saudável, um indicativo de que potencialmente alcançamos ajuste produto-mercado (Product-Market Fit).",
      imageNote:
        "*Análise Cohort verdadeira, mas com período de avaliação fictício por questões de privacidade.",
    },
  },
  "en-US": {
    backLink: "Back to portfolio",
    hero: {
      navLabel: "Overview",
      title: "Building a hybrid app using Flutter and Google Material Design",
      intro:
        "A mobile expansion of the SaaS platform, guided by continuous research from the MVP definition through the most used feature in the product today.",
      metrics: [
        { value: "78", label: "SUS (System Usability Score)" },
        { value: "+44%", label: "Sessions after the schedule feature" },
        { value: "+21%", label: "Monthly active users (MAU)" },
      ],
    },
    context: {
      number: "01",
      eyebrow: "Context",
      body: "I led the design and development cycle for expanding the SaaS platform to mobile. The goal was to provide mobility and access to the web version's core features. The project's evolution, starting from an MVP, shows the importance of continuous research and adapting to user needs.",
    },
    ideation: {
      number: "02",
      eyebrow: "Ideation",
      body: "Defining the MVP scope combined two approaches. Quantitative analysis, with general usage data via Tableau and Datadog. Qualitative research, with user interviews. My decision: cross-reference both sources before closing the scope, so prioritization wouldn't rely only on desktop usage volume.",
    },
    research: {
      number: "03",
      eyebrow: "Qualitative research",
      intro:
        "Goal: map the user's journey away from the office and their priorities for action. I interviewed users with questions like:",
      quotes: [
        {
          number: "01",
          title: "Urgency in the field",
          quote:
            "When you're away from your computer and need to solve something urgent related to our system, what's the first thing you'd try to do on your phone?",
        },
        {
          number: "02",
          title: "A real situation",
          quote:
            "Describe a real situation where you needed to use our system but only had your phone or tablet with you. Where were you and what was your goal?",
        },
        {
          number: "03",
          title: "Tasks that can't wait",
          quote:
            "Of the tasks you do daily on desktop, like checking updates or scheduling, which ones can't wait until you're back at the office?",
        },
        {
          number: "04",
          title: "Priority in 30 seconds",
          quote:
            "If you could do only three actions in 30 seconds using the mobile app, what would they be and why?",
        },
      ],
    },
    mvp: {
      number: "04",
      eyebrow: "The MVP",
      intro:
        "The MVP mirrored the most used features from the web version and the most relevant ones for mobility.",
      features: [
        {
          title: "Schedule",
          description: "Access and check the schedule, to review commitments away from the office.",
        },
        {
          title: "Updates",
          description: "View recent updates on cases.",
        },
        {
          title: "Case files",
          description: "Track case files directly from the phone.",
        },
        {
          title: "Sharing",
          description: "Share case information with other people.",
        },
      ],
    },
    architecture: {
      number: "05",
      eyebrow: "Architecture & Design System",
      body: "The app was built with Angular, with an interface in Google Material Design 3. Navigation behavior follows the native patterns of each operating system, Android and iOS.",
    },
    usability: {
      number: "06",
      eyebrow: "Usability testing",
      metrics: [
        { value: "78", label: "SUS (acceptable/good usability)" },
        { value: "82", label: "CSAT (good initial satisfaction)" },
      ],
      body: "The results were acceptable, but the test also pointed to a gap in the product's scope. An MVP's primary function is to validate the initial hypothesis and identify product-market fit. My decision: move forward with launch despite the identified gap, instead of waiting for a more complete scope.",
    },
    launch: {
      number: "07",
      eyebrow: "Launch",
      body: "After launch, I tracked quantitative metrics, like drop-off rate and sessions, and qualitative feedback, via surveys and interviews. The diagnosis pointed to the cause of the gap: not being able to create and edit schedule entries directly from the app was the biggest point of friction.",
    },
    featureDesign: {
      number: "08",
      eyebrow: "Feature design",
      intro: "I designed the create and edit schedule feature to close that gap.",
      metrics: [
        { value: "+44%", label: "Sessions" },
        { value: "+21%", label: "User base" },
      ],
      note: "It's the most used feature today.",
    },
    retention: {
      number: "09",
      eyebrow: "Retention",
      body: "The product shows a healthy drop-off rate, an indicator that we potentially reached product-market fit.",
      imageNote: "*Real cohort analysis, but with a fictional evaluation period for privacy reasons.",
    },
  },
};
