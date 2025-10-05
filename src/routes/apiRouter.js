/**
 * The home router.
 *
 * @author Filippa Johansson
 * @version 1.0.0
 */

import express from 'express'
import { ApiController } from '../controllers/ApiController.js'

export const router = express.Router()
const controller = new ApiController()

router.get('/products', (req, res, next) => controller.getProducts(req, res))
