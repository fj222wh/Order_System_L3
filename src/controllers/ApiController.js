/**
 *
 */

import { allProductsFromCatalog, order } from '../data/storeData.js'

/**
 *
 */
export class ApiController {
  /**
   * Returns information about products and totalPrice.
   *
   * @param {object} req The request object.
   * @param {object} res The response object.
   */
  getData (req, res) {
    const firstCategory = allProductsFromCatalog.getCategories()[0]
    res.json({
      // products: allProductsFromCatalog,
      products: allProductsFromCatalog.getProductsFromCategory(firstCategory),
      orderNumber: order.getOrderNumber(),
      orderTotalPrice: order.calculateTotalPrice(),
      orderItems: order.toJSON(),
      categories: allProductsFromCatalog.getCategories()
    })
  }

  /**
   * Adds a product to the order.
   *
   * @param {object} req The request object.
   * @param {object} res The response object.
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

  /**
   * Empty cart.
   *
   * @param {object} req The request object.
   * @param {object} res The response object.
   */
  emptyCartPut (req, res) {
    order.clearCart()
    res.json('EMPTY CART')
  }

  /**
   *
   * @param req
   * @param res
   */
  getProductsFromCategory (req, res) {
    const category = req.params.category
    const productsFromCategory = allProductsFromCatalog.getProductsFromCategory(category)

    res.json(productsFromCategory)
  }
}
