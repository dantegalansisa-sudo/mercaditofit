import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { formatRD } from '../config'
import { Bag, Close, Minus, Plus, Trash, WhatsApp } from './Icons'
import ProductImage from './ProductImage'
import { ease } from './Motion'
import './cart.css'

export default function CartDrawer() {
  const { open, setOpen, lines, count, total, inc, dec, remove, clear, orderLink } = useCart()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, setOpen])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="drawer__overlay" onClick={() => setOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.aside
            className="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Carrito de compras"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease }}
          >
            <header className="drawer__head">
              <h2 className="display">Tu pedido <span>({count})</span></h2>
              <button onClick={() => setOpen(false)} aria-label="Cerrar carrito" className="round-btn"><Close size={20} /></button>
            </header>

            {lines.length === 0 ? (
              <div className="drawer__empty">
                <span><Bag size={34} /></span>
                <p>Tu carrito está vacío.</p>
                <a href="#productos" className="btn btn-dark btn-sm" onClick={() => setOpen(false)}>Ver productos</a>
              </div>
            ) : (
              <>
                <ul className="drawer__list">
                  <AnimatePresence initial={false}>
                    {lines.map(({ product: p, qty }) => (
                      <motion.li key={p.id} layout initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30, height: 0 }} className="drawer__line">
                        <div className="drawer__img"><ProductImage product={p} compact /></div>
                        <div className="drawer__info">
                          <p className="drawer__brand">{p.brand}</p>
                          <p className="drawer__name">{p.name}</p>
                          <div className="qty">
                            <button onClick={() => dec(p.id)} aria-label={`Quitar uno de ${p.name}`}><Minus size={16} /></button>
                            <span aria-live="polite">{qty}</span>
                            <button onClick={() => inc(p.id)} aria-label={`Agregar uno de ${p.name}`}><Plus size={16} /></button>
                          </div>
                        </div>
                        <div className="drawer__right">
                          <strong>{formatRD(p.price * qty)}</strong>
                          <button onClick={() => remove(p.id)} aria-label={`Eliminar ${p.name}`} className="drawer__trash"><Trash /></button>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
                <footer className="drawer__foot">
                  <div className="drawer__total">
                    <span>Total</span>
                    <strong>{formatRD(total)}</strong>
                  </div>
                  <p className="drawer__note">Confirmamos disponibilidad, envío y pago por WhatsApp.</p>
                  <a className="btn btn-gold drawer__cta" href={orderLink()} target="_blank" rel="noreferrer">
                    <WhatsApp /> Pedir por WhatsApp
                  </a>
                  <button className="drawer__clear" onClick={clear}>Vaciar carrito</button>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
