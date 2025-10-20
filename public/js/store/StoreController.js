import { OrderSystemApi } from './OrderSystemApi.js'
import { OrderSystemUI } from './OrderSystemUI.js'

/**
 * Orchestrating the store
 *
 * @author Filippa Johansson
 * @version 1.0.0
 */
export class StoreController {
  #ui
  #api

  /**
   * The constructor.
   *
   * @param {string} currency The currency for the UI.
   */
  constructor (currency) {
    this.#ui = new OrderSystemUI(currency)
    this.#api = new OrderSystemApi()
  }

  /**
   * Starts the application.
   */
  async renderStore () {
    const data = await this.#api.getData()
    this.#ui.updateOrderNumber(data.orderNumber)
    this.#ui.renderProducts(data.products)
    console.log(data.categories)
    this.#ui.renderCategories(data.categories)
    this.#ui.updateCart(data.orderItems)
    this.#ui.updateTotalPrice(data.orderTotalPrice)

    this.#ui.dispatchCustomEvents()
    this.#addEventListeners()
  }

  /**
   *
   */
  reset () {

  }

  /**
   *
   */
  async #updateOrderDataToCurrent () {
    const updatedData = await this.#api.getOrderData()
    console.log('this is the new Data')
    console.log(updatedData)
    this.#ui.updateTotalPrice(updatedData.orderTotalPrice)
    this.#ui.updateCart(updatedData.orderItems)
  }

  /**
   * Adds the event listeners on document to listen on custom events.
   */
  #addEventListeners () {
    document.addEventListener('productSelected', async (e) => {
      const productObject = this.#createProductObject(e.detail.selectedProduct)
      await this.#api.addProduct(productObject)
      this.#updateOrderDataToCurrent()
    })

    document.addEventListener('emptyOrder', (e) => {
      this.#ui.clearOrderDisplay()
      this.#api.emptyCart()
      this.#ui.updateTotalPrice(0)
    })

    document.addEventListener('payOrder', (e) => {
      alert('Simulate paying')
    })

    document.addEventListener('deleteOrderItem', (e) => {
      this.#api.deleteOrderItem(e.detail.id)
      this.#updateOrderDataToCurrent()
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
}

const store = new StoreController('kr')
store.renderStore()
