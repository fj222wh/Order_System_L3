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

  /**
   *
   * @param req
   * @param res
   */
  addProduct (req, res) {
    // Support the GET variant which passes id as a URL param
    const id = req.params?.id
    console.log('addProduct GET id:', id)
    res.json({ status: 'ok', id })
  }

  /**
   * Handle POST /add - expects JSON body with product information.
   *
   * @param {object} req - Express request
   * @param {object} res - Express response
   */
  addProductPost (req, res) {
    const body = req.body
    console.log('addProduct POST body:', body)
    // TODO: add the product to the session/order storage
    res.json({ status: 'ok', added: body })
  }
}
