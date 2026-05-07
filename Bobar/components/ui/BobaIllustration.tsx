interface BobaIllustrationProps {
  color1?: string
  color2?: string
  size?: number
  className?: string
}

export default function BobaIllustration({
  color1 = '#8b5ccc',
  color2 = '#c9a0e8',
  size = 300,
  className = '',
}: BobaIllustrationProps) {
  return (
    <svg
      viewBox="0 0 200 280"
      width={size}
      height={size * 1.4}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'block' }}
    >
      {/* Straw */}
      <rect x="105" y="10" width="14" height="100" rx="7" fill="#e8e8e8" />
      <rect x="108" y="10" width="5" height="100" rx="2.5" fill="white" opacity="0.6" />

      {/* Cup outer */}
      <path d="M40 90 L50 250 Q100 265 150 250 L160 90 Z" fill={color1} />
      {/* Cup liquid */}
      <path d="M43 105 L52 245 Q100 258 148 245 L157 105 Z" fill={color2} opacity="0.85" />

      {/* Pearls with animation */}
      <circle cx="80" cy="200" r="16" fill="rgba(0,0,0,0.5)">
        <animate attributeName="cy" values="200;197;200" dur="2.1s" repeatCount="indefinite" />
      </circle>
      <circle cx="115" cy="215" r="14" fill="rgba(0,0,0,0.5)">
        <animate attributeName="cy" values="215;212;215" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="95" cy="230" r="12" fill="rgba(0,0,0,0.45)">
        <animate attributeName="cy" values="230;228;230" dur="1.9s" repeatCount="indefinite" />
      </circle>
      <circle cx="65" cy="225" r="10" fill="rgba(0,0,0,0.45)">
        <animate attributeName="cy" values="225;222;225" dur="2.3s" repeatCount="indefinite" />
      </circle>
      <circle cx="130" cy="228" r="11" fill="rgba(0,0,0,0.4)">
        <animate attributeName="cy" values="228;226;228" dur="2.7s" repeatCount="indefinite" />
      </circle>

      {/* Foam top */}
      <ellipse cx="100" cy="105" rx="58" ry="18" fill="rgba(255,255,255,0.4)" />
      <ellipse cx="85" cy="103" rx="20" ry="8" fill="rgba(255,255,255,0.35)" />
      <ellipse cx="115" cy="104" rx="15" ry="7" fill="rgba(255,255,255,0.3)" />

      {/* Cup seal */}
      <rect x="36" y="80" width="128" height="18" rx="9" fill="#ddd" />
      <rect x="38" y="82" width="70" height="6" rx="3" fill="rgba(255,255,255,0.5)" />

      {/* Highlight */}
      <path
        d="M60 120 Q65 180 62 220"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}
