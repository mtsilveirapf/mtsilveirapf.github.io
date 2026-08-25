import Image from "next/image";

// Screenshot real de dashboard (ou, na ausência de `image`, o placeholder reservado original —
// borda tracejada, mantido pra continuar reutilizável enquanto algum slot futuro ainda não tiver
// asset). bg-[#30333B] fixo na máscara, independente de ter imagem ou não: fallback visual pra
// quando a imagem não preenche a área inteira (proporção diferente da aspect-[8/5] da máscara,
// object-contain deixando sobra) — sem isso, a sobra apareceria vazia/transparente. Aplicado nas
// 6 máscaras por igual, mesmo nas que encaixam perfeitamente, pra manter consistência visual
// entre elas — a pedido explícito do usuário. object-contain (não cover): os screenshots reais
// têm proporções variadas entre si (não todos exatamente 8:5), cover cortaria conteúdo do
// dashboard pra preencher a máscara; contain garante a captura inteira sempre visível.
export function GalleryPlaceholder({
  label,
  caption,
  image,
}: {
  label: string;
  caption: string;
  image?: string | null;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div
        className={`relative flex aspect-[8/5] w-full items-center justify-center overflow-hidden rounded border bg-[#30333B] p-4 text-center text-base text-text-50 transition-all duration-300 hover:scale-[1.01] hover:border-white/25 ${
          image ? "border-border" : "border-dashed border-border"
        }`}
      >
        {image ? (
          <Image src={image} alt={label} fill className="object-contain" />
        ) : (
          <span>[Imagem: {label}]</span>
        )}
      </div>
      <p className="text-base leading-[1.4]">{caption}</p>
    </div>
  );
}
