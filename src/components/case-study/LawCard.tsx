import { Activity, Brain, LayoutGrid, Timer, type LucideIcon } from "lucide-react";
import { CARD } from "./card-style";
import type { TitleDescription } from "@/content/gestao-prazos-content";

// Ícone temático por lei, na ordem fixa em que content.ts sempre as declara (Choice Overload/
// Cognitive Load/Hick's Law/Peak-End Rule, mesma ordem traduzida no pt-BR) — por índice, não
// pelo título: os títulos pt-BR e en-US divergem (ex: "Lei de Hick" vs. "Hick's Law"), então
// mapear por texto quebraria em um dos dois locales.
const LAW_ICONS: LucideIcon[] = [
  LayoutGrid, // Choice Overload / Sobrecarga de Escolha — muitas opções lado a lado
  Brain, // Cognitive Load / Carga Cognitiva — esforço mental
  Timer, // Hick's Law / Lei de Hick — tempo de decisão
  Activity, // Peak-End Rule / Regra do Pico-Fim — curva com pico e fim
];

// Cada Lei de UX violada em um card próprio, grid 2x2. Ícone temático (accent) comunica
// "violação identificada" em vez de listar as leis como definição solta.
export function LawCard({
  title,
  description,
  icon: Icon,
}: TitleDescription & { icon: LucideIcon }) {
  return (
    <div className={`flex flex-col gap-3 ${CARD} p-5`}>
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.5} />
        <h3 className="text-base font-medium text-white">{title}</h3>
      </div>
      <p className="text-base leading-[1.5]">{description}</p>
    </div>
  );
}

export function LawCardGrid({ items }: { items: TitleDescription[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2">
      {items.map((item, index) => (
        <LawCard key={item.title} {...item} icon={LAW_ICONS[index] ?? LayoutGrid} />
      ))}
    </div>
  );
}
