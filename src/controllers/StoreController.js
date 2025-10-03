/**
 * The store controller.
 *
 * @author Filippa Johansson
 * @version 1.0.0
 */
export class StoreController {
  /**
   * Redirects to the store page.
   *
   * @param {object} req The request object.
   * @param {object} res The response object.
   * @param {Function} next The next middleware function.
   */
  index (req, res, next) {
    res.render('store/index')
  }
}
