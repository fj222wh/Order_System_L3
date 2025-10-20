import { ApiMediator } from './ApiMediator.js'
import { OrderSystemUI } from './OrderSystemUI.js'

/**
 * Orchestrating the store
 *
 * @author Filippa Johansson
 * @version 1.0.0
 */
export class StoreOrchestrator {
  #ui
  #api

  /**
   * The #ructor.
   */
  constructor () {
    this.#ui = new OrderSystemUI()
    this.#api = new ApiMediator()
  }

  /**
   * Starts the application.
   */
  async start () {
    const data = await this.#api.getData()
    this.#ui.renderProducts(data.products)
    console.log(data.categories)
    this.#ui.renderCategories(data.categories)
    this.#ui.updateCart(data.orderItems)
    this.#ui.updateTotalPrice(data.orderTotalPrice)

    this.#addEventListeners()
  }

  /**
   * Adds the event listeners.
   */
  #addEventListeners () {
    document.addEventListener('productSelected', async (e) => {
      const productObject = this.#createProductObject(e.detail.selectedProduct)
      await this.#api.addProduct(productObject)
      const updatedData = await this.#api.getOrderData()
      console.log('this is the new Data')
      console.log(updatedData)
      this.#ui.updateTotalPrice(updatedData.orderTotalPrice)
      this.#ui.updateCart(updatedData.orderItems)
      // TODO: updateData
    })
  }

  /**
   * Creates the object.
   *
   * @param {HTMLElement } productElement The element for the product
   * @returns {object} Returns an object with information about the product
   */
  #createProductObject (productElement) {
    return {
      id: productElement.getAttribute('data-id'),
      name: productElement.getAttribute('data-name'),
      price: Number(productElement.getAttribute('data-price'))
    }
  }

  // TODO:
  // Listen to despatch event, selectedCategory

  // updateCategoryStatus(e.target)
  // selectCategory(category)
}
