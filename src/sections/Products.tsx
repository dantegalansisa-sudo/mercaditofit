import { forwardRef, useMemo, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { FadeUp, RevealLines, ease } from '../components/Motion'
import { Cart, Chevron, Flame, Heart, Star, WhatsApp } from '../components/Icons'
import ProductImage from '../components/ProductImage'
import { categories, products, type Category, type Product } from '../data/products'
import { useCart } from '../context/CartContext'
import { formatRD, waLink } from '../config'
import './products.css'

export type Filter = Category | 'Todos' | 'Populares'

const ProductCard = forwardRef<HTMLElement, { p: Product }>(function ProductCard({ p }, ref) {
  const { add } = useCart()
  const [fav, setFav] = useState(false)
  return (
    <motion.article
      ref={ref}
      layout
      className="pcard"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, ease }}
    >
      {p.badge && <span className={`pcard__badge ${p.badge === 'Nuevo' ? 'is-new' : ''}`}>{p.badge}</span>}
      <button className={`pcard__fav ${fav ? 'is-on' : ''}`} onClick={() => setFav(!fav)} aria-label={fav ? 'Quitar de favoritos' : 'Agregar a favoritos'} aria-pressed={fav}>
        <Heart />
      </button>
      <div className="pcard__img"><ProductImage product={p} /></div>
      <div className="pcard__body">
        <p className="pcard__brand">{p.brand}</p>
        <h3 className="pcard__name">{p.name}</h3>
        <div className="pcard__row">
          <div>
            <p className="pcard__price">{formatRD(p.price)}</p>
            <span className="stars" aria-label={`${p.rating} de 5 estrellas`}>
              {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={13} filled className={i > p.rating ? 'off' : ''} />)}
            </span>
          </div>
          <a
            className="pcard__wa"
            href={waLink(`Hola, quiero pedir: ${p.brand} ${p.name}`)}
            target="_blank"
            rel="noreferrer"
            aria-label={`Pedir ${p.name} por WhatsApp`}
            title="Pedir por WhatsApp"
          >
            <WhatsApp size={19} />
          </a>
        </div>
        <button className="pcard__add" onClick={() => add(p.id)}>
          <Cart size={18} /> Agregar
        </button>
      </div>
    </motion.article>
  )
})

export default function Products({ filter, setFilter, query }: { filter: Filter; setFilter: (f: Filter) => void; query: string }) {
  const tabs: Filter[] = ['Populares', 'Todos', ...categories]
  const list = useMemo(() => {
    const q = query.toLowerCase()
    if (q) return products.filter((p) => `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(q))
    if (filter === 'Populares') return products.filter((p) => p.popular)
    if (filter === 'Todos') return products
    return products.filter((p) => p.category === filter)
  }, [filter, query])

  return (
    <section className="section products" id="productos">
      <div className="container">
        <div className="section-head">
          <div className="products__title">
            <Flame className="products__flame" />
            <div>
              <RevealLines className="display h2" lines={[query ? `Resultados: “${query}”` : 'Productos más populares']} />
              <p>Lo que más eligen nuestros clientes.</p>
            </div>
          </div>
          <FadeUp>
            <button className="btn btn-outline btn-sm products__all" onClick={() => setFilter('Todos')}>
              Ver todos <Chevron size={16} />
            </button>
          </FadeUp>
        </div>

        {!query && (
          <LayoutGroup>
            <div className="tabs" role="tablist" aria-label="Filtrar por categoría">
              {tabs.map((t) => (
                <button key={t} role="tab" aria-selected={filter === t} className={`tab ${filter === t ? 'is-active' : ''}`} onClick={() => setFilter(t)}>
                  {filter === t && <motion.span layoutId="tab-pill" className="tab__pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                  <span>{t}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>
        )}

        <motion.div layout className="pgrid">
          <AnimatePresence mode="popLayout">
            {list.map((p) => <ProductCard key={p.id} p={p} />)}
          </AnimatePresence>
        </motion.div>
        {list.length === 0 && (
          <p className="products__empty">
            No encontramos ese producto. <a href={waLink(`Hola, ¿tienen ${query}?`)} target="_blank" rel="noreferrer">Pregúntanos por WhatsApp</a> — lo conseguimos.
          </p>
        )}
      </div>
    </section>
  )
}
