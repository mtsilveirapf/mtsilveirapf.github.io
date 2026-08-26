import { renderOgImage, OG_IMAGE_SIZE, OG_IMAGE_ALT } from "@/lib/og-image";

export const dynamic = "force-static";
export const size = OG_IMAGE_SIZE;
export const alt = OG_IMAGE_ALT;
export const contentType = "image/png";

export default function TwitterImage() {
  return renderOgImage();
}
