import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { products, type Product } from '../data/products'
import { formatRD, waLink } from '../config'

type Line = { product: Product; qty: number }
type CartCtx = {
  lines: Line[]
  count: number
  total: number
  open: boolean
  setOpen: (v: boolean) => void
  add: (id: string) => void
  inc: (id: string) => void
  dec: (id: string) => void
  remove: (id: string) => void
  clear: () => void
  orderLink: () => string
}

const Ctx = createContext<CartCtx | null>(null)
const KEY = 'mercaditofit-cart'

function load(): Record<string, number> {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}')
  } catch {
    return {}
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Record<string, number>>(load)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items))
    } catch {
      /* almacenamiento no disponible */
    }
  }, [items])

  const value = useMemo<CartCtx>(() => {
    const lines = Object.entries(items)
      .map(([id, qty]) => ({ product: products.find((p) => p.id === id)!, qty }))
      .filter((l) => l.product && l.qty > 0)
    const count = lines.reduce((s, l) => s + l.qty, 0)
    const total = lines.reduce((s, l) => s + l.qty * l.product.price, 0)
    const set = (id: string, fn: (q: number) => number) =>
      setItems((prev) => {
        const q = fn(prev[id] ?? 0)
        const next = { ...prev }
        if (q <= 0) delete next[id]
        else next[id] = q
        return next
      })
    return {
      lines,
      count,
      total,
      open,
      setOpen,
      add: (id) => {
        set(id, (q) => q + 1)
        setOpen(true)
      },
      inc: (id) => set(id, (q) => q + 1),
      dec: (id) => set(id, (q) => q - 1),
      remove: (id) => set(id, () => 0),
      clear: () => setItems({}),
      orderLink: () => {
        const body = lines
          .map((l) => `• ${l.qty} x ${l.product.brand} ${l.product.name} — ${formatRD(l.qty * l.product.price)}`)
          .join('\n')
        return waLink(`Hola Mercaditofit, quiero hacer este pedido:\n\n${body}\n\nTotal: ${formatRD(total)}\n\n¿Me confirman disponibilidad y entrega?`)
      },
    }
  }, [items, open])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useCart() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useCart fuera de CartProvider')
  return c
}
