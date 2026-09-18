import type { MenuItem } from '@/types'

export type { MenuItem } from '@/types'

export const menuData: Record<string, MenuItem[]> = {
  'Milk Teas': [
    { name: 'Taro Milk Tea', desc: 'Creamy taro with fresh whole milk and tapioca pearls', price: '$7.25', color1: '#8b5ccc', color2: '#c9a0e8', tag: '⭐ Fan Fave' },
    { name: 'Classic Milk Tea', desc: 'Premium Ceylon black tea with silky whole milk', price: '$6.75', color1: '#8b4513', color2: '#d2a679', tag: '' },
    { name: 'Matcha Milk Tea', desc: 'Stone-ground Japanese matcha with creamy oat milk', price: '$7.50', color1: '#4a7c4e', color2: '#9bc49e', tag: '🌿 Vegan' },
    { name: 'Oolong Milk Tea', desc: 'Roasted oolong with whole milk, lightly sweet', price: '$7.00', color1: '#a0522d', color2: '#c8956a', tag: '' },
  ],
  'Fruit Teas': [
    { name: 'Mango Passion', desc: 'Tropical mango with passionfruit jelly and green tea', price: '$7.50', color1: '#e8a020', color2: '#ffd580', tag: '🔥 Trending' },
    { name: 'Strawberry Lychee', desc: 'Fresh strawberry purée with lychee jelly in jasmine tea', price: '$7.75', color1: '#e05c8a', color2: '#f4a4c0', tag: '' },
    { name: 'Peach Oolong', desc: 'Peach juice blended with fragrant oolong tea and basil seeds', price: '$7.25', color1: '#e88060', color2: '#f5c0a0', tag: '💛 Summer' },
    { name: 'Watermelon Mint', desc: 'Fresh watermelon juice with mint and popping pearls', price: '$7.75', color1: '#c0314a', color2: '#f4807a', tag: '' },
  ],
  'Seasonal Specials': [
    { name: 'Brown Sugar Boba', desc: 'Tiger-stripe brown sugar syrup with fresh whole milk', price: '$8.25', color1: '#6b3010', color2: '#c08040', tag: '🏆 Signature' },
    { name: 'Lavender Latte', desc: 'House lavender syrup with oat milk and butterfly pea tea', price: '$8.50', color1: '#7a68b4', color2: '#c4b4e8', tag: '🌸 New' },
    { name: 'Hojicha Cream', desc: 'Roasted green tea with cream foam and toasted rice', price: '$8.00', color1: '#7a5838', color2: '#c8a878', tag: '🍂 Cozy' },
  ],
  'Toppings': [
    { name: 'Tapioca Pearls', desc: 'Classic black pearls cooked fresh daily', price: '+$0.75', color1: '#3b2314', color2: '#8b6050', tag: '' },
    { name: 'Popping Pearls', desc: 'Juice-filled fruity burst pearls', price: '+$1.00', color1: '#e8a020', color2: '#ffd580', tag: '' },
    { name: 'Grass Jelly', desc: 'Light herbal jelly with a smooth texture', price: '+$0.75', color1: '#4a4a4a', color2: '#8a8a8a', tag: '' },
    { name: 'Lychee Jelly', desc: 'Delicate lychee-flavoured cubes', price: '+$1.00', color1: '#e8c8a8', color2: '#f8e8c8', tag: '' },
  ],
}

export const allDrinks: MenuItem[] = [
  ...menuData['Milk Teas'],
  ...menuData['Fruit Teas'],
  ...menuData['Seasonal Specials'],
]

export const toppings = menuData['Toppings']

export const sizes = [
  { label: 'Small', oz: '12 oz', mod: 0 },
  { label: 'Medium', oz: '16 oz', mod: 0.5 },
  { label: 'Large', oz: '24 oz', mod: 1.0 },
]

export const sugarLevels = ['0%', '25%', '50%', '75%', '100%']
export const iceLevels = ['No Ice', 'Light Ice', 'Regular Ice', 'Extra Ice']
