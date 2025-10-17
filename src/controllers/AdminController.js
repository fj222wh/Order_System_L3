/**
 * The admin controller
 *
 * @author Filippa Johansson
 * @version 1.0.0
 */
export class AdminController {
  /**
   * Renders the admin index.
   *
   * @param {object} req The request object.
   * @param {object} res The response object.
   * @param {Function} next The next middleware
   */
  index (req, res, next) {
    res.render('admin/index')
  }

  /**
   * Renders the productcatalog view.
   *
   * @param {object} req The request object.
   * @param {object} res The response object.
   * @param {Function} next The next middleware
   */
  getProductcatalog (req, res, next) {
    res.render('admin/productcatalog')
  }
}
