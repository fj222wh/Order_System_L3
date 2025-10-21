import { ModelInvoice } from './ModelInvoice.js'

/**
 * The invoice views.
 *
 * @author Filippa Johansson
 * @version 1.0.0
 */
export class InvoiceView {
  #invoice

  /**
   * The constructor.
   *
   * @param {ModelInvoice} invoice The invoice
   */
  constructor (invoice) {
    this.#setInvoice(invoice)
  }

  /**
   * Sets the invoice.
   *
   * @param {ModelInvoice} invoice - The invoice
   */
  #setInvoice (invoice) {
    if (!(invoice instanceof ModelInvoice)) {
      throw new TypeError('The invoice needs to be an instance in ModelInvoice')
    }

    this.#invoice = invoice
  }

  /**
   * Creates the invoice of an order.
   *
   * @returns {HTMLCollection} Returns a document in HTML
   */
  createInvoice () {
    const invoiceData = this.#invoice.createInvoiceData()

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
                <p>Date: ${invoiceData.date} </p>
                <p>Customer: ${invoiceData.name}</p>
                <p>Email: ${invoiceData.mail}</p>
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
                    ${this.#printProductsHtml(invoiceData.products)}
                    <tr id="tr-total">
                        <td colspan="2">
                        </td>
                        <td colspan="2">Total: ${invoiceData.totalPrice.toFixed(2)} ${invoiceData.currency}</td>
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
   * @param {Array} productsInCart Contains all order items
   * @returns {HTMLCollection} Returns the HTML
   */
  #printProductsHtml (productsInCart) {
    let html = ''

    productsInCart.forEach(product => {
      console.log('this is the product')
      console.log(product)
      const td = `
      <tr>
          <td>${product.product.getName()}</td>
          <td class="td-quantity">${product.quantity}</td>
          <td>${product.product.getPrice().toFixed(2)}</td>
      </tr>
    `
      html += td
    })

    return html
  }
}
