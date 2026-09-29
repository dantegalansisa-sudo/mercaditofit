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
  /** Foto lifestyle (no recortada) — llena el marco en vez de contenerse */
  cover?: boolean
}

export const productImage = (p: Product) => `/images/products/${p.file}`

export const products: Product[] = [
  { id: 'gold-standard-whey', name: 'Gold Standard 100% Whey', brand: 'Optimum Nutrition', category: 'Proteínas', price: 4950, file: 'producto-proteina-1.webp', hasImage: true, badge: 'Top ventas', rating: 5, popular: true },
  { id: 'ghost-whey', name: 'Ghost Whey Protein', brand: 'Ghost', category: 'Proteínas', price: 4450, file: 'producto-proteina-2.webp', hasImage: true, badge: 'Nuevo', rating: 5, popular: true },
  { id: 'syntha-6', name: 'Syntha-6 Protein', brand: 'BSN', category: 'Proteínas', price: 3950, file: 'producto-proteina-3.webp', hasImage: true, rating: 4, popular: true },
  { id: 'evl-creatine', name: 'Creatine 1000 Cápsulas', brand: 'EVL Nutrition', category: 'Creatinas', price: 1650, file: 'producto-creatina-1.webp', hasImage: true, badge: 'Top ventas', rating: 5, popular: true },
  { id: 'nutrex-creatine', name: 'Creatine Monohydrate', brand: 'Nutrex', category: 'Creatinas', price: 1850, file: 'producto-creatina-2.webp', hasImage: true, rating: 5 },
  { id: 'c4-original', name: 'C4 Original Pre-Workout', brand: 'Cellucor', category: 'Pre entreno', price: 2150, file: 'producto-preentreno-1.webp', hasImage: true, badge: 'Top ventas', rating: 5, popular: true },
  { id: 'amino-energy', name: 'Essential Amino Energy', brand: 'Optimum Nutrition', category: 'Aminoácidos', price: 1850, file: 'producto-aminoacidos-1.webp', hasImage: true, rating: 5 },
  { id: 'fat-burner', name: 'Fat Burner Termogénico', brand: 'DMoose', category: 'Quemadores', price: 1750, file: 'producto-quemador-1.webp', hasImage: true, badge: 'Nuevo', rating: 4 },
  { id: 'animal-pak', name: 'Animal Pak Multivitamínico', brand: 'Universal', category: 'Vitaminas', price: 2450, file: 'producto-vitaminas-1.webp', hasImage: true, badge: 'Top ventas', rating: 5, popular: true },
  { id: 'multivitamin-men', name: 'Multivitamin for Men', brand: 'Optimum Nutrition', category: 'Vitaminas', price: 1650, file: 'producto-vitaminas-2.webp', hasImage: true, rating: 5 },
  { id: 'vitamina-c-zinc', name: 'Vitamina C & Zinc Gomitas', brand: 'C-Defence', category: 'Salud y bienestar', price: 1150, file: 'producto-salud-1.webp', hasImage: true, rating: 5 },
  { id: 'shaker-mf', name: 'Shaker MF 700 ml', brand: 'Mercaditofit', category: 'Accesorios', price: 450, file: 'producto-accesorio-1.webp', hasImage: true, badge: 'Nuevo', rating: 5, cover: true },
  { id: 'bolso-mf', name: 'Bolso deportivo MF', brand: 'Mercaditofit', category: 'Accesorios', price: 1850, file: 'producto-accesorio-2.webp', hasImage: true, rating: 5, cover: true },
]
