import { OrderSystemApi } from './OrderSystemApi.js'
import { OrderSystemUI } from './OrderSystemUI.js'

/**
 * Handling the orchestration between the OrderSystem API and the OrderSystemUI.
 *
 * @author Filippa Johansson
 * @version 1.0.0
 */
export class StoreController {
  /**
   * The class for handling UI
   */
  #ui

  /**
   * The class that handles the API
   */
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
  async createStoreView () {
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
   * Updates the view to the current data.
   */
  async #updateOrderDataToCurrent () {
    const data = await this.#api.getOrderData()
    this.#ui.updateOrderDisplay(data)
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
      this.#api.emptyCart()
      this.#updateOrderDataToCurrent()
    })

    document.addEventListener('payOrder', (e) => {
      alert('Simulate paying')
      this.#api.createNewOrder()
      this.#updateOrderDataToCurrent()
    })

    document.addEventListener('deleteOrderItem', (e) => {
      this.#api.deleteOrderItem(e.detail.id)
      this.#updateOrderDataToCurrent()
    })

    document.addEventListener('createInvoice', async (e) => {
      const invoiceHTML = await this.#api.createInvoice(e.detail.fullName, e.detail.email)
      const linkToDownload = document.createElement('a')
      linkToDownload.href = 'data:text/html;charset=utf-8,' + invoiceHTML
      linkToDownload.download = 'invoice.html'
      linkToDownload.click()

      this.#api.createNewOrder()
      this.#updateOrderDataToCurrent()
    })

    document.addEventListener('categorySelected', async (e) => {
      const data = await this.#api.getProductsFromCategory(e.detail.selectedCategory)
      this.#ui.renderProducts(data)
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
