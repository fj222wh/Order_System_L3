import { ApiMediator } from './ApiMediator.js'
import { OrderSystemUI } from './OrderSystemUI.js'

/**
 * Orchestrating the store
 *
 * @author Filippa Johansson
 * @version 1.0.0
 */
export class StoreOrchestrator {
  #productsContainer = document.querySelector('#productsContainer')
  #orderDisplay = document.querySelector('#orderDisplay')
  #TotalPriceDisplay = document.querySelector('#orderTotalPrice')
  #orderNumber = document.querySelector('#orderNumber')
  #resetOrderBtn = document.querySelector('#resetButton')
  #createInvoiceBtn = document.querySelector('#createInvoiceBtn')
  #payBtn = document.querySelector('#payBtn')
  #categoryList = document.querySelector('#categoryList')
  #invoiceForm = document.querySelector('#createInvoice')
  #orderButtonsContainer = document.querySelector('#orderButtons')
  #sendInvoiceToServerBtn = document.querySelector('#createInvoicePostBtn')

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
    const data = await this.#api.getData('/api/data')
    await this.#ui.renderProducts(data.products, this.#productsContainer)
    console.log(data.categories)
    await this.#ui.renderCategories(data.categories, this.#categoryList)
    this.#ui.updateTotalPrice(this.#TotalPriceDisplay, 0)

    this.#addEventListeners()
  }

  /**
   *
   */
  #addEventListeners () {
    document.addEventListener('productSelected', (e) => {
      console.log(e.detail.selectedProduct)
    })
  }

  // TODO:
  // Listen to despatch event, selectedCategory

  // updateCategoryStatus(e.target)
  // selectCategory(category)
}
