import { motion } from 'framer-motion'
import { WhatsApp } from './Icons'
import { waLink } from '../config'

export default function FloatingWhatsApp() {
  return (
    <motion.a
      className="fab-wa"
      href={waLink('Hola Mercaditofit, quiero información.')}
      target="_blank"
      rel="noreferrer"
      aria-label="Escríbenos por WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      <WhatsApp size={30} />
      <span className="fab-wa__tip">¿Te ayudamos?</span>
    </motion.a>
  )
}
