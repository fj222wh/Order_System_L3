/**
 *
 */

import { allProductsFromCatalog } from '../data/storeData.js'
/**
 *
 */
export class ApiController {
  /**
   *
   * @param req
   * @param res
   */
  getProducts (req, res) {
    res.json(allProductsFromCatalog)
  }
}
