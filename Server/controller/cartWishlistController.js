import Cart from '../models/CartModel.js';
import Wishlist from '../models/WishlistModel.js';

// get wishlist 
export const getWishlistController = async (req, res) => {
    try {
        const userId = req.params.userId;
        
        const wishlist = await Wishlist.findOne({ user: userId }).populate('products')

        if (!wishlist) {
            await Wishlist.create({ user: userId, products: [] })
        }
        await wishlist.populate('products');
        res.status(200).send(wishlist);
    } catch (error) {
        console.error("Error occured while fatching wishlist " + error);
        res.status(200).send('Wishlist does not exist');
    }
}
export const addInWishlistController = async (req, res) => {
    try {
        const { userId } = req.params;
        const { productId } = req.body;
        const wishlist = await Wishlist.findOne({ user: userId })
        if (!wishlist.products.includes(productId)) {
            wishlist.products.push(productId)
            await wishlist.save();
        }
        await wishlist.populate('products');
        res.status(200).send({ wishlist });
    } catch (error) {
        console.error("Error while adding item wishlist " + error)
    }

}

export const removeFromWishlistController = async (req, res) => {
    try {
        const { userId } = req.params;
        const { productId } = req.body;
        const wishlist = await Wishlist.findOneAndUpdate(
            { user: userId },
            { $pull: { products: productId } },
            { new: true }
        );
        await wishlist.populate('products');
        res.status(200).send({ wishlist });
    } catch (error) {
        console.error("Error occured while removing item from from wishlist " + error);
    }
}

// Cart Operation
export const getCartItemsController = async (req, res) => {
    try {
        const userId = req.params.userId;
        const cart = await Cart.findOne({ user: userId }).populate('products')
        if (!cart) {
            await Cart.create({ user: userId, products: [] })
        }
        await cart.populate('products');
        res.status(200).send(cart);
    } catch (error) {
        console.error("Error occured while fatching cart " + error);
        res.status(200).send('cart does not exist');
    }
}