/**
 * The admin controller
 */

/**
 *
 */
export class AdminController {
  /**
   *
   * @param req
   * @param res
   * @param next
   */
  index (req, res, next) {
    res.render('admin/index')
  }

  /**
   *
   * @param req
   * @param res
   * @param next
   */
  getProductcatalog (req, res, next) {
    res.render('admin/productcatalog')
  }
}
