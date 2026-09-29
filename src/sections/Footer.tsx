import { FadeUp, Magnetic, RevealLines } from '../components/Motion'
import { Arrow, Facebook, Instagram, Mail, Shield, TikTok, Truck, User, WhatsApp } from '../components/Icons'
import Logo, { LogoMark } from '../components/Logo'
import { config, waLink } from '../config'
import './footer.css'

export default function Footer() {
  return (
    <>
      <section className="cta" aria-label="Llamado a la acción">
        <div className="container cta__inner">
          <RevealLines className="display cta__title" lines={['¿Listo para llevar', 'tu rendimiento al siguiente nivel?']} />
          <FadeUp delay={0.15}>
            <Magnetic>
              <a className="btn btn-gold" href={waLink('Hola Mercaditofit, estoy listo para mi pedido.')} target="_blank" rel="noreferrer">
                <WhatsApp /> Comprar por WhatsApp <Arrow />
              </a>
            </Magnetic>
          </FadeUp>
          <ul className="cta__perks">
            <li><span><Shield size={22} /></span>Suplementos<br />originales</li>
            <li><span><User size={22} /></span>Asesoría<br />personalizada</li>
            <li><span><Truck size={22} /></span>Envíos a<br />todo el país</li>
          </ul>
          <div className="cta__mark" aria-hidden><LogoMark light size={220} /></div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer__grid">
          <div className="footer__brand">
            <Logo />
            <p>Suplementos de confianza para un estilo de vida mejor.</p>
            <p className="footer__small">{config.branches.map((b) => b.name).join(' · ')}</p>
          </div>
          <nav aria-label="Enlaces">
            <h4>Enlaces</h4>
            <ul className="footer__links">
              <li><a href="#inicio">Inicio</a></li>
              <li><a href="#ofertas">Ofertas</a></li>
              <li><a href="#productos">Productos</a></li>
              <li><a href="#nosotros">Nosotros</a></li>
              <li><a href="#categorias">Categorías</a></li>
              <li><a href="#contacto">Contacto</a></li>
            </ul>
          </nav>
          <div>
            <h4>Síguenos</h4>
            <div className="footer__social">
              <a href={config.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={22} /></a>
              <a href={config.facebook} aria-label="Facebook (próximamente)"><Facebook size={22} /></a>
              <a href={config.tiktok} aria-label="TikTok (próximamente)"><TikTok size={22} /></a>
            </div>
            <a className="footer__mail" href={`mailto:${config.email}`}><Mail size={18} /> {config.email}</a>
          </div>
          <div>
            <h4>Métodos de compra</h4>
            <a className="footer__wa" href={config.whatsapp} target="_blank" rel="noreferrer">
              <span><WhatsApp size={24} /></span>
              <div>
                <strong>Compra por WhatsApp</strong>
                <small>{config.phoneDisplay}</small>
              </div>
            </a>
          </div>
        </div>
        <div className="container footer__bottom">
          <span>© {new Date().getFullYear()} Mercaditofit. Todos los derechos reservados.</span>
          <span>Comendador, Elías Piña · República Dominicana</span>
        </div>
      </footer>
    </>
  )
}
