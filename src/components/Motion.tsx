import { motion, useMotionValue, useSpring, useReducedMotion, useInView, animate } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode, type ElementType } from 'react'

export const ease = [0.22, 1, 0.36, 1] as const

/** Revela un titular línea por línea detrás de una máscara. */
export function RevealLines({
  lines,
  as: Tag = 'h2',
  className = '',
  delay = 0,
  onMount = false,
}: {
  lines: ReactNode[]
  as?: ElementType
  className?: string
  delay?: number
  /** Anima al montar (hero) en lugar de al entrar en viewport */
  onMount?: boolean
}) {
  const reduce = useReducedMotion()
  // El observador va en el contenedor (no recortado): las líneas trasladadas
  // dentro de su máscara no intersectan y nunca dispararían por sí solas.
  return (
    <Tag className={className}>
      <motion.span
        style={{ display: 'block' }}
        initial={reduce ? false : 'hidden'}
        {...(onMount ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, margin: '-40px' } })}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.11, delayChildren: delay } } }}
      >
        {lines.map((line, i) => (
          <span key={i} className="reveal-line">
            <motion.span
              style={{ display: 'block' }}
              variants={{ hidden: { y: '115%', skewY: 5 }, show: { y: '0%', skewY: 0, transition: { duration: 0.95, ease } } }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}

export function FadeUp({
  children,
  delay = 0,
  className = '',
  y = 28,
  onMount = false,
}: {
  children: ReactNode
  delay?: number
  className?: string
  y?: number
  onMount?: boolean
}) {
  const reduce = useReducedMotion()
  const target = { opacity: 1, y: 0 }
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      {...(onMount ? { animate: target } : { whileInView: target, viewport: { once: true, margin: '-60px' } })}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

export const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}
export const staggerChild = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

/** Envoltorio magnético: el CTA sigue suavemente al puntero. */
export function Magnetic({ children, strength = 0.28 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 })
  if (reduce) return <div className="magnetic">{children}</div>
  return (
    <motion.div
      ref={ref}
      className="magnetic"
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse' || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * strength)
        y.set((e.clientY - r.top - r.height / 2) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}

/** Contador que anima de 0 al valor al entrar en viewport. */
export function AnimatedCounter({
  to,
  prefix = '',
  suffix = '',
  decimals = 0,
}: {
  to: number
  prefix?: string
  suffix?: string
  decimals?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setVal(to)
      return
    }
    const c = animate(0, to, { duration: 2, ease, onUpdate: setVal })
    return () => c.stop()
  }, [inView, to, reduce])
  return (
    <span ref={ref}>
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  )
}
