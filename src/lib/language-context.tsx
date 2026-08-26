"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Locale = "pt-BR" | "en-US";

const STORAGE_KEY = "locale";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

// Idioma persiste em localStorage (chave "locale") pra sobreviver a navegações de página
// inteira — necessário porque o case study em inglês vive numa rota separada (/en/...), um
// export estático do Next (cada rota é um HTML próprio), então o Context em memória sempre
// reseta numa navegação full-page entre elas, mesmo dentro da mesma aba. Sem persistência,
// "Voltar ao portfólio" a partir da versão em inglês do case sempre cairia de volta no
// português.
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("pt-BR");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "pt-BR" || stored === "en-US") {
      window.setTimeout(() => setLocaleState(stored), 0);
    }
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
