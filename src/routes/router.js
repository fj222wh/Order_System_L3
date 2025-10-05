/**
 * The main router.
 *
 * @author Filippa Johansson
 * @version 1.0.0
 */

import express from 'express'
import { router as homeRouter } from './homeRouter.js'
import { router as storeRouter } from './storeRouter.js'
import { router as ApiRouter } from './apiRouter.js'

export const router = express.Router()

// The home router controls the routing on the '/' path.
router.use('/', homeRouter)
router.use('/store', storeRouter)
router.use('/api', ApiRouter)

// General catch all errors.
router.use('*', (req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
