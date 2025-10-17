/**
 * The store in memory. Creates the product and product catalog.
 *
 * @author Filippa Johansson
 * @version 1.0.0
 */

import { Store } from '../logic/Store.js'
import { productData } from './productData.js'
import { Product } from '../logic/Product.js'

export const store = new Store('Restaurant')

productData.forEach(product => {
  const newProduct = new Product(product.name, product.price, product.description, product.category)
  store.addProductToCatalog(newProduct)
})

export const allProductsFromCatalog = store.getProductCatalog()
