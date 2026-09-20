import type { CSSProperties } from "react";

const MASK_URL = "/mockups/white.png";
const WHITE_SHADING_URL = "/mockups/white.png";
const BLACK_SHADING_URL = "/mockups/black.png";

type Props = {
  year: number;
  color?: string;
  /** Color de las mangas, si difiere del torso (p.ej. blanca con mangas azul marino). */
  sleeveColor?: string;
  image?: string;
  className?: string;
};

const maskStyle: CSSProperties = {
  WebkitMaskImage: `url(${MASK_URL})`,
  maskImage: `url(${MASK_URL})`,
  WebkitMaskSize: "contain",
  maskSize: "contain",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
};

/** Luminancia relativa aproximada, para elegir la plantilla de sombreado (blanca u oscura) más realista. */
function luminance(hex: string): number {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function RealisticShirt({ year, color, sleeveColor, image, className }: Props) {
  const bodyColor = color ?? "#3f3f46";
  const sleeveFill = sleeveColor ?? bodyColor;
  const shadingUrl = luminance(bodyColor) < 0.35 ? BLACK_SHADING_URL : WHITE_SHADING_URL;

  return (
    <div className={`relative ${className ?? ""}`} aria-label={`Camiseta ${year}`} role="img">
      {/* color o foto real, recortado con la silueta de la plantilla */}
      <div
        className="absolute inset-0"
        style={{
          ...maskStyle,
          backgroundImage: image
            ? `url(${image})`
            : `linear-gradient(to right, ${sleeveFill} 0%, ${sleeveFill} 20%, ${bodyColor} 32%, ${bodyColor} 68%, ${sleeveFill} 80%, ${sleeveFill} 100%)`,
          backgroundSize: image ? "cover" : "100% 100%",
          backgroundPosition: "center",
        }}
      />
      {/* pliegues y luz reales de la plantilla, multiplicados encima; en fotos reales ya tienen su propia luz */}
      {!image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={shadingUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-contain"
          style={{ mixBlendMode: "multiply" }}
        />
      )}
    </div>
  );
}
