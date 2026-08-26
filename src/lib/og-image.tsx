import { ImageResponse } from "next/og";

export const OG_IMAGE_SIZE = { width: 1200, height: 630 };
export const OG_IMAGE_ALT =
  "Matheus Francisco — Senior Product Designer & Data Analyst Associate";

// Composição própria pra esse thumbnail (não existe no Framer — feature nova pedida
// explicitamente pelo usuário). Reaproveita só o que já é real no site: a marca (LogoMark,
// mesmo componente do Header/Footer, recriada aqui em SVG puro porque next/og roda fora da
// árvore React normal), a paleta (--color-black/--color-accent/--color-border/--color-dark-gray
// /--color-smoke-gray de globals.css) e o título do Hero. Eyebrow, descrição e ordem das
// empresas no rodapé foram definidos por pedido explícito do usuário.
// Compartilhado entre opengraph-image.tsx e twitter-image.tsx pra não duplicar a busca de
// fonte nem o JSX — cada arquivo só declara seus próprios exports obrigatórios (size/alt/
// contentType/dynamic) e chama renderOgImage().

async function loadInterFont(weight: number) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=Inter:wght@${weight}&display=swap`
  ).then((res) => res.text());
  const fontUrl = css.match(/src: url\((.+?)\) format\('truetype'\)/)?.[1];
  if (!fontUrl) throw new Error(`Não encontrei a URL da fonte Inter ${weight}`);
  return fetch(fontUrl).then((res) => res.arrayBuffer());
}

export async function renderOgImage() {
  const [interRegular, interSemibold] = await Promise.all([
    loadInterFont(400),
    loadInterFont(600),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#000000",
          padding: "72px",
          fontFamily: "Inter",
        }}
      >
        {/* Marca — mesmo ícone do Header/Footer (LogoMark) + wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="rgb(207,230,78)"
              strokeWidth="1.5"
            />
            <path
              d="M12 3a4.5 4.5 0 0 1 0 9 4.5 4.5 0 0 0 0 9"
              stroke="rgb(207,230,78)"
              strokeWidth="1.5"
            />
          </svg>
          <span
            style={{
              color: "#ffffff",
              fontSize: 30,
              fontWeight: 600,
              letterSpacing: 0.5,
            }}
          >
            MATHEUS FRANCISCO
          </span>
        </div>

        {/* Bloco central — identidade profissional */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span
            style={{
              display: "flex",
              color: "rgb(207,230,78)",
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            Design e Data Analytics
          </span>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 68,
              fontWeight: 600,
              letterSpacing: -2,
              lineHeight: 1.05,
              color: "#ffffff",
              maxWidth: 980,
            }}
          >
            <span style={{ display: "flex" }}>Senior Product Designer</span>
            <span style={{ display: "flex" }}>
              <span style={{ color: "#c4c4c4", marginRight: 20 }}>&amp;</span>
              Data Analyst Associate
            </span>
          </div>
          <span
            style={{
              display: "flex",
              color: "#c4c4c4",
              fontSize: 30,
              lineHeight: 1.3,
              maxWidth: 820,
            }}
          >
            +5 anos no mercado B2B SaaS
          </span>
        </div>

        {/* Rodapé — credibilidade (empresas reais do grid de logos) + domínio */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #222222",
            paddingTop: 32,
          }}
        >
          <span
            style={{
              display: "flex",
              color: "#7a7a7a",
              fontSize: 20,
              fontWeight: 400,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            Zenvia · Thomson Reuters · Pecege · BETC Havas
          </span>
          <span
            style={{
              display: "flex",
              color: "rgb(207,230,78)",
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            mtsilveirapf.com.br
          </span>
        </div>
      </div>
    ),
    {
      ...OG_IMAGE_SIZE,
      fonts: [
        { name: "Inter", data: interRegular, weight: 400, style: "normal" },
        { name: "Inter", data: interSemibold, weight: 600, style: "normal" },
      ],
    }
  );
}
