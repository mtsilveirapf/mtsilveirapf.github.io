"use client";

import { Hammer } from "lucide-react";
import { useLanguage, type Locale } from "@/lib/language-context";

type BadgeStatus = "in-progress" | "unavailable";

// icon: undefined pros status que não devem mostrar ícone (unavailable, a pedido explícito do
// usuário — "somente o texto/label, sem ícone").
const STATUS_CONTENT: Record<
  BadgeStatus,
  Record<Locale, { label: string; colorClass: string; icon?: typeof Hammer }>
> = {
  "in-progress": {
    "pt-BR": {
      label: "Em obra",
      colorClass: "border-accent-orange/40 bg-accent-orange/10 text-accent-orange",
      icon: Hammer,
    },
    "en-US": {
      label: "Soon",
      colorClass: "border-accent-purple/40 bg-accent-purple/10 text-accent-purple",
      icon: Hammer,
    },
  },
  // Estado "desabilitado de verdade" (card sem link, sem hover, aria-disabled) — tom neutro em
  // vez da cor de destaque usada no "in-progress" comum, pra não parecer clicável/ativo.
  unavailable: {
    "pt-BR": {
      label: "Em obra · Indisponível",
      colorClass: "border-white/10 bg-white/5 text-smoke-gray",
    },
    "en-US": {
      label: "Under construction · Unavailable",
      colorClass: "border-white/10 bg-white/5 text-smoke-gray",
    },
  },
};

// Badge de status reutilizável para cards de projeto ainda não construídos — remover a linha
// <StatusBadge status="in-progress" /> do card é a única mudança necessária assim que o projeto
// for publicado, sem mexer em nenhum outro componente. Texto e cor trocam sozinhos com o idioma
// ativo (useLanguage), mesma lógica de i18n já usada no resto do site. Posição no tablet/desktop
// (canto superior direito, absoluta) fica a cargo de quem usa o componente — cada card já tem
// seu próprio `position: relative`. No mobile, a pedido explícito do usuário, o badge sai do
// posicionamento absoluto e vira o primeiro elemento do fluxo normal do card (acima do título) —
// já é o primeiro filho no JSX de quem usa o componente, então só remover o `absolute` já
// basta pra ele aparecer em cima, sem precisar reordenar nada.
export function StatusBadge({ status }: { status: BadgeStatus }) {
  const { locale } = useLanguage();
  const { label, colorClass, icon: Icon } = STATUS_CONTENT[status][locale];
  return (
    <span
      className={`static w-fit inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm leading-[1.2] tablet:absolute tablet:top-4 tablet:right-4 tablet:z-10 ${colorClass}`}
    >
      {Icon && <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />}
      {label}
    </span>
  );
}
