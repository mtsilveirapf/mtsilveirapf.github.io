// Padrão de "eyebrow + título" repetido em todas as seções de conteúdo do site
// (docs/framer-audit.md, seção 5.3): eyebrow Inter 500 16px -0.05em cor accent (lime),
// título Inter 500 32px -0.05em cor white, line-height 1.05em (1.15em na seção IA).
export function SectionHeading({
  eyebrow,
  title,
  titleLeading = "leading-[1.05]",
  icon,
  className,
}: {
  eyebrow: string;
  title: string;
  titleLeading?: string;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className ?? ""}`}>
      <span className="text-base font-medium tracking-[-0.05em] text-accent">
        {eyebrow}
      </span>
      <h2
        className={`flex items-center gap-3 text-[32px] font-medium tracking-[-0.05em] text-white ${titleLeading}`}
      >
        {icon}
        {title}
      </h2>
    </div>
  );
}
