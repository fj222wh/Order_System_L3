/**
 * The controller for the API handling the logic between front end and back end.
 *
 * @author Filippa Johansson
 * @version 1.0.0
 */

import { allProductsFromCatalog, store } from '../data/storeData.js'
import { Order } from '../logic/Order.js'

/**
 *
 */
export class ApiController {
  /**
   * Returns the order from a session.
   *
   * @param {object} req The request object.
   * @returns {Order} Returns an order
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

    const id = Number(body.id)
    const product = allProductsFromCatalog.findProduct(id)
    if (product) {
      order.addOrderItem(product)
    } else {
      throw new Error('Failed to add the item to the order')
    }

    const data = {
      orderTotalPrice: order.calculateTotalPrice(),
      orderItems: order.toJSON()
    }

    res.json(data)
  }

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
   * Get all products from a category.
   *
   * @param {object} req The request object.
   * @param {object} res The response object.
   */
  getProductsFromCategory (req, res) {
    const category = req.params.category
    const productsFromCategory = allProductsFromCatalog.getProductsFromCategory(category)

    res.json(productsFromCategory)
  }

  /**
   * Creates a new order.
   *
   * @param {object} req The request object.
   * @param {object} res The response object.
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
   * Removes an order item from the order.
   *
   * @param {object} req The request object.
   * @param {object} res The response object.
   */
  removeOrderItem (req, res) {
    const id = Number(req.params.orderItemId)
    const order = this.#getOrderFromSession(req)
    order.removeOrderItem(id)

    res.json({
      message: 'The order item has been removed from the order',
      totalPrice: order.calculateTotalPrice()
    })
  }

  /**
   * Creates the HTML invoice.
   *
   * @param {object} req The request object.
   * @param {object} res The response object.
   */
  createInvoice (req, res) {
    const order = this.#getOrderFromSession(req)
    const invoiceHTML = order.createInvoice(req.body.fullname, req.body.email, '€')

    res.json(invoiceHTML)
  }
}
