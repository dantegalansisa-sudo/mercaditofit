export type Category =
  | 'Proteínas'
  | 'Creatinas'
  | 'Pre entreno'
  | 'Aminoácidos'
  | 'Quemadores'
  | 'Vitaminas'
  | 'Salud y bienestar'
  | 'Accesorios'

export const categories: Category[] = [
  'Proteínas',
  'Creatinas',
  'Pre entreno',
  'Aminoácidos',
  'Quemadores',
  'Vitaminas',
  'Salud y bienestar',
  'Accesorios',
]

export type Product = {
  id: string
  name: string
  brand: string
  category: Category
  /** Precio en RD$ — placeholder hasta confirmar con el cliente */
  price: number
  /** Nombre de archivo esperado en /public/images/products/ */
  file: string
  /** true cuando la foto real ya existe en /public/images/products/ */
  hasImage: boolean
  badge?: 'Nuevo' | 'Top ventas'
  rating: number
  popular?: boolean
}

export const productImage = (p: Product) => `/images/products/${p.file}`

export const products: Product[] = [
  { id: 'gold-standard-whey', name: 'Gold Standard 100% Whey', brand: 'Optimum Nutrition', category: 'Proteínas', price: 4950, file: 'producto-proteina-1.webp', hasImage: false, badge: 'Top ventas', rating: 5, popular: true },
  { id: 'ghost-whey', name: 'Ghost Whey Protein', brand: 'Ghost', category: 'Proteínas', price: 4450, file: 'producto-proteina-2.webp', hasImage: false, badge: 'Nuevo', rating: 5, popular: true },
  { id: 'syntha-6', name: 'Syntha-6 Protein', brand: 'BSN', category: 'Proteínas', price: 3950, file: 'producto-proteina-3.webp', hasImage: false, rating: 4, popular: true },
  { id: 'evl-creatine', name: 'Creatine Monohydrate', brand: 'EVL Nutrition', category: 'Creatinas', price: 1650, file: 'producto-creatina-1.webp', hasImage: false, badge: 'Top ventas', rating: 5, popular: true },
  { id: 'on-creatine', name: 'Micronized Creatine Powder', brand: 'Optimum Nutrition', category: 'Creatinas', price: 1950, file: 'producto-creatina-2.webp', hasImage: false, rating: 5 },
  { id: 'c4-original', name: 'C4 Original Pre-Workout', brand: 'Cellucor', category: 'Pre entreno', price: 2150, file: 'producto-preentreno-1.webp', hasImage: false, badge: 'Top ventas', rating: 5, popular: true },
  { id: 'ghost-legend', name: 'Legend Pre-Workout', brand: 'Ghost', category: 'Pre entreno', price: 2650, file: 'producto-preentreno-2.webp', hasImage: false, badge: 'Nuevo', rating: 4 },
  { id: 'xtend-bcaa', name: 'Xtend Original BCAA', brand: 'Scivation', category: 'Aminoácidos', price: 2250, file: 'producto-aminoacidos-1.webp', hasImage: false, rating: 5 },
  { id: 'amino-energy', name: 'Essential Amino Energy', brand: 'Optimum Nutrition', category: 'Aminoácidos', price: 1850, file: 'producto-aminoacidos-2.webp', hasImage: false, rating: 4 },
  { id: 'hydroxycut', name: 'Hydroxycut Hardcore Elite', brand: 'MuscleTech', category: 'Quemadores', price: 1750, file: 'producto-quemador-1.webp', hasImage: false, rating: 4 },
  { id: 'lipo-6', name: 'Lipo-6 Black Ultra', brand: 'Nutrex', category: 'Quemadores', price: 1950, file: 'producto-quemador-2.webp', hasImage: false, badge: 'Nuevo', rating: 4 },
  { id: 'animal-pak', name: 'Animal Pak Multivitamínico', brand: 'Universal', category: 'Vitaminas', price: 2450, file: 'producto-vitaminas-1.webp', hasImage: false, badge: 'Top ventas', rating: 5, popular: true },
  { id: 'opti-men', name: 'Opti-Men Multivitamínico', brand: 'Optimum Nutrition', category: 'Vitaminas', price: 1650, file: 'producto-vitaminas-2.webp', hasImage: false, rating: 5 },
  { id: 'omega-3', name: 'Omega-3 Fish Oil 1000mg', brand: 'Nature’s Bounty', category: 'Salud y bienestar', price: 1150, file: 'producto-salud-1.webp', hasImage: false, rating: 5 },
  { id: 'shaker-mf', name: 'Shaker MF 700 ml', brand: 'Mercaditofit', category: 'Accesorios', price: 450, file: 'producto-accesorio-1.webp', hasImage: false, badge: 'Nuevo', rating: 5 },
  { id: 'straps', name: 'Straps de levantamiento', brand: 'Mercaditofit', category: 'Accesorios', price: 650, file: 'producto-accesorio-2.webp', hasImage: false, rating: 4 },
]
