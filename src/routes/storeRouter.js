/**
 * The store router.
 *
 * @author Filippa Johansson
 * @version 1.0.0
 */

import express from 'express'
import { StoreController } from '../controllers/StoreController.js'

export const router = express.Router()
const controller = new StoreController()

router.get('/', (req, res, next) => controller.index(req, res, next))
