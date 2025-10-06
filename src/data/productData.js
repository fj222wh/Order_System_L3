/**
 * Creates data for the
 */

import { Product } from '../logic/Product.js'

const productData = [
  {
    name: 'Classic Milk Tea',
    price: 4.5,
    description: 'Traditional black tea with creamy milk and tapioca pearls',
    category: 'drink'
  },
  {
    name: 'Taro Milk Tea',
    price: 5.0,
    description: 'Sweet taro-flavored milk tea with chewy boba',
    category: 'drink'
  },
  {
    name: 'Matcha Latte',
    price: 5.5,
    description: 'Rich matcha green tea with milk and optional pearls',
    category: 'drink'
  },
  {
    name: 'Brown Sugar Boba Milk',
    price: 6.0,
    description: 'Caramelized brown sugar syrup with fresh milk and boba',
    category: 'drink'
  },
  {
    name: 'Mango Smoothie',
    price: 5.0,
    description: 'Refreshing mango smoothie with fruit jelly',
    category: 'drink'
  },
  {
    name: 'Strawberry Yogurt Tea',
    price: 5.5,
    description: 'Strawberry-flavored tea with creamy yogurt topping',
    category: 'drink'
  },
  {
    name: 'Caramel Bubble Deluxe',
    price: 7.5,
    description: 'Caramel-flavored tea with creamy yogurt topping',
    category: 'drink'
  }
]

export const productsData = []
productData.forEach(product => {
  const newProduct = new Product(product.name, product.price, product.description, product.category)
  productsData.push(newProduct)
})
