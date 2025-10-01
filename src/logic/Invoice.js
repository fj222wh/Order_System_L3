/**
 * Creates an invoice of an order
 */

import { Order } from './Order.js'

/**
 *
 */
export class Invoice {
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
   * Creates the invoice of an order.
   *
   * @returns {HTMLCollection} Returns a document in HTML
   */
  createInvoice () {
    const htmlDoc = `
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice</title>

        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            main {
                font-family: Arial, Helvetica, sans-serif;
                padding: 50px;
                width: 90%;
                max-width: 1000px;
                margin: auto;
            }

            table {
                border-collapse: collapse;
                width: 100%;


            }

            th {
                text-align: left;
            }

            tr,
            td,
            th {
                padding: 10px;
                padding: 5px 40px;
                border-collapse: collapse;
            }

            th {
                background-color: rgba(189, 189, 189, 0.765);
            }

            .td-quantity,
            #th-quantity {
                text-align: center;
            }

            #tr-total {
                border-top: solid 1px black;
            }

            hr {
                margin: 20px 0;
                border: solid black 0.5px;
            }
        </style>
    </head>

    <body>
        <main>
            <h1>Invoice</h1>
            <div id="orderInfo">
                <p>Date: ${this.#date} </p>
                <p>Customer: ${this.#customerName}</p>
                <p>Email: ${this.#email}</p>
            </div>
            <br>

            <div id="order">

                <hr>
                <table>
                    <tr>
                        <th>Products</th>
                        <th id="th-quantity">Quantity</th>
                        <th>Price</th>
                    </tr>
                    ${this.#printProductsHtml()}
                    <tr id="tr-total">
                        <td colspan="2">
                        </td>
                        <td colspan="2">Total: ${this.#order.calculateTotalPrice().toFixed(2)} ${this.#currency}</td>
                    </tr>
                </table>
            </div>
        </main>
    </body>
</html>`
    return htmlDoc
  }

  /**
   * Prints all the products in html.
   *
   * @returns {HTMLCollection} Returns the HTML
   */
  #printProductsHtml () {
    let html = ''

    const productsInCart = this.#order.getOrderItemsInCart() // Missing parentheses!
    productsInCart.forEach(product => {
      console.log('this is the product')
      console.log(product)
      const td = `
      <tr>
          <td>${product.product.getName()}</td>
          <td class="td-quantity">${product.quantity}</td>
          <td>${product.product.getPrice()}</td>
      </tr>
    `
      html += td
    })

    return html
  }
}
