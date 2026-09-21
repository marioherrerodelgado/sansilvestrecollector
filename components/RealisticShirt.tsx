import type { CSSProperties } from "react";

const MASK_URL = "/mockups/white.png";

type Props = {
  year: number;
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

export function RealisticShirt({ year, image, className }: Props) {
  if (image) {
    return (
      <div className={`relative ${className ?? ""}`} aria-label={`Camiseta ${year}`} role="img">
        {/* foto real, recortada con la silueta de la plantilla */}
        <div
          className="absolute inset-0"
          style={{ ...maskStyle, backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
      </div>
    );
  }

  // Sin foto: PNG pregenerado (scripts/bake_shirt_colors.py) con el color multiplicado
  // contra los pliegues/brillos reales de la plantilla, ya recortado a la silueta.
  // Evita blend-mode/opacity/máscaras con alfa gradual en el navegador: en pruebas
  // renderizaban un patrón de cuadros roto en vez de la plantilla.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/shirts-generated/${year}.png`}
      alt={`Camiseta ${year}`}
      className={`object-contain ${className ?? ""}`}
    />
  );
}
