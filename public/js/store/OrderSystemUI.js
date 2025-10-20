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
   * @param {Array} products The products
   * @param {HTMLElement} productsContainer The HTML element containing all of the product
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
   * Updates background color of the category element to simulate it being the active category.
   *
   * @param {HTMLElement} activeCategoryElement The HTML element for the category
   */
  updateCategoryStatus (activeCategoryElement) {
    const categoryButtons = document.querySelectorAll('.categoryBtn')
    categoryButtons.forEach(btn => btn.classList.remove('selectedCategory'))
    activeCategoryElement.classList.add('selectedCategory')
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
