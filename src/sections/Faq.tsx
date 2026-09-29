import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { RevealLines, FadeUp, ease } from '../components/Motion'
import { Plus, WhatsApp } from '../components/Icons'
import { waLink } from '../config'
import './faq.css'

const faqs = [
  {
    q: '¿Los productos son 100% originales?',
    a: 'Sí. Trabajamos solo con distribuidores autorizados de marcas como Optimum Nutrition, Cellucor, EVL, BSN, Ghost y más. Todos los productos tienen sello de seguridad y fecha de vencimiento vigente.',
  },
  {
    q: '¿Cómo hago un pedido?',
    a: 'Agrega los productos al carrito y toca “Pedir por WhatsApp”: el mensaje se llena solo con tu pedido y el total. También puedes escribirnos directamente o visitarnos en Comendador o La Paz.',
  },
  {
    q: '¿Hacen envíos fuera de Elías Piña?',
    a: 'Sí, enviamos a todo el país. El costo y tiempo de entrega dependen de tu provincia — escríbenos y te lo confirmamos al momento.',
  },
  {
    q: '¿Qué métodos de pago aceptan?',
    a: 'Efectivo en tienda, transferencia bancaria y pago contra entrega en zonas disponibles. Te confirmamos los detalles por WhatsApp.',
  },
  {
    q: 'No sé qué suplemento necesito, ¿me pueden ayudar?',
    a: 'Claro. Cuéntanos tu objetivo (ganar masa, bajar grasa, energía, recuperación) y tu rutina, y te recomendamos lo ideal para tu presupuesto.',
  },
  {
    q: '¿Tienen ofertas o combos?',
    a: 'Cada semana tenemos productos seleccionados con hasta 30% de descuento y combos (proteína + creatina, pre-entreno + shaker). Síguenos en Instagram para no perderte ninguna.',
  },
]

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className="section faq" id="faq">
      <div className="container faq__grid">
        <div className="faq__head">
          <RevealLines className="display h2" lines={['Preguntas', <span className="gold-deep">frecuentes</span>]} />
          <FadeUp delay={0.1}>
            <p>¿Tienes otra duda? Respondemos rápido por WhatsApp.</p>
            <a className="btn btn-dark btn-sm" href={waLink('Hola, tengo una pregunta sobre un suplemento.')} target="_blank" rel="noreferrer">
              <WhatsApp size={18} /> Escríbenos
            </a>
          </FadeUp>
        </div>
        <FadeUp delay={0.1} className="faq__list">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.q} className={`faq__item ${isOpen ? 'is-open' : ''}`}>
                <h3>
                  <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} aria-controls={`faq-${i}`} id={`faq-q-${i}`}>
                    <span>{f.q}</span>
                    <span className="faq__icon"><Plus /></span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p className="faq__a">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </FadeUp>
      </div>
    </section>
  )
}
