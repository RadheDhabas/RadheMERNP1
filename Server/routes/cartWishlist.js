import express from 'express';
import { fetchUser } from '../middleware/fetchUser.js';
import { addInWishlistController, getShowWishlistController, getWishlistController } from '../controller/cartWishlistController.js';

const router = express.Router();
router.get('/wishlist',fetchUser,getWishlistController);
router.get('/my-wishlist',fetchUser,getShowWishlistController);
router.put('/wishlist',fetchUser,addInWishlistController);

export default router;