"use client";

import { Hammer } from "lucide-react";
import { useLanguage, type Locale } from "@/lib/language-context";

type BadgeStatus = "in-progress";

const STATUS_CONTENT: Record<BadgeStatus, Record<Locale, { label: string; colorClass: string }>> = {
  "in-progress": {
    "pt-BR": {
      label: "Em obra",
      colorClass: "border-accent-orange/40 bg-accent-orange/10 text-accent-orange",
    },
    "en-US": {
      label: "Soon",
      colorClass: "border-accent-purple/40 bg-accent-purple/10 text-accent-purple",
    },
  },
};

// Badge de status reutilizável para cards de projeto ainda não construídos — remover a linha
// <StatusBadge status="in-progress" /> do card é a única mudança necessária assim que o projeto
// for publicado, sem mexer em nenhum outro componente. Texto e cor trocam sozinhos com o idioma
// ativo (useLanguage), mesma lógica de i18n já usada no resto do site. Posição (canto superior
// direito, absoluta) fica a cargo de quem usa o componente — cada card já tem seu próprio
// `position: relative`.
export function StatusBadge({ status }: { status: BadgeStatus }) {
  const { locale } = useLanguage();
  const { label, colorClass } = STATUS_CONTENT[status][locale];
  return (
    <span
      className={`absolute top-4 right-4 z-10 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm leading-[1.2] ${colorClass}`}
    >
      <Hammer className="h-3.5 w-3.5" strokeWidth={1.5} />
      {label}
    </span>
  );
}
