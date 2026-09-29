import { motion } from 'framer-motion'
import { RevealLines, FadeUp, staggerChild, staggerParent } from '../components/Motion'
import { Arrow, Clock, Pin, WhatsApp } from '../components/Icons'
import { LogoMark } from '../components/Logo'
import { config, waLink } from '../config'
import './sucursales.css'

export default function Sucursales() {
  const main = config.branches[0]
  return (
    <section className="section sucursales" id="contacto">
      <div className="container">
        <div className="section-head">
          <div>
            <RevealLines className="display h2" lines={['Nuestras', <span className="gold-deep">sucursales</span>]} />
            <p>Visítanos o pide por WhatsApp — te lo tenemos listo.</p>
          </div>
        </div>

        <div className="suc__grid">
          <motion.div className="suc__cards" variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            {config.branches.map((b) => (
              <motion.article key={b.name} variants={staggerChild} className={`suc__card ${b.main ? 'is-main' : ''}`}>
                <div className="suc__card-top">
                  <span className="suc__tag">{b.main ? 'Sucursal principal' : 'Sucursal'}</span>
                  <LogoMark size={44} light={b.main} />
                </div>
                <h3 className="display">{b.name}</h3>
                <p className="suc__region">{b.region}</p>
                <ul className="suc__info">
                  <li><Pin size={18} /> {b.address}</li>
                  {config.hours.map((h) => (
                    <li key={h.days}><Clock size={18} /> {h.days}: {h.time}</li>
                  ))}
                </ul>
                <div className="suc__actions">
                  <a className={`btn btn-sm ${b.main ? 'btn-gold' : 'btn-dark'}`} href={waLink(`Hola, quiero información de la sucursal de ${b.name}.`)} target="_blank" rel="noreferrer">
                    <WhatsApp size={18} /> Escribir
                  </a>
                  {b.mapLink !== '#' && (
                    <a className="suc__link" href={b.mapLink} target="_blank" rel="noreferrer">Cómo llegar <Arrow size={16} /></a>
                  )}
                </div>
              </motion.article>
            ))}
          </motion.div>

          <FadeUp delay={0.15} className="suc__map">
            <iframe
              title={`Mapa de Mercaditofit ${main.name}`}
              src={main.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <span className="suc__map-label"><Pin size={16} /> {main.name}, {main.region}</span>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
