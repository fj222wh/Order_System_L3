/**
 * The controller for the API handling the logic between front end and back end.
 *
 * @author Filippa Johansson
 * @version 1.0.0
 */

import { allProductsFromCatalog, store } from '../data/storeData.js'
import { Order } from '../logic/Order.js'
import { ModelInvoice } from '../logic/ModelInvoice.js'
import { InvoiceView } from '../logic/InvoiceView.js'
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
   * Returns data about the order.
   *
   * @param {object} req The request object.
   * @param {object} res The response object.
   */
  getOrderData (req, res) {
    const order = this.#getOrderFromSession(req)

    const data = {
      orderTotalPrice: order.calculateTotalPrice(),
      orderItems: order.toJSON(),
      orderNumber: order.getOrderNumber()
    }

    res.json(data)
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
      res.json('Product has been added to the order')
    } else {
      throw new Error('Failed to add the item to the order')
    }
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
    const invoiceModel = new ModelInvoice(order, req.body.fullName, req.body.email, '€')
    const view = new InvoiceView(invoiceModel)
    const invoiceHTML = view.createInvoice()
    res.json(invoiceHTML)
  }
}
