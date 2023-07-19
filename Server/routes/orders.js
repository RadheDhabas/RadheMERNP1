import express, { Router } from 'express';
import { getOrderController } from '../controller/orderController.js';
import { fetchUser } from '../middleware/fetchUser.js';
const router = express.Router();

router.get('/buyer-order',fetchUser,getOrderController);

export default router;