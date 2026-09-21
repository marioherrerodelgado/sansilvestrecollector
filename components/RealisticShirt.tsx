import type { CSSProperties } from "react";

const MASK_URL = "/mockups/white.png";

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

export function RealisticShirt({ year, color, sleeveColor, image, className }: Props) {
  const bodyColor = color ?? "#3f3f46";
  const sleeveFill = sleeveColor ?? bodyColor;

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
    </div>
  );
}
