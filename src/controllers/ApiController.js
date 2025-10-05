/**
 *
 */

import { allProductsFromCatalog, order } from '../data/storeData.js'

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
    res.json({
      products: allProductsFromCatalog,
      orderNumber: order.getOrderNumber()
    })
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

    const id = Number(body.id)
    console.log(id)

    const product = allProductsFromCatalog.findProduct(id)
    if (product) {
      order.addOrderItem(product)
    }

    const data = {
      orderTotalPrice: order.calculateTotalPrice(),
      orderItems: order.toJSON()
    }

    console.log(data)
    res.json(data)
  }

  // TODO: Add function to update products? Send that data...we need it for add, delete, update quantity etc...
}
