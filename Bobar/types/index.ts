export interface MenuItem {
  name: string
  desc: string
  price: string
  color1: string
  color2: string
  tag: string
}

export interface OrderItem {
  drink: MenuItem
  size: string
  sugar: string
  ice: string
  toppings: string[]
  qty: number
}
