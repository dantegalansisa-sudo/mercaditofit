# Mercaditofit — Web demo

Landing + catálogo de **Mercaditofit**, tienda de suplementos y nutrición deportiva en
**Comendador, Elías Piña** (Av. 27 de Febrero) y **La Paz**. Pedidos por WhatsApp.

- Repo: https://github.com/dantegalansisa-sudo/mercaditofit
- WhatsApp: +1 (829) 533-3008 · Instagram: @mercaditofit_1
- Mockups de referencia en `/design/` (no se publican): `heros.png` (hero), `web completa.png` (página completa).
  `heros-duplicado.png` = copia idéntica (mismo hash) de `heros.png`. Fotos originales en `/design/originales/`.

## Stack
React 18 + TypeScript + Vite 5 + Framer Motion 11 + CSS vanilla (sin Tailwind).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc --noEmit && vite build
npm run images   # convierte fotos nuevas del root → public/images/products/*.webp
```

## Estructura
```
src/
  config.ts              datos del negocio (WhatsApp, IG, sucursales, horarios) + waLink() + formatRD()
  data/products.ts       catálogo (nombre, marca, categoría, precio RD$, archivo, badge, popular)
  context/CartContext    carrito (localStorage) + mensaje de pedido para WhatsApp
  components/            Navbar, Logo (SVG MF), Icons, Motion (RevealLines, FadeUp, Magnetic,
                         AnimatedCounter), ProductImage (foto o placeholder), CartDrawer, FloatingWhatsApp
  sections/              Hero, StatsBar, Energia (oferta + countdown), Products (tabs + cards),
                         Resultados (+ ¿Por qué elegir?), Testimonials (+ Instagram), Sucursales (mapa),
                         Faq, Footer (+ CTA)
  styles/tokens.css      design tokens · styles/global.css base, botones, .display
public/images/           hero.webp, energia.webp, resultados.webp, products/
scripts/convert-images.py
```

Orden de secciones (según `web completa`): Navbar → Hero (categorías + clientes) → Stats → Oferta
"Más energía" → Productos más populares → Resultados reales → ¿Por qué elegir? → Testimonios →
Instagram → Sucursales → FAQ → CTA → Footer.

## Tokens
| Token | Valor | Uso |
|---|---|---|
| `--gold` | `#fec330` | primario (muestreado del mockup) |
| `--gold-light` / `--gold-deep` | `#ffd43a` / `#f5ae00` | gradiente de botones, acentos sobre fondo claro |
| `--ink` | `#111111` | texto, bloques oscuros |
| `--bg` / `--paper` / `--bg-2` | `#fafafa` / `#fffefa` / `#f4f3ef` | fondos |
| `--font-display` | Archivo 900 italic (stretch 106%) | titulares en mayúsculas |
| `--font-body` | Barlow | texto |
| `--font-script` | Permanent Marker | frases decorativas ("Disciplina…") |
| Layout | `--max: 1320px`, `--pad-x: 64px`, `--section-y: 120px` | se reducen en ≤1100px y ≤640px |

## Reglas
- Copy en español. Titulares con clase `.display` (+ `.gold` / `.gold-deep` para la palabra acento).
- Nunca negro puro ni blanco puro; usar tokens.
- Animaciones con los helpers de `components/Motion.tsx`. `MotionConfig reducedMotion="user"` + media query
  global respetan `prefers-reduced-motion`. Sin cursor personalizado.
- `RevealLines`: el observer va en el contenedor (las líneas enmascaradas no intersectan por sí solas).
- Todo enlace de pedido usa `waLink(mensaje)` de `config.ts`.
  - Card "Pedir": `Hola, quiero pedir: [MARCA PRODUCTO]`
  - Carrito: lista `• qty x producto — subtotal` + total.
- Precios RD$ y horarios son **placeholders** hasta confirmar con el cliente.

## Imágenes de productos
Flujo: soltar la foto en la raíz del proyecto → `python scripts/convert-images.py <archivo> <destino.webp>`
(o `npm run images` para convertir todas con nombre slug) → poner `hasImage: true` en `src/data/products.ts`.
El original se mueve a `design/originales/productos/`. Mientras `hasImage` sea `false` se muestra un
placeholder de marca con el nombre de archivo esperado.

### Mapeo actual
| Archivo | Origen (`/design/`) | Uso |
|---|---|---|
| `images/hero.webp` | `originales/foto del heros.png` | Hero |
| `images/energia.webp` | `originales/foto de la seccion as energia…png` | Oferta "Más energía" |
| `images/resultados.webp` | `originales/foto de la seccion resultados reales.png` | Resultados reales |
| `products/producto-proteina-1.webp` | `proteinas.png` | ON Gold Standard Whey |
| `products/producto-proteina-2.webp` | `ghost whey.png` | Ghost Whey |
| `products/producto-proteina-3.webp` | `bsn syntha.png` | BSN Syntha-6 |
| `products/producto-creatina-1.webp` | `evl creatine.png` | EVL Creatine 1000 |
| `products/producto-creatina-2.webp` | `creatina.png` | Nutrex Creatine Monohydrate |
| `products/producto-preentreno-1.webp` | `pre entreno.png` | Cellucor C4 |
| `products/producto-aminoacidos-1.webp` | `aminoacido.png` | ON Essential Amino Energy |
| `products/producto-quemador-1.webp` | `quemadores.png` | DMoose Fat Burner |
| `products/producto-vitaminas-1.webp` | `pak multivit.png` | Universal Animal Pak |
| `products/producto-vitaminas-2.webp` | `image (98).png` | ON Multivitamin for Men |
| `products/producto-salud-1.webp` | `vitaminas.png` | Vitamina C & Zinc |
| `products/producto-accesorio-1.webp` | `acesorios.png` (recorte derecho) | Shaker MF |
| `products/producto-accesorio-2.webp` | `acesorios.png` (recorte izquierdo) | Bolso deportivo MF |
| `instagram/ig-1…4.webp` | `seccion instagram foto`, `foto1`, `foto2`, `foto4` (recortada) | Mosaico Instagram (+ resultados, whey, energía = 7 tiles) |

Nota: `acesorios.png`, `seccion instagram foto2.png` y `foto3.png` son el mismo archivo (mismo hash).
Productos de fotos lifestyle usan `cover: true` (llenan el marco); los packshots usan `mix-blend-mode: multiply`
para fundir el fondo blanco con la card.

### Imágenes pendientes
Todos los productos del catálogo tienen foto. Opcionales para una versión final:
- Más productos por categoría (hoy 1 en Pre entreno, Aminoácidos, Quemadores, Salud y bienestar):
  agregar entrada en `products.ts` + `producto-<categoria>-N.webp`.
- Posts reales de Instagram (hoy fotos de marca), fotos reales de clientes para testimonios (hoy iniciales),
  fachada de cada sucursal.
- Datos: dirección exacta de La Paz, horarios, email, Facebook/TikTok, precios reales.
