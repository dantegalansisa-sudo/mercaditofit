import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Logo from './Logo'
import { Cart, Close, Menu, Search, WhatsApp, Instagram } from './Icons'
import { useCart } from '../context/CartContext'
import { config, waLink } from '../config'
import { Magnetic } from './Motion'
import './navbar.css'

const links = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#productos', label: 'Productos' },
  { href: '#categorias', label: 'Categorías' },
  { href: '#ofertas', label: 'Ofertas' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Navbar({ onSearch }: { onSearch: (q: string) => void }) {
  const { count, setOpen } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  const [active, setActive] = useState('#inicio')
  const [q, setQ] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1))
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive('#' + e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : ''
  }, [menu])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(q.trim())
    setMenu(false)
    document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' })
  }

  const cartBtn = (
    <button className="nav__cart" onClick={() => setOpen(true)} aria-label={`Abrir carrito (${count} productos)`}>
      <Cart />
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={count}
            className="nav__badge"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <Logo />
        <nav className="nav__links" aria-label="Principal">
          {links.map((l) => (
            <a key={l.href} href={l.href} className={active === l.href ? 'is-active' : ''}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="nav__actions">
          <form className="nav__search" onSubmit={submit} role="search">
            <label htmlFor="nav-search" className="sr-only">Buscar suplementos</label>
            <input
              id="nav-search"
              type="search"
              placeholder="Buscar suplementos..."
              value={q}
              onChange={(e) => {
                setQ(e.target.value)
                onSearch(e.target.value.trim())
              }}
            />
            <button type="submit" aria-label="Buscar"><Search /></button>
          </form>
          {cartBtn}
          <Magnetic>
            <a className="btn btn-gold btn-sm nav__wa" href={waLink('Hola Mercaditofit, quiero información sobre sus suplementos.')} target="_blank" rel="noreferrer">
              <WhatsApp /> Comprar por WhatsApp
            </a>
          </Magnetic>
          <button className="nav__burger" onClick={() => setMenu(true)} aria-label="Abrir menú"><Menu /></button>
        </div>
      </div>

      <AnimatePresence>
        {menu && (
          <motion.div
            className="mnav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mnav__top">
              <Logo light onClick={() => setMenu(false)} />
              <button onClick={() => setMenu(false)} aria-label="Cerrar menú"><Close size={28} /></button>
            </div>
            <form className="nav__search mnav__search" onSubmit={submit} role="search">
              <input type="search" placeholder="Buscar suplementos..." value={q} onChange={(e) => setQ(e.target.value)} aria-label="Buscar suplementos" />
              <button type="submit" aria-label="Buscar"><Search /></button>
            </form>
            <nav className="mnav__links">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenu(false)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                  className="display"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <div className="mnav__foot">
              <a className="btn btn-gold" href={config.whatsapp} target="_blank" rel="noreferrer"><WhatsApp /> Comprar por WhatsApp</a>
              <a className="mnav__ig" href={config.instagram} target="_blank" rel="noreferrer"><Instagram /> {config.instagramHandle}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
