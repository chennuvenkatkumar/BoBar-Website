import { sizes, toppings } from '@/lib/data/menu-data'
import type { OrderItem } from '@/types'

export function getItemPrice(item: OrderItem): number {
  const base = parseFloat(item.drink.price.replace('$', ''))
  const sizeIdx = sizes.findIndex((s) => s.label === item.size)
  const sizeMod = sizes[sizeIdx]?.mod ?? 0
  const toppingsCost = item.toppings.reduce((acc, t) => {
    const top = toppings.find((tp) => tp.name === t)
    return acc + parseFloat((top?.price ?? '+$0').replace('+$', ''))
  }, 0)
  return base + sizeMod + toppingsCost
}

export function formatPrice(n: number): string {
  return `$${n.toFixed(2)}`
}
