const BODY_PATH =
  "M72,14 C82,24 90,30 100,30 C110,30 118,24 128,14 L122,42 L126,150 L124,230 C124,237 119,241 112,241 L88,241 C81,241 76,237 76,230 L74,150 L78,42 Z";
const LEFT_SLEEVE_PATH =
  "M72,14 C60,17 50,22 48,32 L42,70 L46,120 C47,132 50,140 52,144 C56,148 60,150 64,150 C70,150 74,144 72,138 L76,88 L78,42 C77,32 75,22 72,14 Z";
const RIGHT_SLEEVE_PATH =
  "M128,14 C140,17 150,22 152,32 L158,70 L154,120 C153,132 150,140 148,144 C144,148 140,150 136,150 C130,150 126,144 128,138 L124,88 L122,42 C123,32 125,22 128,14 Z";
const HEM_PATH = "M76,228 C90,233 110,233 124,228";
const VIEW_W = 200;
const VIEW_H = 250;

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
    <image href={image} x="0" y="0" width={VIEW_W} height={VIEW_H} preserveAspectRatio="xMidYMid slice" />
  ) : (
    <rect x="0" y="0" width={VIEW_W} height={VIEW_H} fill={color} />
  );
}

export function RealisticShirt({ year, color, sleeveColor, image, rich = false, className }: Props) {
  const bodyFill = color ?? "#3f3f46";
  const sleeveFill = sleeveColor ?? bodyFill;
  const uid = `shirt-${year}`;

  return (
    <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className={className} role="img" aria-label={`Camiseta ${year}`}>
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
        <radialGradient id={`${uid}-crease`} cx="50%" cy="30%" r="65%">
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
        <rect x="0" y="0" width={VIEW_W} height={VIEW_H} fill={`url(#${uid}-light)`} style={{ mixBlendMode: "overlay" }} />
        {rich && (
          <>
            <rect x="0" y="0" width={VIEW_W} height={VIEW_H} filter={`url(#${uid}-weave)`} opacity="0.14" style={{ mixBlendMode: "multiply" }} />
            <rect x="0" y="0" width={VIEW_W} height={VIEW_H} fill={`url(#${uid}-crease)`} style={{ mixBlendMode: "multiply" }} />
            <rect x="-60" y="0" width="140" height={VIEW_H} fill={`url(#${uid}-sheen)`} className="shirt-sheen" style={{ mixBlendMode: "overlay" }} />
          </>
        )}
      </g>

      {(["left", "right"] as const).map((side) => (
        <g key={side} clipPath={`url(#${uid}-${side})`} className={rich ? `shirt-fabric shirt-sleeve-${side}` : undefined}>
          <Fill image={image} color={sleeveFill} />
          <rect x="0" y="0" width={VIEW_W} height={VIEW_H} fill={`url(#${uid}-light)`} style={{ mixBlendMode: "overlay" }} />
          {rich && (
            <rect x="0" y="0" width={VIEW_W} height={VIEW_H} filter={`url(#${uid}-weave)`} opacity="0.14" style={{ mixBlendMode: "multiply" }} />
          )}
        </g>
      ))}

      {/* cuello con volumen: banda del cuello + hueco interior */}
      <ellipse cx="100" cy="16" rx="17" ry="6.5" fill={bodyFill} opacity="0.9" />
      <ellipse cx="100" cy="16.5" rx="12.5" ry="4.8" fill="black" opacity="0.4" />
      <ellipse cx="100" cy="15.5" rx="12.5" ry="4.8" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />

      {rich && <path d={HEM_PATH} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeLinecap="round" />}
    </svg>
  );
}
