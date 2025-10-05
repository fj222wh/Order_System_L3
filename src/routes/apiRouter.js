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

router.get('/products', (req, res) => controller.getProducts(req, res))
router.get('/add/:id', (req, res) => controller.addProduct(req, res))
router.post('/add', (req, res) => controller.addProductPost(req, res))
