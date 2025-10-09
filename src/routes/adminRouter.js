/**
 *
 */
import { Router } from 'express'
import { AdminController } from '../controllers/AdminController.js'

export const router = new Router()
const controller = new AdminController()

router.get('/', (req, res) => controller.index(req, res))
