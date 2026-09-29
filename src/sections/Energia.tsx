import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { RevealLines, FadeUp, Magnetic } from '../components/Motion'
import { Arrow, Dumbbell } from '../components/Icons'
import './energia.css'

/** Cuenta regresiva hasta el domingo 23:59 (oferta semanal). */
function useCountdown() {
  const target = useRef<number>(0)
  if (!target.current) {
    const d = new Date()
    d.setDate(d.getDate() + ((7 - d.getDay()) % 7))
    d.setHours(23, 59, 59, 0)
    target.current = d.getTime()
  }
  const [left, setLeft] = useState(() => target.current - Date.now())
  useEffect(() => {
    const t = setInterval(() => setLeft(target.current - Date.now()), 1000)
    return () => clearInterval(t)
  }, [])
  const s = Math.max(0, Math.floor(left / 1000))
  return [Math.floor(s / 86400), Math.floor((s % 86400) / 3600), Math.floor((s % 3600) / 60), s % 60]
}

export default function Energia() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-8%', '8%'])
  const [d, h, m, s] = useCountdown()
  const units = [
    [d, 'Días'],
    [h, 'Horas'],
    [m, 'Minutos'],
    [s, 'Segundos'],
  ] as const

  return (
    <section className="energia" id="ofertas" ref={ref}>
      <motion.div className="energia__bg" style={{ y }} aria-hidden>
        <img src="/images/energia.webp" alt="" loading="lazy" />
      </motion.div>
      <div className="energia__wash" aria-hidden />
      <p className="energia__script" aria-hidden>Rendimiento<br />sin límites</p>

      <div className="container energia__inner">
        <div className="energia__copy">
          <FadeUp>
            <span className="eyebrow eyebrow--solid"><Dumbbell /> Oferta especial</span>
          </FadeUp>
          <RevealLines
            className="display energia__title"
            lines={['Más energía', <span className="gold-deep">para tus</span>, 'entrenamientos']}
          />
          <FadeUp delay={0.2}>
            <p className="energia__lead">Hasta <strong>30% de descuento</strong><br />en productos seleccionados.</p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <Magnetic>
              <a href="#productos" className="btn btn-gold btn-sm">Ver ofertas <Arrow /></a>
            </Magnetic>
          </FadeUp>
        </div>

        <FadeUp delay={0.2} className="countdown">
          <p className="countdown__title">Ofertas por tiempo limitado</p>
          <div className="countdown__row" role="timer" aria-live="off">
            {units.map(([v, l], i) => (
              <div key={l} className="countdown__unit">
                <strong>{String(v).padStart(2, '0')}</strong>
                <span>{l}</span>
                {i < 3 && <i aria-hidden>:</i>}
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
