/**
 * Creates an invoice of an order
 */

import { Order } from './Order.js'

/**
 *
 */
export class ModelInvoice {
  /**
   * The currency
   */
  #currency
  /**
   * @type {Order} The order to create an invoice from
   */
  #order

  /**
   * @type {string} The name of the customer
   */
  #customerName

  /**
   * @type {string} The date when the invoice was created
   */
  #date

  /**
   * @type {string} The email
   */
  #email

  /**
   * The constructor.
   *
   * @param {Order} order The order to create an invoice from
   * @param {string} name The name
   * @param {string} email The email
   * @param {string} currency The currency
   */
  constructor (order, name, email, currency) {
    this.setOrder(order)
    this.setCustomerName(name)
    this.setEmail(email)
    this.setCurrency(currency)
    this.setDate()
  }

  /**
   * Sets the date.
   */
  setDate () {
    this.#date = new Date().toLocaleString('sv-SE', {
      timeZone: 'Europe/Stockholm',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  /**
   * Sets the currenct.
   *
   * @param {string} currency The currency
   */
  setCurrency (currency) {
    if ((typeof currency !== 'string') || currency.length <= 0) {
      throw new Error('The currency cannot be empty. It has to be a string')
    }
    this.#currency = currency
  }

  /**
   * Sets the email.
   *
   * @param {string} email The email.
   */
  setEmail (email) {
    if (email.length <= 0) {
      throw new Error('The email cannot be empty')
    }

    this.#email = email
  }

  /**
   * Sets the order.
   *
   * @param {Order} order - The order
   * @throws {TypeError} - If the type of the parameter is not an instance of Order
   */
  setOrder (order) {
    if (!(order instanceof Order)) {
      throw new TypeError('The parameter has to be an instance of the class Order in order for the Invoice class to be able to create an invoice')
    }
    this.#order = order
  }

  /**
   * Sets the name.
   *
   * @param {string} name - name
   */
  setCustomerName (name) {
    if (name.length <= 0) {
      throw new Error('The name cannot be empty')
    }

    this.#customerName = name
  }

  /**
   * Gets the currency.
   *
   * @returns {string} The currency
   */
  getCurrency () {
    return this.#currency
  }

  /**
   * Gets the email.
   *
   * @returns {string} The email
   */
  getEmail () {
    return this.#email
  }

  /**
   * Gets the order.
   *
   * @returns {Order} The order
   */
  getOrder () {
    return this.#order
  }

  /**
   * Gets the customer name.
   *
   * @returns {string} The customer name
   */
  getCustomerName () {
    return this.#customerName
  }

  /**
   * Gets the date when the invoice was created.
   *
   * @returns {string} The date
   */
  getDate () {
    return this.#date
  }

  /**
   * Returns an object containg data about the invoice.
   *
   * @returns {object} - Returns data about the invoice
   */
  createInvoiceData () {
    const data = {
      date: this.getDate(),
      totalPrice: this.#order.calculateTotalPrice(),
      customerName: this.getCustomerName(),
      mail: this.getEmail(),
      products: this.#order.getOrderItemsInCart(),
      currency: this.getCurrency()
    }

    return data
  }
}
