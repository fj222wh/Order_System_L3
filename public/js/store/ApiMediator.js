/**
 * Handles the traffic between the front end to fetch data.
 *
 * @author Filippa Johansson
 * @version 1.0.0
 */
export class ApiMediator {
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
   * Gets the data about the order.
   *
   * @returns {object} Returns data about the order
   */
  async getOrderData () {
    const res = await fetch('/api/order')
    const data = await res.json()
    return await data
  }
}
