import { ArrowUpRight } from "lucide-react";
import { EMAIL, LINKEDIN_URL } from "@/lib/contact";

// Links de e-mail e LinkedIn reutilizados no Header e no Footer (docs/framer-audit.md, seção 8).
export function ContactNav({ className }: { className?: string }) {
  return (
    <nav className={`flex items-center gap-6 ${className ?? ""}`}>
      <a
        href={`mailto:${EMAIL}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-base leading-[1.2] text-white transition-colors hover:text-accent"
      >
        E-MAIL
        <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
      </a>
      <a
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-base leading-[1.2] text-white transition-colors hover:text-accent"
      >
        LINKEDIN
        <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
      </a>
    </nav>
  );
}
