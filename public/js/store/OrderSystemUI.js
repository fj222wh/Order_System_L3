import { ApiMediator } from './ApiMediator'

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
}
