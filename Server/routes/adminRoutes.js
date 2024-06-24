import express from 'express'

import { getAllOrders, updateStatus } from '../controller/AdminController.js'
import { fetchUser, isAdmin } from '../middleware/fetchUser.js'

const router = express.Router()

// get all buyers orders
router.get('/orders',fetchUser,isAdmin,getAllOrders)

// update order status
router.put('/:orderId',fetchUser,isAdmin,updateStatus)
export default router