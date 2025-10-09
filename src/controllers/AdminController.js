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
}
