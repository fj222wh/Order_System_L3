/**
 * The store in memory
 */

import { Store } from '../logic/Store.js'
import { productsData } from './productData.js'

export const store = new Store('Foodie')
productsData.forEach(product => store.addProductToCatalog(product))

export const allProductsFromCatalog = store.getProductCatalog()

export const order = store.createOrder()
