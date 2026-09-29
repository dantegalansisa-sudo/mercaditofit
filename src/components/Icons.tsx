import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement> & { size?: number }
const base = (size: number, props: SVGProps<SVGSVGElement>) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.9,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  ...props,
})

export const WhatsApp = ({ size = 20, ...p }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.55-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
  </svg>
)
export const Instagram = ({ size = 20, ...p }: P) => (
  <svg {...base(size, p)}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
)
export const Facebook = ({ size = 20, ...p }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21h2.9Z" />
  </svg>
)
export const TikTok = ({ size = 20, ...p }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M16.6 3h-3v12.2a2.7 2.7 0 1 1-2.7-2.7c.3 0 .5 0 .8.1V9.5a5.8 5.8 0 1 0 4.9 5.7V9a7.2 7.2 0 0 0 4.1 1.3v-3a4.2 4.2 0 0 1-4.1-4.3Z" />
  </svg>
)
export const Arrow = ({ size = 18, className = '', ...p }: P) => (
  <svg {...base(size, p)} className={'arrow ' + className}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)
export const Chevron = ({ size = 18, dir = 'right', ...p }: P & { dir?: 'right' | 'left' | 'down' }) => (
  <svg
    {...base(size, p)}
    style={{ transform: dir === 'left' ? 'rotate(180deg)' : dir === 'down' ? 'rotate(90deg)' : undefined, transition: 'transform .3s' }}
  >
    <path d="M9 6l6 6-6 6" />
  </svg>
)
export const Search = ({ size = 20, ...p }: P) => (
  <svg {...base(size, p)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
)
export const Cart = ({ size = 22, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M3 4h2l2.2 10.2a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.1L20.5 8H6.2" />
    <circle cx="9.5" cy="19.5" r="1.3" />
    <circle cx="17" cy="19.5" r="1.3" />
  </svg>
)
export const Heart = ({ size = 18, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20Z" />
  </svg>
)
export const Truck = ({ size = 26, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M2.5 6.5h11v9h-11zM13.5 9.5h4l3 3v3h-7" />
    <circle cx="6.5" cy="17.5" r="1.8" />
    <circle cx="17" cy="17.5" r="1.8" />
  </svg>
)
export const Shield = ({ size = 26, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.2 7.5 9.5 4.3-1.3 7.5-4.9 7.5-9.5V6L12 3Z" />
    <path d="m8.8 12 2.2 2.2 4.3-4.4" />
  </svg>
)
export const CardIcon = ({ size = 26, ...p }: P) => (
  <svg {...base(size, p)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 9.5h18M7 15h4" />
  </svg>
)
export const Star = ({ size = 26, filled, ...p }: P & { filled?: boolean }) => (
  <svg {...base(size, p)} fill={filled ? 'currentColor' : 'none'} strokeWidth={filled ? 0 : 1.9}>
    <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
  </svg>
)
export const Dumbbell = ({ size = 18, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M6.5 7v10M17.5 7v10M3.5 9.5v5M20.5 9.5v5M6.5 12h11" />
  </svg>
)
export const Flame = ({ size = 26, ...p }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12.5 2.5s.9 3.3-1.6 6.1C8.9 10.8 7 12.5 7 15.4A5 5 0 0 0 12 20.5a5 5 0 0 0 5-5c0-2.3-1.2-3.8-1.2-3.8s-.4 1.9-1.9 2.4c0 0 1.1-3.6-.4-7.1-.8-1.9-1-4.5-1-4.5Z" />
  </svg>
)
export const User = ({ size = 26, ...p }: P) => (
  <svg {...base(size, p)}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4.5 20.5c1.2-3.8 4-5.5 7.5-5.5s6.3 1.7 7.5 5.5" />
  </svg>
)
export const Layers = ({ size = 26, ...p }: P) => (
  <svg {...base(size, p)}>
    <rect x="4" y="11" width="7" height="9" rx="1.2" />
    <rect x="13" y="7" width="7" height="13" rx="1.2" />
    <path d="M7.5 11V6.5a2 2 0 0 1 2-2h3" />
  </svg>
)
export const Pin = ({ size = 20, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
)
export const Clock = ({ size = 20, ...p }: P) => (
  <svg {...base(size, p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)
export const Mail = ({ size = 20, ...p }: P) => (
  <svg {...base(size, p)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 6 8.5 7 8.5-7" />
  </svg>
)
export const Plus = ({ size = 18, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)
export const Minus = ({ size = 18, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M5 12h14" />
  </svg>
)
export const Close = ({ size = 22, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)
export const Menu = ({ size = 24, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </svg>
)
export const Trash = ({ size = 18, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M4 7h16M9 7V4.5h6V7M6.5 7l1 13h9l1-13" />
  </svg>
)
export const Bag = ({ size = 18, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M5 8h14l-1 12H6L5 8Z" />
    <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
  </svg>
)
export const Trophy = ({ size = 26, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M8 4h8v5a4 4 0 0 1-8 0V4ZM8 6H4.5a3 3 0 0 0 3.5 4M16 6h3.5a3 3 0 0 1-3.5 4M12 13v4M8.5 20h7M9.5 17h5" />
  </svg>
)
export const Box = ({ size = 26, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
    <path d="m4 7.5 8 4.5 8-4.5M12 12v9" />
  </svg>
)
export const Muscle = ({ size = 26, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M5 19c-1.2-3.4-1-7.5 1.5-11L8.5 5l3 1-1 3 2 1.5c2.5-1.3 6-.7 7.5 2.5 1 2.4 0 5-2 6H5Z" />
  </svg>
)
