import { useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import CartDrawer from './components/CartDrawer'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import Hero from './sections/Hero'
import StatsBar from './sections/StatsBar'
import Energia from './sections/Energia'
import Products, { type Filter } from './sections/Products'
import Resultados from './sections/Resultados'
import Testimonials from './sections/Testimonials'
import Sucursales from './sections/Sucursales'
import Faq from './sections/Faq'
import Footer from './sections/Footer'

export default function App() {
  const [filter, setFilter] = useState<Filter>('Populares')
  const [query, setQuery] = useState('')

  return (
    <MotionConfig reducedMotion="user">
      <CartProvider>
        <Navbar onSearch={setQuery} />
        <main>
          <Hero category={filter} onCategory={(c) => { setQuery(''); setFilter(c) }} />
          <StatsBar />
          <Energia />
          <Products filter={filter} setFilter={setFilter} query={query} />
          <Resultados />
          <Testimonials />
          <Sucursales />
          <Faq />
        </main>
        <Footer />
        <CartDrawer />
        <FloatingWhatsApp />
      </CartProvider>
    </MotionConfig>
  )
}
