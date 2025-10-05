/**
 * The Product catalouge which includes all the store's products.
 */

import { Product } from './Product.js'

/**
 *
 */
export class ProductCatalog {
  #catalog
  #productIdCounter = 1

  /**
   * The constructor.
   */
  constructor () {
    this.#catalog = []
  }

  /**
   * Add a product to the catalog.
   *
   * @param {Product} product - The product
   */
  addProduct (product) {
    if (!(product instanceof Product)) {
      throw new Error(
        'The product has to be an instance of the class Product in order to be added to the product catalog'
      )
    }

    product.setID(this.#productIdCounter)
    this.#productIdCounter++
    this.#catalog.push(product)
  }

  /**
   * Find a product in the catalog.
   *
   * @param {number} productId - The product id
   * @returns {Product} The product
   */
  findProduct (productId) {
    const product = this.#catalog.find((product) => {
      return product.getID() === productId
    })

    if (!product) {
      throw new Error('Failed to find product')
    }

    return product
  }

  /**
   * Remove a product from the product catalog based on id.
   *
   * @param {number} productId The id of the product
   */
  removeProduct (productId) {
    const index = this.#catalog.findIndex((product) => {
      return product.getID() === productId
    })

    if (index !== -1) {
      this.#catalog.splice(index, 1)
    } else {
      throw new Error('Failed to remove the product from the product catalog')
    }
  }

  /**
   * Returns all products in the catalog.
   *
   * @returns {Array} - Returns all products in the catalog
   */
  getAllProducts () {
    return [...this.#catalog]
  }

  /**
   * Returns the array with products from the chose category.
   *
   * @param {string} category The category
   * @returns {Array} The products from the category
   */
  getProductsFromCategory (category) {
    if (category.length <= 0 || typeof category !== 'string') {
      throw new TypeError('The category has to be a string and it cannot be empty')
    }

    return this.#catalog.filter(product => {
      return product.getCategory() === category.toLowerCase()
    })
  }

  /**
   *
   */
  toJSON () {
    const jsonFormat = []
    this.#catalog.forEach(product => {
      jsonFormat.push(product.toJSON())
    })

    return jsonFormat
  }
}
