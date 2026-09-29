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
| Archivo | Sección |
|---|---|
| `public/images/hero.webp` | Hero (← `foto del heros.png`) |
| `public/images/energia.webp` | Oferta "Más energía para tus entrenamientos" (← `foto de la seccion as energia…png`) |
| `public/images/resultados.webp` | "Resultados reales" (← `foto de la seccion resultados reales.png`) |
| mismas 3 fotos (recortes) | mosaico de Instagram (temporal) |

### Imágenes pendientes
Productos → `public/images/products/` (cuadradas, fondo limpio, ~900px):

| Archivo esperado | Producto |
|---|---|
| `producto-proteina-1.webp` | Optimum Nutrition Gold Standard 100% Whey |
| `producto-proteina-2.webp` | Ghost Whey Protein |
| `producto-proteina-3.webp` | BSN Syntha-6 |
| `producto-creatina-1.webp` | EVL Creatine Monohydrate |
| `producto-creatina-2.webp` | ON Micronized Creatine |
| `producto-preentreno-1.webp` | Cellucor C4 Original |
| `producto-preentreno-2.webp` | Ghost Legend Pre-Workout |
| `producto-aminoacidos-1.webp` | Scivation Xtend BCAA |
| `producto-aminoacidos-2.webp` | ON Essential Amino Energy |
| `producto-quemador-1.webp` | MuscleTech Hydroxycut Hardcore Elite |
| `producto-quemador-2.webp` | Nutrex Lipo-6 Black |
| `producto-vitaminas-1.webp` | Universal Animal Pak |
| `producto-vitaminas-2.webp` | ON Opti-Men |
| `producto-salud-1.webp` | Omega-3 Fish Oil |
| `producto-accesorio-1.webp` | Shaker MF 700 ml |
| `producto-accesorio-2.webp` | Straps de levantamiento |

Opcionales: fotos reales de clientes para testimonios (hoy iniciales), 6–7 posts reales de Instagram,
foto de fachada de cada sucursal, dirección exacta de La Paz, horarios, email y redes (Facebook/TikTok).
