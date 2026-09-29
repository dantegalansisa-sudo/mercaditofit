export function LogoMark({ light, size = 60 }: { light?: boolean; size?: number }) {
  return (
    <svg viewBox="0 0 100 44" width={size} height={size * 0.44} aria-hidden className="logo__mark">
      <g transform="skewX(-14) translate(12 2)">
        <polygon
          fill={light ? '#fdfdfb' : '#111'}
          points="0,40 0,0 14,0 24,18 34,0 48,0 48,40 36,40 36,18 27,33 21,33 12,18 12,40"
        />
        <polygon fill="#fec330" points="52,40 52,0 84,0 84,10 64,10 64,16 80,16 80,26 64,26 64,40" />
      </g>
      <g fill="#fec330" transform="skewX(-14)">
        <rect x="-4" y="30" width="14" height="3" rx="1" />
        <rect x="0" y="36" width="10" height="3" rx="1" />
      </g>
    </svg>
  )
}

export default function Logo({ light, onClick }: { light?: boolean; onClick?: () => void }) {
  return (
    <a href="#inicio" className={`logo ${light ? 'logo--light' : ''}`} aria-label="Mercaditofit — inicio" onClick={onClick}>
      <LogoMark light={light} />
      <span className="logo__word">
        <span>Mercadito</span>
        <span className="gold">Fit</span>
      </span>
    </a>
  )
}
