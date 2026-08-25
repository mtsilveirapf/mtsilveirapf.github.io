// Componente "Badge" (externo no Framer, id 2BR9JoWaW9xidj45lxli — docs/framer-audit.md, seção 3).
// Controles observados: title, logoVisible, background (default rgb(13,13,13)).
export function Badge({
  title,
  icon,
}: {
  title: string;
  icon?: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-[rgb(13,13,13)] px-3 py-1 text-sm leading-[1.2] text-white">
      {icon}
      {title}
    </span>
  );
}
