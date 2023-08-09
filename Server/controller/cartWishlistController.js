import User from '../models/User.js'; 

// get wishlist 
export const getWishlistController = async (req, res) => {
    try {
        const userId = req.user.id;
        const wishlist = await User.findById(userId,{"wishlist":1});
        res.status(200).send({ data: wishlist });
    } catch (error) {
        console.error("Error occured while fatching wishlist " + error);
    }
}
export const addInWishlistController = async (req, res) => {
    try {
        const userId = req.user.id;
        const { data } = req.body;
        let user_wl = await User.findByIdAndUpdate(userId,{wishlist:data});
         
        res.status(200).send({ message: "Wishlist updated" });  
    } catch (error) {
        console.error("Error while updating wishlist " + error)
    }

}
export const getShowWishlistController = async (req, res) => {
    try {
        const userId = req.user.id;
        const wishlist = await User.findById(userId,{"wishlist":1}).populate("wishlist");
        res.status(200).send({ data: wishlist });
    } catch (error) {
        console.error("Error occured while fatching wishlist " + error);
    }
}