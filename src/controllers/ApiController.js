/**
 *
 */

import { allProductsFromCatalog, store } from '../data/storeData.js'

/**
 *
 */
export class ApiController {
  /**
   * Gets the order from a session
   *
   * @param req
   */
  #getOrderFromSession (req) {
    if (!req.session.orderNumber) {
      const order = store.createOrder()
      req.session.orderNumber = order.getOrderNumber()

      return order
    } else {
      return store.findOrder(Number(req.session.orderNumber))
    }
  }

  /**
   * Returns information about products and totalPrice.
   *
   * @param {object} req The request object.
   * @param {object} res The response object.
   */
  getData (req, res) {
    const order = this.#getOrderFromSession(req)

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
    const order = this.#getOrderFromSession(req)

    const body = req.body
    // console.log('addProduct POST body:', body)
    // TODO: add the product to the session/order storage

    const id = Number(body.id)

    const product = allProductsFromCatalog.findProduct(id)
    if (product) {
      order.addOrderItem(product)
    }

    const data = {
      orderTotalPrice: order.calculateTotalPrice(),
      orderItems: order.toJSON()
    }

    // console.log(data)
    res.json(data)
  }

  // TODO: Add function to update products? Send that data...we need it for add, delete, update quantity etc...

  /**
   * Empty cart.
   *
   * @param {object} req The request object.
   * @param {object} res The response object.
   */
  emptyCart (req, res) {
    const order = this.#getOrderFromSession(req)
    order.clearCart()
    res.json('Cart has been cleared')
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

  /**
   *
   * @param req
   * @param res
   */
  createNewOrder (req, res) {
    delete req.session.orderNumber
    const order = this.#getOrderFromSession(req)
    const newOrderNumber = order.getOrderNumber()

    res.json({
      orderNumber: newOrderNumber
    })
  }

  /**
   *
   * @param req
   * @param res
   */
  removeOrderItem (req, res) {
    const id = req.params.orderItemId

    const order = this.#getOrderFromSession(req)

    console.log(order.getOrderItemsInCart())
    console.log('ID TO REMOVE ' + id)
    console.log(order.findIndex(id))
    // order.removeOrderItem(id)

    const totalPrice = order.calculateTotalPrice()

    // TO DO: SEND NEW PRICE
    res.json({
      message: 'DELETED AND UJPDATEPRICE',
      totalPrice
    })
  }
}
