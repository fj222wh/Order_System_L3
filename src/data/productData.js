/**
 * Product data - could be from database, API, or static data
 * This file contains the raw product data
 */

import { Product } from '../logic/Product.js'

const productData = [
  {
    name: 'iPhone 15 Pro',
    price: 1199,
    description: 'Latest iPhone with advanced camera system and A17 Pro chip'
  },
  {
    name: 'Samsung Galaxy S24',
    price: 899,
    description: 'Premium Android phone with AI-powered features'
  },
  {
    name: 'MacBook Air M3',
    price: 1299,
    description: 'Ultra-thin laptop with M3 chip and all-day battery life'
  },
  {
    name: 'AirPods Pro',
    price: 249,
    description: 'Wireless earbuds with active noise cancellation'
  },
  {
    name: 'iPad Pro 12.9"',
    price: 1099,
    description: 'Professional tablet with M2 chip and Liquid Retina display'
  },
  {
    name: 'Apple Watch Series 9',
    price: 399,
    description: 'Advanced smartwatch with health monitoring features'
  }
]

export const productsData = []
productData.forEach(product => {
  const newProduct = new Product(product.name, product.price, product.description)
  productsData.push(newProduct)
})
