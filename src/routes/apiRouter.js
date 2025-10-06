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

router.get('/products', (req, res) => controller.getData(req, res))
router.post('/order/add', (req, res) => controller.addProductPost(req, res))
router.put('/order/empty', (req, res) => controller.emptyCartPut(req, res))
