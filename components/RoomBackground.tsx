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

      {/* cuadro: medalla de carrera enmarcada */}
      <g>
        <rect x="1040" y="70" width="110" height="130" fill="#faf7f0" stroke="#a9895f" strokeWidth="6" />
        <path d="M1078,88 L1095,120 L1112,88 Z" fill="#c0392b" />
        <path d="M1082,88 L1095,124 L1108,88 Z" fill="#a5322a" />
        <circle cx="1095" cy="150" r="26" fill="#e0b64a" stroke="#b8902e" strokeWidth="3" />
        <path
          d="M1095,138 L1099,147 L1109,148 L1101,155 L1104,165 L1095,159 L1086,165 L1089,155 L1081,148 L1091,147 Z"
          fill="#fff2cc"
        />
      </g>

      {/* corcho con dorsal de carrera */}
      <g>
        <rect x="30" y="230" width="90" height="66" rx="3" fill="#c9a877" />
        <g transform="rotate(-4 75 263)">
          <rect x="42" y="245" width="66" height="36" fill="#fbf8f2" stroke="#2b2b2b" strokeWidth="2" />
          <text x="75" y="268" fontSize="16" fontWeight="700" textAnchor="middle" fill="#c0392b" fontFamily="Arial, sans-serif">
            31D
          </text>
        </g>
        <circle cx="75" cy="234" r="2.4" fill="#8a5a2b" />
      </g>

      {/* lámpara colgante */}
      <line x1="600" y1="0" x2="600" y2="55" stroke="#3a3a3a" strokeWidth="3" />
      <path d="M578,55 L622,55 L616,80 L584,80 Z" fill="#3a3a3a" />

      {/* alfombra con carriles de pista */}
      <ellipse cx="600" cy="470" rx="300" ry="34" fill="#a9b79c" opacity="0.45" />
      <ellipse cx="600" cy="466" rx="270" ry="28" fill="#b7c2ad" opacity="0.7" />
      <path d="M340,466 C470,486 730,486 860,466" fill="none" stroke="#e7ecdf" strokeWidth="3" opacity="0.7" />
      <path d="M340,458 C470,478 730,478 860,458" fill="none" stroke="#e7ecdf" strokeWidth="2" opacity="0.5" />

      {/* zapatillas de correr apoyadas junto al burro */}
      <g transform="translate(1080,452) rotate(-6)">
        <path
          d="M0,26 C0,18 7,13 16,11 L54,2 C64,0 73,3 76,10 L78,19 C79,24 76,28 70,28 L6,28 C2,28 0,28 0,26 Z"
          fill="#3f6f8f"
        />
        <path d="M0,26 C10,29 66,29 78,26 L78,29 C66,32 10,32 0,29 Z" fill="#eae4d8" />
        <line x1="30" y1="14" x2="46" y2="7" stroke="#eae4d8" strokeWidth="2" />
        <line x1="34" y1="19" x2="50" y2="12" stroke="#eae4d8" strokeWidth="2" />
      </g>
      <g transform="translate(1128,458) rotate(4)">
        <path
          d="M0,24 C0,17 6,12 15,10 L50,2 C59,0 68,3 70,9 L72,17 C73,22 70,26 65,26 L5,26 C1,26 0,26 0,24 Z"
          fill="#8a5a2b"
        />
        <path d="M0,24 C10,27 60,27 72,24 L72,27 C60,30 10,30 0,27 Z" fill="#eae4d8" />
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
