import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { AnimatedCounter, RevealLines, staggerChild, staggerParent, FadeUp } from '../components/Motion'
import { Layers, Shield, User, WhatsApp } from '../components/Icons'
import './resultados.css'

const stats = [
  { to: 2.5, decimals: 1, suffix: 'K', label: 'Clientes satisfechos' },
  { to: 500, label: 'Productos disponibles' },
  { to: 50, label: 'Marcas originales' },
]

const reasons = [
  { icon: Shield, title: 'Productos originales', text: 'Directo de las mejores marcas' },
  { icon: User, title: 'Asesoría experta', text: 'Te ayudamos a elegir lo ideal' },
  { icon: Layers, title: 'Variedad de marcas', text: 'Todo en un solo lugar' },
  { icon: WhatsApp, title: 'Atención por WhatsApp', text: 'Rápida y personalizada' },
]

export default function Resultados() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-10%', '10%'])

  return (
    <>
      <section className="resultados" id="nosotros" ref={ref}>
        <motion.div className="resultados__bg" style={{ y }} aria-hidden>
          <img src="/images/resultados.webp" alt="" loading="lazy" />
        </motion.div>
        <div className="resultados__panel" aria-hidden />
        <p className="resultados__script" aria-hidden>Disciplina<br />hoy<br />resultados<br />mañana</p>

        <div className="container resultados__inner">
          <RevealLines className="display resultados__title" lines={['Resultados', <span className="gold">reales</span>]} />
          <motion.ul className="resultados__stats" variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            {stats.map((s) => (
              <motion.li key={s.label} variants={staggerChild}>
                <strong><AnimatedCounter to={s.to} prefix="+" suffix={s.suffix} decimals={s.decimals} /></strong>
                <span>{s.label}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      <section className="why" aria-labelledby="why-title">
        <div className="container">
          <FadeUp>
            <h2 id="why-title" className="why__title display"><span className="why__line" aria-hidden />¿Por qué elegir Mercaditofit?</h2>
          </FadeUp>
          <motion.ul className="why__grid" variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            {reasons.map(({ icon: Icon, title, text }) => (
              <motion.li key={title} variants={staggerChild} className="why__item">
                <span className="why__ic"><Icon size={26} /></span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>
    </>
  )
}
