type Props = {
  year: number;
  className?: string;
};

// scripts/bake_shirts.py pregenera cada año (color o foto real) ya recortado a la
// silueta y compuesto sobre el mismo fondo oscuro del panel: un PNG plano y
// totalmente opaco, sin canal alfa. Nada de mask-image ni blend-mode en el
// navegador, que en pruebas (y para quien vio la web) salían con un patrón de
// cuadros roto en vez de la camiseta.
export function RealisticShirt({ year, className }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/shirts-generated/${year}.png`}
      alt={`Camiseta ${year}`}
      className={`object-contain ${className ?? ""}`}
    />
  );
}
