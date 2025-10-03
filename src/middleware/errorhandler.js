/**
 * Handling all errors in the application.
 *
 * @param {Error} err The error object
 * @param {object} req The request object.
 * @param {object} res The response object.
 * @param {Function} next The next middleware function.
 */
export function errorHandler (err, req, res, next) {
  // If something goes wrong and the statuscode is 404, the 404.html page will be rendered on the client.
  if (err.status === 404) {
    res
      .status(404)
    // .sendFile(join(directoryFullName, 'views', 'errors', '404.html'))
      .render('errors/404')

    return
  }

  if (err.status === 403) {
    res
      .status(403)
    // .sendFile(join(directoryFullName, 'views', 'errors', '403.html'))
      .render('errors/403')

    return
  }

  // If we are in production enviroment and something goes wrong, we don't want to show all the information about the error. Instead we want to show the 500 error page.
  if (process.env.NODE_ENV === 'production') {
    res
      .status(500)
      .render('errors/500')
    // .sendFile(join(directoryFullName, 'views', 'errors', '500.html'))
    return
  }

  // If we are in development we want to show the error.
  res
    .status(err.status || 500)
    .render('errors/error', { error: err })
}
