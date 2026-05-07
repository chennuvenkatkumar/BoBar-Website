interface MiniDrinkProps {
  color1: string
  color2: string
  size?: number
  className?: string
}

export default function MiniDrink({ color1, color2, size = 100, className = '' }: MiniDrinkProps) {
  return (
    <svg
      viewBox="0 0 100 140"
      width={size}
      height={size * 1.4}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
      className={className}
    >
      <rect x="52" y="5" width="7" height="45" rx="3.5" fill="#ddd" />
      <path d="M20 45 L25 125 Q50 132 75 125 L80 45 Z" fill={color1} />
      <path d="M22 52 L27 122 Q50 128 73 122 L78 52 Z" fill={color2} opacity="0.85" />
      <circle cx="42" cy="100" r="8" fill="rgba(0,0,0,0.5)" />
      <circle cx="57" cy="110" r="7" fill="rgba(0,0,0,0.5)" />
      <circle cx="48" cy="117" r="6" fill="rgba(0,0,0,0.45)" />
      <circle cx="35" cy="113" r="5" fill="rgba(0,0,0,0.4)" />
      <ellipse cx="50" cy="52" rx="30" ry="9" fill="#ddd" />
      <rect x="18" y="40" width="64" height="10" rx="5" fill="#ccc" />
      <path
        d="M30 60 Q32 90 30 110"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}
