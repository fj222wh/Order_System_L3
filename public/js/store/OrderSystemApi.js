/**
 * Handles fethcing and sending data to the backend server.
 *
 * @author Filippa Johansson
 * @version 1.0.0
 */
export class OrderSystemApi {
  /**
   * Returns the data for all products, categories, products in cart etc.
   *
   * @returns {object} Returns the data about the current state and data of the store.
   */
  async getData () {
    const res = await fetch('/api/data')
    const data = await res.json()
    return await data
  }

  /**
   * Add a product to the order.
   *
   * @param {number} product The product
   */
  async addProduct (product) {
    await fetch('/api/order/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    })
  }

  /**
   * Get products from the chosen category.
   *
   * @param {string} category The category
   * @returns {Array} Returns an array with the data
   */
  async getProductsFromCategory (category) {
    const res = await fetch(`/api/products/${encodeURIComponent(category)}`)
    const data = res.json()

    return data
  }

  /**
   * Gets the data about the order.
   *
   * @returns {object} Returns data about the order
   */
  async getOrderData () {
    const res = await fetch('/api/order')
    const data = await res.json()
    return await data
  }

  /**
   * Empties the cart.
   */
  async emptyCart () {
    const res = await fetch('/api/order/empty', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'empty cart' })
    })

    const message = await res.json()
    console.log(message)
  }

  /**
   * Deletes an order item from the order.
   *
   * @param {number} productId The product id of the order item to remove
   */
  async deleteOrderItem (productId) {
    await fetch(`/api/order/remove/${encodeURIComponent(productId)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
    })
  }

  /**
   * Creates a new order.
   *
   */
  async createNewOrder () {
    await fetch('/api/order/create', {
      method: 'POST'
    })
  }

  /**
   * Creates the invoice.
   *
   * @param {string} fullName - The customer's full name
   * @param {string} email - The customer's email
   * @returns {string} Returns a HMTL string
   */
  async createInvoice (fullName, email) {
    const data = {
      fullName,
      email
    }

    console.log(data)

    const res = await fetch('/api/order/invoice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    const content = await res.json()
    const encoded = encodeURIComponent(content)
    return encoded
  }
}
