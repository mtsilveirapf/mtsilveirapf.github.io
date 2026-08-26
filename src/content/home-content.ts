import type { Locale } from "@/lib/language-context";
import type { FaqItem } from "@/components/FaqAccordion";

export type ProjectCardContent = {
  title: string;
  description?: string;
  stats: { value: string; label: string }[];
};

export type HomeContent = {
  footer: {
    thanks: string;
    message: [string, string];
  };
  hero: {
    greeting: string;
    credentials: string[];
    titleLine1: string;
    titleLine2Prefix: string; // the "&" character, kept separate for the accent span
    titleLine2Rest: string;
  };
  destaques: {
    eyebrow: string;
    title: string;
    main: ProjectCardContent;
    secondary1: ProjectCardContent;
    ghostMessage: string;
  };
  perfil: {
    eyebrow: string;
    title: string;
    name: string;
    paragraphs: string[];
    experiencesLabel: string;
    workHistory: {
      showAll: string;
      showLess: string;
      experiences: { company: string; role: string; period: string }[];
    };
  };
  whyMe: {
    eyebrow: string;
    title: string;
    items: FaqItem[];
  };
  leitura: {
    eyebrow: string;
    title: string;
    card1: { title: string; description: string };
    card2: {
      title: string;
      description: string;
      codeBadge: string;
      designSystemBadge: string;
    };
  };
};

export const homeContent: Record<Locale, HomeContent> = {
  "pt-BR": {
    footer: {
      thanks: "Obrigado.",
      message: [
        "Sinta-se à vontade para me mandar uma mensagem.",
        "Vamos trabalhar juntos!",
      ],
    },
    hero: {
      greeting: "Olá, eu sou o Matheus",
      credentials: [
        "Bacharel em Design · UFJF",
        "Especialista em UX/UI · EBAC",
        "Pós em Data Analytics · PUC-MG",
        "Data Analyst Associate · Datacamp",
      ],
      titleLine1: "Senior Product Designer",
      titleLine2Prefix: "&",
      titleLine2Rest: "Data Analyst Associate",
    },
    destaques: {
      eyebrow: "DESTAQUES",
      title: "Projetos",
      main: {
        title:
          "Liderando o redesign da jornada de maior impacto na retenção",
        description:
          "Resolução de churn por alta curva de aprendizado através do mapeamento de personas e jornadas de usuário, simplificando os fluxos para adoção do produto",
        stats: [
          { value: "4", label: "Etapas reduzidas" },
          { value: "4.6/5.0", label: "Satisfação" },
          { value: "73%", label: "Retenção vs. Jornada Anterior" },
        ],
      },
      secondary1: {
        title: "Criação de aplicativo híbrido utilizando Flutter e Google Material Design",
        description:
          "Projeto de expansão da plataforma SaaS para o mobile, guiado por pesquisa contínua desde a definição do MVP até a feature mais utilizada do produto hoje.",
        stats: [
          { value: "+21%", label: "Monthly Active Users (MAU)" },
          { value: "~70%", label: "Retenção (5 semanas)" },
        ],
      },
      ghostMessage: "Correria por aqui. Os próximos cases já estão a caminho.",
    },
    perfil: {
      eyebrow: "PERFIL",
      title: "Sobre mim",
      name: "Matheus Francisco",
      paragraphs: [
        "Product Designer com mais de 5 anos de experiência no mercado B2B SaaS. Executo o design de ponta a ponta com um processo integralmente assistido por IA.",
        "Tenho um perfil de forte autonomia, acostumado a trabalhar com ambiguidades, tomar decisões difíceis, construir fluxos de trabalho do zero e liderar projetos.",
        "Com pós-graduação em Data Analytics e conhecimento em Front-End, atuo lado a lado com times de engenharia, produto e negócio para alinhar a direção com rapidez.",
        "Bom design, pra mim, é se o que foi construído realmente fez diferença.",
        "Atuando 100% de forma remota para empresas em todo o Brasil e exterior.",
      ],
      experiencesLabel: "Minhas experiências",
      workHistory: {
        showAll: "Mostrar todos",
        showLess: "Mostrar menos",
        experiences: [
          { company: "Zenvia", role: "Product Designer", period: "2026 - Atual" },
          {
            company: "Thomson Reuters",
            role: "Product Designer",
            period: "2023 - 2026",
          },
          { company: "Pecege", role: "Product Designer", period: "2022 - 2023" },
          { company: "BETC Havas", role: "Product Designer", period: "2021 - 2022" },
        ],
      },
    },
    whyMe: {
      eyebrow: "5+ ANOS",
      title: "Por que eu?",
      items: [
        {
          question: "Você toma decisões de design com base em dados?",
          answer:
            "Tenho pós-graduação em Analytics e BI pela PUC-Minas e domínio em SQL. Com esse conhecimento, construo dashboards de observabilidade de comportamento do usuário, defino KPIs e estruturo o tagueamento da jornada.",
          linkHref: "/data-driven",
          linkLabel: "Veja meu processo",
        },
        {
          question: "Como você usa Inteligência Artificial no seu processo?",
          answer:
            "Uso IA em todo o processo, com fluxos configurados para síntese de dados de pesquisa e análise de personas, à criação de testes de usabilidade, clarificação de critérios de negócio, prototipação de alta fidelidade e mais.",
        },
        {
          question:
            "Você trabalha só com o time de design ou também com outras áreas?",
          answer:
            "Minha atuação é lado a lado com Produto, Engenharia e Negócios. Tenho base de front-end e conhecimento suficiente sobre APIs para dialogar tecnicamente com engenharia sobre viabilidade técnica. Minha formação em dados me permite contribuir ativamente com PMs e Product Operations em definição de métricas e priorização.",
        },
        {
          question: "Que tipo de resultado seu trabalho já gerou?",
          answer:
            "Alguns números de projetos recentes: R$600 mil em receita com um add-on pago, -18% de churn no fluxo de cadastro, +7,8% de MAU em 12 meses e 73% de retenção na reformulação de uma jornada de usuário.",
        },
      ],
    },
    leitura: {
      eyebrow: "LEITURA",
      title: "Visão e Processos",
      card1: {
        title: "Product Analytics",
        description:
          "Decisões de design embasadas por métricas de produto e comportamento de usuário",
      },
      card2: {
        title: "IA Aplicada ao Design",
        description:
          "Como integro inteligência artificial em todas as etapas do fluxo de trabalho para acelerar entregas e otimizar o processo de design.",
        codeBadge: "Código",
        designSystemBadge: "Design System",
      },
    },
  },
  "en-US": {
    footer: {
      thanks: "Thank you.",
      message: [
        "Feel free to send me a message.",
        "Let's work together!",
      ],
    },
    hero: {
      greeting: "Hi, I'm Matheus",
      credentials: [
        "Bachelor's in Design · UFJF",
        "UX/UI Specialist · EBAC",
        "Data Analytics Postgrad · PUC-MG",
        "Data Analyst Associate · Datacamp",
      ],
      titleLine1: "Senior Product Designer",
      titleLine2Prefix: "&",
      titleLine2Rest: "Data Analyst Associate",
    },
    destaques: {
      eyebrow: "HIGHLIGHTS",
      title: "Projects",
      main: {
        title:
          "Leading the redesign of the journey with the biggest impact on retention",
        description:
          "Resolving churn caused by a steep learning curve through persona and user journey mapping, simplifying flows for product adoption",
        stats: [
          { value: "4", label: "Steps reduced" },
          { value: "4.6/5.0", label: "Satisfaction" },
          { value: "73%", label: "Retention vs. previous journey" },
        ],
      },
      secondary1: {
        title: "Building a hybrid app using Flutter and Google Material Design",
        description:
          "A mobile expansion of the SaaS platform, guided by continuous research from the MVP definition through the most used feature in the product today.",
        stats: [
          { value: "+21%", label: "Monthly Active Users (MAU)" },
          { value: "~70%", label: "Retention (5 weeks)" },
        ],
      },
      ghostMessage: "Things are busy around here. The next cases are already on the way.",
    },
    perfil: {
      eyebrow: "PROFILE",
      title: "About me",
      name: "Matheus Francisco",
      paragraphs: [
        "Product Designer with over 5 years of experience in the B2B SaaS market. I execute design end-to-end with a process fully assisted by AI.",
        "I have a strongly autonomous profile, used to working with ambiguity, making tough decisions, building workflows from scratch, and leading projects.",
        "With a postgraduate degree in Data Analytics and Front-End knowledge, I work closely with engineering, product, and business teams to align direction quickly.",
        "To me, good design means what gets built actually makes a difference.",
        "Working 100% remotely for companies across Brazil and abroad.",
      ],
      experiencesLabel: "My experience",
      workHistory: {
        showAll: "Show all",
        showLess: "Show less",
        experiences: [
          { company: "Zenvia", role: "Product Designer", period: "2026 - Present" },
          {
            company: "Thomson Reuters",
            role: "Product Designer",
            period: "2023 - 2026",
          },
          { company: "Pecege", role: "Product Designer", period: "2022 - 2023" },
          { company: "BETC Havas", role: "Product Designer", period: "2021 - 2022" },
        ],
      },
    },
    whyMe: {
      eyebrow: "5+ YEARS",
      title: "Why me?",
      items: [
        {
          question: "Do you make design decisions based on data?",
          answer:
            "I have a postgraduate degree in Analytics and BI from PUC-Minas and strong SQL skills. With that, I build user behavior observability dashboards, define KPIs, and structure journey tagging.",
          linkHref: "/en/data-driven",
          linkLabel: "See my process",
        },
        {
          question: "How do you use AI in your process?",
          answer:
            "I use AI throughout the process, with configured flows for research data synthesis and persona analysis, usability test creation, business criteria clarification, high-fidelity prototyping, and more.",
        },
        {
          question:
            "Do you only work with the design team, or with other areas too?",
          answer:
            "I work side by side with Product, Engineering, and Business. I have a front-end foundation and enough API knowledge to talk technically with engineering about feasibility. My data background lets me actively contribute to metric definition and prioritization with PMs and Product Operations.",
        },
        {
          question: "What kind of results has your work generated?",
          answer:
            "Some numbers from recent projects: R$600K in revenue from a paid add-on, -18% churn in the signup flow, +7.8% MAU over 12 months, and 73% retention from a user journey redesign.",
        },
      ],
    },
    leitura: {
      eyebrow: "READING",
      title: "Data-Driven Design",
      card1: {
        title: "Product strategy & thinking",
        description: "Guiding design decisions with UX and Product metrics",
      },
      card2: {
        title: "AI + Figma",
        description:
          "Complete product redesign carried out with AI support, with measurable productivity gains.",
        codeBadge: "Code",
        designSystemBadge: "Design System",
      },
    },
  },
};
