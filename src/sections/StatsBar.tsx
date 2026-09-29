import { motion } from 'framer-motion'
import { AnimatedCounter, staggerChild, staggerParent } from '../components/Motion'
import { Box, Muscle, Star, Trophy } from '../components/Icons'
import './stats.css'

const stats = [
  { icon: Muscle, to: 2.5, decimals: 1, prefix: '+', suffix: 'K', label: 'Clientes satisfechos' },
  { icon: Box, to: 500, prefix: '+', label: 'Productos disponibles' },
  { icon: Star, to: 50, prefix: '+', label: 'Marcas originales' },
  { icon: Trophy, to: 100, suffix: '%', label: 'Enfocados en tu resultado' },
]

export default function StatsBar() {
  return (
    <section className="statsbar" aria-label="Mercaditofit en números">
      <motion.ul className="container statsbar__grid" variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }}>
        {stats.map(({ icon: Icon, label, ...n }) => (
          <motion.li key={label} variants={staggerChild}>
            <Icon size={38} />
            <div>
              <strong className="statsbar__num">
                <AnimatedCounter to={n.to} prefix={n.prefix} suffix={n.suffix} decimals={n.decimals} />
              </strong>
              <span>{label}</span>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  )
}
