import { useEffect, useRef, useState } from 'react'
import { FadeUp, RevealLines, Magnetic } from '../components/Motion'
import { Arrow, Chevron, Instagram, Star } from '../components/Icons'
import { config } from '../config'
import './testimonials.css'

const reviews = [
  { name: 'Carlos M.', initials: 'CM', text: 'Productos 100% originales y la atención por WhatsApp es excelente. 100% recomendado.' },
  { name: 'María L.', initials: 'ML', text: 'Llegó súper rápido y todo en perfectas condiciones. Definitivamente seguiré comprando.' },
  { name: 'Javier R.', initials: 'JR', text: 'La mejor tienda de suplementos de la zona. Gran variedad de marcas y buenos precios.' },
  { name: 'Ana P.', initials: 'AP', text: 'Me asesoraron con la proteína y la creatina ideal para mi rutina. Se nota la diferencia.' },
  { name: 'Luis F.', initials: 'LF', text: 'En Comendador no había dónde conseguir C4 original. Ahora lo compro siempre aquí.' },
]

/** Mosaico de Instagram: fotos de marca (reemplazar por posts reales cuando estén). */
const igTiles = [
  { src: '/images/instagram/ig-4.webp', pos: '50% 50%' },
  { src: '/images/instagram/ig-1.webp', pos: '42% 40%' },
  { src: '/images/instagram/ig-2.webp', pos: '50% 50%' },
  { src: '/images/resultados.webp', pos: '26% 30%' },
  { src: '/images/instagram/ig-3.webp', pos: '58% 50%' },
  { src: '/images/products/producto-proteina-1.webp', pos: '50% 50%' },
  { src: '/images/energia.webp', pos: '58% 45%' },
]

function useScroller() {
  const ref = useRef<HTMLDivElement>(null)
  const [page, setPage] = useState(0)
  const [pages, setPages] = useState(1)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      setPages(Math.max(1, Math.round(el.scrollWidth / el.clientWidth)))
      setPage(Math.round(el.scrollLeft / el.clientWidth))
    }
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])
  const go = (dir: number) => {
    const el = ref.current
    if (!el) return
    const card = el.firstElementChild as HTMLElement | null
    const step = card ? card.offsetWidth + 20 : el.clientWidth
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
    if (dir > 0 && atEnd) el.scrollTo({ left: 0, behavior: 'smooth' })
    else el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }
  return { ref, page, pages, go }
}

export default function Testimonials() {
  const t = useScroller()
  const ig = useScroller()

  // Auto-avance suave del carrusel de testimonios (se pausa al pasar el mouse)
  const paused = useRef(false)
  const next = useRef(t.go)
  next.current = t.go
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => !paused.current && next.current(1), 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      <section className="testi" id="testimonios">
        <div className="container testi__inner">
          <div className="testi__head">
            <RevealLines className="display testi__title" lines={['Lo que dicen', 'nuestros clientes']} />
            <FadeUp delay={0.15}><p>Tu progreso también<br />nos motiva.</p></FadeUp>
          </div>
          <div className="carousel" onMouseEnter={() => (paused.current = true)} onMouseLeave={() => (paused.current = false)}>
            <button className="round-btn carousel__nav" onClick={() => t.go(-1)} aria-label="Testimonio anterior"><Chevron dir="left" /></button>
            <div className="carousel__track" ref={t.ref}>
              {reviews.map((r) => (
                <figure key={r.name} className="review">
                  <span className="review__avatar" aria-hidden>{r.initials}</span>
                  <div>
                    <figcaption>{r.name}</figcaption>
                    <span className="stars" aria-label="5 estrellas">{[0, 1, 2, 3, 4].map((i) => <Star key={i} size={14} filled />)}</span>
                    <blockquote>“{r.text}”</blockquote>
                  </div>
                </figure>
              ))}
            </div>
            <button className="round-btn carousel__nav" onClick={() => t.go(1)} aria-label="Siguiente testimonio"><Chevron /></button>
            <div className="dots" aria-hidden>
              {Array.from({ length: t.pages }).map((_, i) => <span key={i} className={i === t.page ? 'is-on' : ''} />)}
            </div>
          </div>
        </div>
      </section>

      <section className="ig" aria-labelledby="ig-title">
        <div className="container ig__inner">
          <div className="ig__head">
            <RevealLines className="display testi__title" lines={['Síguenos en', 'Instagram']} />
            <p>Entrenamiento, tips, novedades<br />y más contenido.</p>
            <Magnetic>
              <a className="btn btn-gold btn-sm" href={config.instagram} target="_blank" rel="noreferrer">
                <Instagram size={18} /> {config.instagramHandle} <Arrow />
              </a>
            </Magnetic>
          </div>
          <div className="carousel carousel--ig">
            <button className="round-btn carousel__nav" onClick={() => ig.go(-1)} aria-label="Anterior"><Chevron dir="left" /></button>
            <div className="carousel__track ig__track" ref={ig.ref}>
              {igTiles.map((tile, i) => (
                <a key={i} className="ig__tile" href={config.instagram} target="_blank" rel="noreferrer" aria-label={`Ver publicación ${i + 1} en Instagram`}>
                  <img src={tile.src} alt="" loading="lazy" style={{ objectPosition: tile.pos }} />
                  <span className="ig__icon"><Instagram size={16} /></span>
                </a>
              ))}
            </div>
            <button className="round-btn carousel__nav" onClick={() => ig.go(1)} aria-label="Siguiente"><Chevron /></button>
          </div>
        </div>
      </section>
    </>
  )
}
