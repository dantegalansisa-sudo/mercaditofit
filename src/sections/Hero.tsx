import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { RevealLines, FadeUp, Magnetic } from '../components/Motion'
import { Arrow, Chevron, Dumbbell, Shield, Star, Truck, WhatsApp, CardIcon } from '../components/Icons'
import ProductImage from '../components/ProductImage'
import { categories, products, type Category } from '../data/products'
import { waLink } from '../config'
import './hero.css'

const perks = [
  { icon: Truck, text: ['Envíos a', 'todo el país'] },
  { icon: Shield, text: ['Productos', '100% originales'] },
  { icon: CardIcon, text: ['Asesoría', 'personalizada'] },
  { icon: Star, text: ['Las mejores', 'marcas del mercado'] },
]

const avatars = ['CM', 'ML', 'JR', 'AP']

export default function Hero({ category, onCategory }: { category: string; onCategory: (c: Category) => void }) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.04, reduce ? 1.04 : 1.14])
  const scriptY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-60%'])

  const pick = (c: Category) => {
    onCategory(c)
    document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" id="inicio" ref={ref}>
      <motion.div className="hero__bg" style={{ y: bgY, scale: bgScale }} aria-hidden>
        <img src="/images/hero.webp" alt="" {...{ fetchpriority: 'high' }} />
      </motion.div>
      <div className="hero__wash" aria-hidden />
      <motion.p className="hero__script" style={{ y: scriptY }} aria-hidden>
        Disciplina<br />Nutrición<br />Resultados
      </motion.p>

      <div className="container hero__inner">
        <div className="hero__copy">
          <div className="hero__top">
            <FadeUp onMount>
              <a href="#productos" className="eyebrow">
                <Dumbbell /> Suplementos originales <Chevron size={14} />
              </a>
            </FadeUp>
            <FadeUp onMount delay={0.5} className="hero__aside">
              <p>Más que<br />suplementos,<br />es un<br />estilo<br />de vida</p>
            </FadeUp>
          </div>

          <RevealLines
            as="h1"
            onMount
            delay={0.1}
            className="display hero__title"
            lines={['Tu mejor', <span className="gold">Versión</span>, 'Empieza aquí']}
          />

          <FadeUp onMount delay={0.45}>
            <p className="hero__lead">Suplementos de confianza para más energía, más fuerza y mejores resultados.</p>
          </FadeUp>

          <FadeUp onMount delay={0.55} className="hero__ctas">
            <Magnetic>
              <a className="btn btn-gold" href={waLink('Hola Mercaditofit, quiero comprar suplementos.')} target="_blank" rel="noreferrer">
                <WhatsApp /> Comprar por WhatsApp <Arrow />
              </a>
            </Magnetic>
            <Magnetic>
              <a className="btn btn-outline" href="#productos">Ver productos <Arrow /></a>
            </Magnetic>
          </FadeUp>

          <FadeUp onMount delay={0.7}>
            <ul className="hero__perks">
              {perks.map(({ icon: Icon, text }) => (
                <li key={text[0]}>
                  <span className="hero__perk-ic"><Icon size={24} /></span>
                  <span>{text[0]}<br />{text[1]}</span>
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </div>

      <div className="container hero__bottom" id="categorias">
        <FadeUp onMount delay={0.85} className="hero__cats-wrap">
          <ul className="hero__cats" aria-label="Categorías">
            {categories.map((c) => {
              const p = products.find((x) => x.category === c)!
              return (
                <li key={c}>
                  <button className={`hero__cat ${category === c ? 'is-active' : ''}`} onClick={() => pick(c)} aria-pressed={category === c}>
                    <span className="hero__cat-img"><ProductImage product={p} compact /></span>
                    <span>{c}</span>
                  </button>
                </li>
              )
            })}
          </ul>
          <a href="#productos" className="round-btn hero__cats-more" aria-label="Ver todos los productos"><Chevron /></a>
        </FadeUp>

        <FadeUp onMount delay={0.95} className="hero__clients">
          <div className="avatars" aria-hidden>
            {avatars.map((a, i) => (
              <span key={a} style={{ zIndex: 5 - i }}>{a}</span>
            ))}
          </div>
          <div>
            <strong>+2.5K</strong>
            <span>Clientes satisfechos</span>
            <span className="stars">{[0, 1, 2, 3, 4].map((i) => <Star key={i} size={16} filled />)}</span>
          </div>
          <a href="#testimonios" className="round-btn" aria-label="Ver testimonios"><Chevron /></a>
        </FadeUp>
      </div>
    </section>
  )
}
