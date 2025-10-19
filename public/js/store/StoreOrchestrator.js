import { ApiMediator } from './ApiMediator'
import { OrderSystemUI } from './OrderSystemUI'

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
   * The constructor.
   */
  constructor () {
    this.#ui = new OrderSystemUI()
    this.#api = new ApiMediator()
  }


  loadProducts()


}
