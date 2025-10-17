/**
 * The main router.
 *
 * @author Filippa Johansson
 * @version 1.0.0
 */

import express from 'express'
import { router as storeRouter } from './storeRouter.js'
import { router as apiRouter } from './apiRouter.js'
import { router as adminRouter } from './adminRouter.js'

export const router = express.Router()

router.use('/', storeRouter)
router.use('/api', apiRouter)
router.use('/admin', adminRouter)

// General catch all errors.
router.use('*', (req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
