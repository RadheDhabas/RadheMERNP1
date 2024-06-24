import express from 'express';
import { fetchUser } from '../middleware/fetchUser.js';
import { addInWishlistController, removeFromWishlistController, getWishlistController } from '../controller/cartWishlistController.js';

const router = express.Router();
router.get('/wishlist/:userId',getWishlistController);
router.post('/wishlist/:userId',addInWishlistController);
router.put('/wishlist/:userId',removeFromWishlistController);

export default router;