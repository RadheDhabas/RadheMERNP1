import mongoose from "mongoose";

const WishlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.ObjectId,
        ref: 'User',
    },
    wishlist: [
        {
            type: mongoose.ObjectId,
            ref: 'Product'
        }
    ]
})

const Wishlist = new mongoose.model('Wishlist',WishlistSchema);
export default Wishlist;