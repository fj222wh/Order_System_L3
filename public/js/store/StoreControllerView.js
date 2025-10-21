import { OrderSystemApi } from './OrderSystemApi.js'
import { OrderSystemUI } from './OrderSystemUI.js'

/**
 * Handling the orchestration between the OrderSystem API and the OrderSystemUI.
 *
 * @author Filippa Johansson
 * @version 1.0.0
 */
export class StoreControllerView {
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
  async #updateOrderData () {
    const data = await this.#api.getOrderData()
    this.#ui.updateOrderDisplay(data)
  }

  /**
   * Adds the event listeners on document to listen on custom events.
   */
  #addEventListeners () {
    document.addEventListener('addProduct', async (event) => {
      this.#addProduct(event)
    })

    document.addEventListener('emptyOrder', (event) => {
      this.#emptyOrder()
    })

    document.addEventListener('payOrder', (event) => {
      alert('Simulate paying')
      this.#resetState()
    })

    document.addEventListener('deleteOrderItem', (event) => {
      this.#deleteOrderItem(event)
    })

    document.addEventListener('createInvoice', async (event) => {
      await this.#createInvoice(event)
      this.#resetState()
    })

    document.addEventListener('categorySelected', async (event) => {
      this.#renderProductsFromCategory(event)
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

  /**
   * Add a product to cart.
   *
   * @param {Event} event - The event- The event
   */
  async #addProduct (event) {
    const productObject = this.#createProductObject(event.detail.selectedProduct)
    await this.#api.addProduct(productObject)
    this.#updateOrderData()
  }

  /**
   * Empties the order.
   */
  async #emptyOrder () {
    await this.#api.emptyCart()
    this.#updateOrderData()
  }

  /**
   * Resets the state of order.
   */
  async #resetState () {
    await this.#api.createNewOrder()
    this.#updateOrderData()
  }

  /**
   * Delete an order item.
   *
   * @param {Event} event - The event
   */
  async #deleteOrderItem (event) {
    await this.#api.deleteOrderItem(event.detail.id)
    this.#updateOrderData()
  }

  /**
   * Create the invoice.
   *
   * @param {Event} event - The event
   */
  async #createInvoice (event) {
    const invoiceHTML = await this.#api.createInvoice(event.detail.fullName, event.detail.email)
    const linkToDownload = document.createElement('a')
    linkToDownload.href = 'data:text/html;charset=utf-8,' + invoiceHTML
    linkToDownload.download = 'invoice.html'
    linkToDownload.click()
  }

  /**
   * Render products from the selected category.
   *
   * @param {Event} event - The event
   */
  async #renderProductsFromCategory (event) {
    const data = await this.#api.getProductsFromCategory(event.detail.selectedCategory)
    this.#ui.renderProducts(data)
  }
}
