import { ApiMediator } from './ApiMediator.js'

/**
 * The class handling the UI of the Order System
 *
 * @author Filippa Johansson
 * @version 1.0.0
 */
export class OrderSystemUI {
  #apiMediator

  /**
   * The constructor of the OrdersystemUI.
   *
   */
  constructor () {
    this.#apiMediator = new ApiMediator()
  }

  /**
   * Renders the products.
   *
   * @param {object} products The products
   * @param productsContainer
   */
  renderProducts (products, productsContainer) {
    products.forEach(product => {
      const productDiv = document.createElement('div')
      productDiv.setAttribute('data-id', product.id)
      productDiv.setAttribute('data-name', product.name)
      productDiv.setAttribute('data-price', product.price.toFixed(2))
      productDiv.classList.add('product')
      const name = document.createElement('p')
      name.textContent = product.name
      const price = document.createElement('p')
      price.textContent = product.price.toFixed(2) + '€'
      productDiv.appendChild(name)
      productDiv.appendChild(price)
      productsContainer.appendChild(productDiv)
    })
  }

  /**
   *
   * @param data
   */
  #createProduct (data) {

  }

  /**
   *
   * @param categories
   */
  renderCategories (categories) {

  }

  /**
   *
   */
  updateTotalPrice () {

  }

  /**
   * Clear the displayed products.
   *
   * @param productsContainer
   */
  clearDisplayedProducts (productsContainer) {
    while (productsContainer.firstChild) {
      productsContainer.removeChild(productsContainer.firstChild)
    }
  }
}
