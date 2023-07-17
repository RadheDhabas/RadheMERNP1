import express from 'express';
import { paymentOrderController, paymentVerifyController } from '../controller/paymentController.js';
import { fetchUser } from '../middleware/fetchUser.js';


const router = express.Router();

router.post('/orders',paymentOrderController)
router.post('/verify',fetchUser,paymentVerifyController)

export default router;