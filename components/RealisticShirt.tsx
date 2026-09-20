const BODY_PATH =
  "M60,14 C68,6 92,4 100,4 C108,4 132,6 140,14 L146,40 L146,208 C146,215 142,218 134,218 L66,218 C58,218 54,215 54,208 L54,40 Z";
const LEFT_SLEEVE_PATH =
  "M60,14 C40,18 18,26 8,42 C4,50 12,58 22,54 C32,50 42,44 54,40 L60,14 Z";
const RIGHT_SLEEVE_PATH =
  "M140,14 C160,18 182,26 192,42 C196,50 188,58 178,54 C168,50 158,44 146,40 L140,14 Z";
const HEM_PATH = "M58,205 C80,210 120,210 142,205";

type Props = {
  year: number;
  color?: string;
  /** Color de las mangas, si difiere del torso (p.ej. blanca con mangas azul marino). */
  sleeveColor?: string;
  image?: string;
  /** El vestidor renderiza 20+ camisetas a la vez; solo la seleccionada merece el coste de las capas de tela animadas. */
  rich?: boolean;
  className?: string;
};

function Fill({ image, color }: { image?: string; color: string }) {
  return image ? (
    <image href={image} x="0" y="0" width="200" height="220" preserveAspectRatio="xMidYMid slice" />
  ) : (
    <rect x="0" y="0" width="200" height="220" fill={color} />
  );
}

export function RealisticShirt({ year, color, sleeveColor, image, rich = false, className }: Props) {
  const bodyFill = color ?? "#3f3f46";
  const sleeveFill = sleeveColor ?? bodyFill;
  const uid = `shirt-${year}`;

  return (
    <svg viewBox="0 0 200 220" className={className} role="img" aria-label={`Camiseta ${year}`}>
      <defs>
        <clipPath id={`${uid}-body`}>
          <path d={BODY_PATH} />
        </clipPath>
        <clipPath id={`${uid}-left`}>
          <path d={LEFT_SLEEVE_PATH} />
        </clipPath>
        <clipPath id={`${uid}-right`}>
          <path d={RIGHT_SLEEVE_PATH} />
        </clipPath>
        {/* luz direccional: siempre presente, incluso en el burro, para que no se vea plano */}
        <linearGradient id={`${uid}-light`} x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.32" />
          <stop offset="35%" stopColor="white" stopOpacity="0.05" />
          <stop offset="70%" stopColor="black" stopOpacity="0.1" />
          <stop offset="100%" stopColor="black" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id={`${uid}-sheen`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="45%" stopColor="white" stopOpacity="0.22" />
          <stop offset="60%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${uid}-crease`} cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="black" stopOpacity="0.32" />
          <stop offset="100%" stopColor="black" stopOpacity="0" />
        </radialGradient>
        {rich && (
          <filter id={`${uid}-weave`} x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={year % 30} result="n" />
            <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.5 0" />
          </filter>
        )}
      </defs>

      <g clipPath={`url(#${uid}-body)`} className={rich ? "shirt-fabric shirt-fold" : undefined}>
        <Fill image={image} color={bodyFill} />
        <rect x="0" y="0" width="200" height="220" fill={`url(#${uid}-light)`} style={{ mixBlendMode: "overlay" }} />
        {rich && (
          <>
            <rect x="0" y="0" width="200" height="220" filter={`url(#${uid}-weave)`} opacity="0.14" style={{ mixBlendMode: "multiply" }} />
            <rect x="0" y="0" width="200" height="220" fill={`url(#${uid}-crease)`} style={{ mixBlendMode: "multiply" }} />
            <rect x="-60" y="0" width="140" height="220" fill={`url(#${uid}-sheen)`} className="shirt-sheen" style={{ mixBlendMode: "overlay" }} />
          </>
        )}
      </g>

      {(["left", "right"] as const).map((side) => (
        <g key={side} clipPath={`url(#${uid}-${side})`} className={rich ? `shirt-fabric shirt-sleeve-${side}` : undefined}>
          <Fill image={image} color={sleeveFill} />
          <rect x="0" y="0" width="200" height="220" fill={`url(#${uid}-light)`} style={{ mixBlendMode: "overlay" }} />
          {rich && (
            <rect x="0" y="0" width="200" height="220" filter={`url(#${uid}-weave)`} opacity="0.14" style={{ mixBlendMode: "multiply" }} />
          )}
        </g>
      ))}

      {/* cuello con volumen: banda del cuello + hueco interior */}
      <ellipse cx="100" cy="15" rx="19" ry="7" fill={bodyFill} opacity="0.9" />
      <ellipse cx="100" cy="15.5" rx="14" ry="5.2" fill="black" opacity="0.4" />
      <ellipse cx="100" cy="14.5" rx="14" ry="5.2" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />

      {rich && <path d={HEM_PATH} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeLinecap="round" />}
    </svg>
  );
}
