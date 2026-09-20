export function RoomBackground({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1200 520" preserveAspectRatio="none" className={className} aria-hidden="true">
      {/* pared */}
      <rect x="0" y="0" width="1200" height="360" fill="#eee7da" />
      {/* friso bajo */}
      <rect x="0" y="270" width="1200" height="90" fill="#e3d9c4" />
      <rect x="0" y="356" width="1200" height="6" fill="#cbbe9f" />
      {/* suelo */}
      <rect x="0" y="362" width="1200" height="158" fill="#d3b892" />
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={i} x1={i * 150} y1="362" x2={i * 150} y2="520" stroke="#c1a276" strokeWidth="2" opacity="0.35" />
      ))}

      {/* ventana */}
      <g>
        <rect x="35" y="50" width="145" height="150" rx="4" fill="#a9895f" />
        <rect x="45" y="60" width="125" height="130" fill="#eef4f1" />
        <line x1="107" y1="60" x2="107" y2="190" stroke="#a9895f" strokeWidth="6" />
        <line x1="45" y1="125" x2="170" y2="125" stroke="#a9895f" strokeWidth="6" />
      </g>

      {/* cuadro */}
      <g>
        <rect x="1040" y="70" width="110" height="130" fill="#faf7f0" stroke="#a9895f" strokeWidth="6" />
        <circle cx="1095" cy="135" r="26" fill="#c9d3c4" />
      </g>

      {/* lámpara colgante */}
      <line x1="600" y1="0" x2="600" y2="55" stroke="#3a3a3a" strokeWidth="3" />
      <path d="M578,55 L622,55 L616,80 L584,80 Z" fill="#3a3a3a" />

      {/* alfombra */}
      <ellipse cx="600" cy="470" rx="300" ry="34" fill="#a9b79c" opacity="0.45" />
      <ellipse cx="600" cy="466" rx="270" ry="28" fill="#b7c2ad" opacity="0.7" />

      {/* planta */}
      <g>
        <path d="M1090,430 L1160,430 L1152,490 L1098,490 Z" fill="#bf7a52" />
        <ellipse cx="1125" cy="385" rx="16" ry="50" fill="#6f8f5a" transform="rotate(-18 1125 385)" />
        <ellipse cx="1125" cy="380" rx="14" ry="46" fill="#86a86c" transform="rotate(12 1125 380)" />
        <ellipse cx="1125" cy="378" rx="12" ry="42" fill="#9dbd82" />
      </g>

      {/* burro / percha de tienda: barra que atraviesa toda la habitación */}
      <rect x="0" y="140" width="1200" height="9" rx="4" fill="#3a3a3a" />
      {[190, 1010].map((x) => (
        <g key={x}>
          <circle cx={x} cy="144" r="10" fill="#2b2b2b" />
          <rect x={x - 5} y="144" width="10" height="272" fill="#2b2b2b" />
          <rect x={x - 55} y="410" width="110" height="10" rx="5" fill="#2b2b2b" />
          <circle cx={x - 50} cy="420" r="7" fill="#1c1c1c" />
          <circle cx={x + 50} cy="420" r="7" fill="#1c1c1c" />
        </g>
      ))}
    </svg>
  );
}
