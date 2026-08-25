import { Filter, FlaskConical, Timer, Users, type LucideIcon } from "lucide-react";
import { CARD } from "./card-style";

// Ícone temático por campo, na ordem fixa em que a PoC sempre os declara (Amostra/Usuários/
// Tempo/Metodologia, ou a tradução equivalente) — por índice, não pelo texto do label, que
// muda de idioma.
const FIELD_ICONS: LucideIcon[] = [Filter, Users, Timer, FlaskConical];

// Campos da PoC (Amostra/Usuários/Tempo/Metodologia) em grid compacto 2x2, tratamento
// equivalente ao StatCard secundário mas com label+valor mais denso (valor pode ser frase).
// Label segue o mesmo padrão de LawCard/QuoteCard: ícone temático em accent + texto branco,
// sem uppercase.
export function DataGrid({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 tablet:grid-cols-2">
      {items.map((item, index) => {
        const Icon = FIELD_ICONS[index] ?? Filter;
        return (
          <div key={item.label} className={`flex flex-col gap-1 ${CARD} p-4`}>
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.5} />
              <span className="font-figtree text-base tracking-[0.05em] text-white">
                {item.label}
              </span>
            </div>
            <span className="text-base leading-[1.4] text-dark-gray">{item.value}</span>
          </div>
        );
      })}
    </div>
  );
}
