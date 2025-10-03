/**
 * The start of the application.
 *
 * @author Filippa Johansson
 * @version 1.0.0
 */

import express from 'express'
import expressLayouts from 'express-ejs-layouts'
import logger from 'morgan'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { router } from './routes/router.js'
import session from 'express-session'
import { sessionOptions } from './config/sessionOptions.js'
import { errorHandler } from './middleware/errorhandler.js'
import { helmetCSP } from './middleware/helmetCSP.js'

try {
  // Create the express application.
  const app = express()

  // The name of the directory of this module's path.
  const directoryFullName = dirname(fileURLToPath(import.meta.url))

  // Sets the base URL, all links are relative to this URL.
  const baseURL = process.env.BASE_URL || '/'

  // We want to use morgan for loggin the HTTP traffic.
  app.use(logger('dev'))

  // Secure app by setting HTTP response headers.
  app.use(helmetCSP)

  // Configuration of view engine.
  app.set('view engine', 'ejs')
  app.set('views', join(directoryFullName, 'views'))
  app.use(expressLayouts)
  app.set('layout', join(directoryFullName, 'views', 'layouts', 'default'))

  app.use(express.urlencoded({ extended: false }))

  // Serve the static files
  app.use(express.static(join(directoryFullName, '..', 'public')))

  // Setup and use session middleware (https://github.com/expressjs/session)
  if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1) // trust first proxy
  }

  // The config for sessions
  app.use(session(sessionOptions))

  app.use((req, res, next) => {
    // Flash messages - survives only a round trip.
    if (req.session.flash) {
      res.locals.flash = req.session.flash
      delete req.session.flash
    }

    res.locals.baseURL = baseURL
    next()
  })

  // The registered routes
  app.use('/', router)

  // Error handler
  app.use(errorHandler)

  // Start the HTTP listening for connections.
  app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
    console.log('Press Ctrl-C to terminate...')
  })
} catch (error) {
  console.error(error)
  process.exitCode = 1
}
