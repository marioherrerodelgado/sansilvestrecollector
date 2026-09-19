const BODY_PATH =
  "M60,14 C68,6 92,4 100,4 C108,4 132,6 140,14 L146,40 L146,208 C146,215 142,218 134,218 L66,218 C58,218 54,215 54,208 L54,40 Z";
const LEFT_SLEEVE_PATH =
  "M60,14 C40,18 18,26 8,42 C4,50 12,58 22,54 C32,50 42,44 54,40 L60,14 Z";
const RIGHT_SLEEVE_PATH =
  "M140,14 C160,18 182,26 192,42 C196,50 188,58 178,54 C168,50 158,44 146,40 L140,14 Z";
const FULL_PATH = `${BODY_PATH} ${LEFT_SLEEVE_PATH} ${RIGHT_SLEEVE_PATH}`;
const COLLAR_PATH = "M82,11 C90,18 110,18 118,11";
const HEM_PATH = "M58,205 C80,210 120,210 142,205";

type Props = {
  year: number;
  color?: string;
  image?: string;
  /** El vestidor renderiza 20+ camisetas a la vez; solo la seleccionada merece el coste de las capas de tela animadas. */
  rich?: boolean;
  className?: string;
};

export function RealisticShirt({ year, color, image, rich = false, className }: Props) {
  const fill = color ?? "#3f3f46";
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
        <clipPath id={`${uid}-full`}>
          <path d={FULL_PATH} />
        </clipPath>
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

      {!rich ? (
        <g clipPath={`url(#${uid}-full)`}>
          {image ? (
            <image href={image} x="0" y="0" width="200" height="220" preserveAspectRatio="xMidYMid slice" />
          ) : (
            <rect x="0" y="0" width="200" height="220" fill={fill} />
          )}
        </g>
      ) : (
        <>
          <g clipPath={`url(#${uid}-body)`} className="shirt-fabric shirt-fold">
            {image ? (
              <image href={image} x="0" y="0" width="200" height="220" preserveAspectRatio="xMidYMid slice" />
            ) : (
              <rect x="0" y="0" width="200" height="220" fill={fill} />
            )}
            <rect x="0" y="0" width="200" height="220" filter={`url(#${uid}-weave)`} opacity="0.14" style={{ mixBlendMode: "multiply" }} />
            <rect x="0" y="0" width="200" height="220" fill={`url(#${uid}-crease)`} style={{ mixBlendMode: "multiply" }} />
            <rect x="-60" y="0" width="140" height="220" fill={`url(#${uid}-sheen)`} className="shirt-sheen" style={{ mixBlendMode: "overlay" }} />
          </g>

          {(["left", "right"] as const).map((side) => (
            <g key={side} clipPath={`url(#${uid}-${side})`} className={`shirt-fabric shirt-sleeve-${side}`}>
              {image ? (
                <image href={image} x="0" y="0" width="200" height="220" preserveAspectRatio="xMidYMid slice" />
              ) : (
                <rect x="0" y="0" width="200" height="220" fill={fill} />
              )}
              <rect x="0" y="0" width="200" height="220" filter={`url(#${uid}-weave)`} opacity="0.14" style={{ mixBlendMode: "multiply" }} />
            </g>
          ))}

          <path d={COLLAR_PATH} fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="2.5" strokeLinecap="round" />
          <path d={HEM_PATH} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}
