import { productImage, type Product } from '../data/products'
import { LogoMark } from './Logo'

/** Foto del producto, o placeholder con estilo de marca mientras llega la imagen real. */
export default function ProductImage({ product, compact }: { product: Product; compact?: boolean }) {
  if (product.hasImage) {
    return <img className={product.cover ? 'is-cover' : ''} src={productImage(product)} alt={`${product.brand} ${product.name}`} loading="lazy" decoding="async" />
  }
  return (
    <div className={`ph ${compact ? 'ph--compact' : ''}`} role="img" aria-label={`${product.brand} ${product.name} (imagen pendiente)`}>
      <div className="ph__tub">
        <span className="ph__lid" />
        <span className="ph__body">
          <LogoMark light size={compact ? 22 : 40} />
          {!compact && <span className="ph__cat">{product.category}</span>}
        </span>
      </div>
      {!compact && <span className="ph__file">{product.file}</span>}
    </div>
  )
}
