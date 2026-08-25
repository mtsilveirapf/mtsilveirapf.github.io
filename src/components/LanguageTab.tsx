"use client";

import { useLanguage } from "@/lib/language-context";

// Componente "Language Tab" (local no Framer, id WlO5omfa2 — docs/framer-audit.md, seção 3).
// Visual: fill rgba(255,255,255,0.05), border 1px rgba(255,255,255,0.1), radius 8px, padding 3px.
// Troca o idioma instantaneamente via Context (sem reload/navegação), conforme solicitado.
export function LanguageTab({ className }: { className?: string }) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className={`inline-flex items-center gap-[3px] rounded-lg border border-white/10 bg-white/5 p-[3px] ${className ?? ""}`}
    >
      <button
        type="button"
        onClick={() => setLocale("pt-BR")}
        className={`rounded-md px-3 py-1.5 text-sm leading-[1.2] transition-colors ${
          locale === "pt-BR"
            ? "bg-accent/20 text-accent"
            : "text-text-50 hover:text-white"
        }`}
      >
        PT-BR
      </button>
      <button
        type="button"
        onClick={() => setLocale("en-US")}
        className={`rounded-md px-3 py-1.5 text-sm leading-[1.2] transition-colors ${
          locale === "en-US"
            ? "bg-accent/20 text-accent"
            : "text-text-50 hover:text-white"
        }`}
      >
        EN
      </button>
    </div>
  );
}
