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
   * @param {string} url The url
   * @returns {object} Returns the data about the current state and data of the store.
   */
  async getCurrentData (url) {
    // const res = await fetch('/api/data')
    const res = await fetch(url)
    const data = await res.json()
    return await data
  }
}
