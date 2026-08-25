// Reconstrução do componente "Users LIne Graph" (local no Framer, id slgl2wscs —
// docs/framer-audit.md, seção 3). Legenda ("Total Users 3.01K" / "Vs Last Month 2.87K")
// confirmada via screenshot de referência do Framer; a curva exata dos dados não foi
// auditada — esta é uma reconstrução visual aproximada (linha + área), a validar.
export function UsersLineChart() {
  return (
    <div className="flex h-[120px] w-full flex-col justify-between rounded-none border border-border bg-[rgb(13,13,13)] p-4">
      <div className="flex items-center gap-4 text-xs text-text-50">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#5B8DEF]" />
          Total Users <span className="text-white">3.01K</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
          Vs Last Month <span className="text-white">2.87K</span>
        </span>
      </div>
      <svg viewBox="0 0 240 48" preserveAspectRatio="none" className="h-12 w-full">
        <polyline
          points="0,40 30,32 60,34 90,20 120,26 150,12 180,18 210,6 240,10"
          fill="none"
          stroke="#5B8DEF"
          strokeWidth="2"
        />
        <polyline
          points="0,44 30,42 60,40 90,38 120,36 150,32 180,30 210,26 240,24"
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
