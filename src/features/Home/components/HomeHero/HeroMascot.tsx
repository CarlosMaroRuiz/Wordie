/**
 * «Pingo» — El Pingüino Cosmopolita (estilo Duolingo, v2).
 * - Silueta ancha y redonda (cabeza grande fundida con el cuerpo).
 * - Cara blanca en forma de corazón unida a la panza.
 * - Ojos grandes, pico de dos partes, mejillas.
 * - Aleta derecha saludando; aleta izquierda agarrando la maleta.
 * - Auriculares (Listening), corbata (Trabajo), maleta (Viajes).
 */
export function HeroMascot({ className = 'size-32 sm:size-40' }: { className?: string }) {
  const BODY = '#211E2B'
  const FLIPPER_EDGE = '#3A3552'
  const BEAK = '#FFB020'
  const BEAK_DARK = '#F58A07'

  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient
          id="pingo-halo"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(100 105) rotate(90) scale(90)"
        >
          <stop stopColor="var(--color-primary-light)" stopOpacity="0.95" />
          <stop offset="1" stopColor="var(--color-primary-light)" stopOpacity="0" />
        </radialGradient>
        <filter id="pingo-shadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#2B2740" floodOpacity="0.14" />
        </filter>
      </defs>

      {/* 1. Aura */}
      <circle cx="100" cy="105" r="84" fill="url(#pingo-halo)" />

      {/* 2. Maletita (detrás de la aleta que la agarra) */}
      <g filter="url(#pingo-shadow)">
        <path
          d="M22 148 C22 132 38 132 38 148"
          stroke="#92400E"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <rect x="12" y="146" width="34" height="28" rx="7" fill={BEAK} />
        <rect x="12" y="156" width="34" height="5" fill="var(--color-primary)" />
        <rect x="26" y="155" width="7" height="7" rx="2" fill="#FDE68A" />
      </g>

      {/* 3. Cuerpo ancho y redondo */}
      <path
        d="M42 116 C42 66 68 36 100 36 C132 36 158 66 158 116 C158 154 134 170 100 170 C66 170 42 154 42 116 Z"
        fill={BODY}
        filter="url(#pingo-shadow)"
      />

      {/* 4. Panza */}
      <path
        d="M100 96 C72 96 56 118 56 138 C56 156 74 165 100 165 C126 165 144 156 144 138 C144 118 128 96 100 96 Z"
        fill="#FFFFFF"
      />

      {/* 5. Cara blanca en corazón */}
      <path
        d="M100 72 C93 54 62 56 60 82 C58 104 76 118 100 118 C124 118 142 104 140 82 C138 56 107 54 100 72 Z"
        fill="#FFFFFF"
      />

      {/* 6. Patas (al frente, asomando bajo el cuerpo) */}
      <g fill={BEAK_DARK}>
        <path d="M58 172 C58 165 66 164 74 165 C84 164 92 167 92 173 C92 180 84 182 74 182 C64 182 58 180 58 172 Z" />
        <path d="M108 173 C108 167 116 164 126 165 C134 164 142 165 142 172 C142 180 136 182 126 182 C116 182 108 180 108 173 Z" />
      </g>
      <g stroke="#C46A00" strokeWidth="2" strokeLinecap="round" opacity="0.55">
        <path d="M68 173 L66 179" />
        <path d="M76 174 L75 181" />
        <path d="M84 173 L84 179" />
        <path d="M116 173 L116 179" />
        <path d="M124 174 L125 181" />
        <path d="M132 173 L134 179" />
      </g>

      {/* 7. Aleta izquierda: agarra el asa de la maleta */}
      <path d="M48 100 C32 106 22 122 28 139 C37 146 50 134 54 118 Z" fill={BODY} filter="url(#pingo-shadow)" />
      <path d="M48 100 C32 106 22 122 28 139 C37 146 50 134 54 118" stroke={FLIPPER_EDGE} strokeWidth="1.5" strokeLinecap="round" />

      {/* 8. Aleta derecha: saludando */}
      <path d="M152 102 C166 80 186 72 192 86 C195 104 174 124 154 118 Z" fill={BODY} filter="url(#pingo-shadow)" />
      <path d="M152 102 C166 80 186 72 192 86 C195 104 174 124 154 118" stroke={FLIPPER_EDGE} strokeWidth="1.5" strokeLinecap="round" />

      {/* 9. Corbata */}
      <polygon points="95,119 105,119 103,126 97,126" fill="var(--color-primary-dark, #4345C7)" />
      <polygon points="97,126 103,126 108,146 100,152 92,146" fill="var(--color-primary)" />

      {/* 10. Ojos grandes con doble brillo */}
      <ellipse cx="84" cy="82" rx="9" ry="10.5" fill={BODY} />
      <circle cx="81" cy="78" r="3.8" fill="#FFFFFF" />
      <circle cx="87" cy="85.5" r="1.6" fill="#FFFFFF" />

      <ellipse cx="116" cy="82" rx="9" ry="10.5" fill={BODY} />
      <circle cx="113" cy="78" r="3.8" fill="#FFFFFF" />
      <circle cx="119" cy="85.5" r="1.6" fill="#FFFFFF" />

      {/* 11. Mejillas */}
      <ellipse cx="67" cy="100" rx="6.5" ry="4.2" fill="#FF8B8B" opacity="0.6" />
      <ellipse cx="133" cy="100" rx="6.5" ry="4.2" fill="#FF8B8B" opacity="0.6" />

      {/* 12. Pico: mandíbula inferior + pico superior */}
      <path d="M91 101 C91 110 95 116 100 116 C105 116 109 110 109 101 Z" fill={BEAK_DARK} />
      <path
        d="M84 93 C84 86 116 86 116 93 C116 103 108 108 100 108 C92 108 84 103 84 93 Z"
        fill={BEAK}
      />
      <path
        d="M91 91 C96 89 104 89 109 91"
        stroke="#FFE08A"
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* 13. Auriculares */}
      <path
        d="M50 80 C50 28 150 28 150 80"
        stroke="var(--color-primary)"
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      <rect x="43" y="66" width="13" height="24" rx="6.5" fill="var(--color-primary)" />
      <rect x="46" y="70" width="4" height="16" rx="2" fill="#FFFFFF" opacity="0.45" />
      <rect x="144" y="66" width="13" height="24" rx="6.5" fill="var(--color-primary)" />
      <rect x="150" y="70" width="4" height="16" rx="2" fill="#FFFFFF" opacity="0.45" />

      {/* 14. Chispas */}
      <path
        d="M168 38 L170 44 L176 46 L170 48 L168 54 L166 48 L160 46 L166 44 Z"
        fill="var(--color-warning, #F59E0B)"
      />
      <circle cx="30" cy="64" r="2.5" fill="var(--color-primary)" opacity="0.75" />
      <circle cx="176" cy="140" r="2" fill="var(--color-success, #317E28)" opacity="0.85" />
    </svg>
  )
}