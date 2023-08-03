import axios from "axios";
import { createContext, useEffect, useState } from "react";
const WishlistContext = createContext();
const WishlistProvider = ({ children }) => {

    const [wishlist, setWishlist] = useState([]);
    useEffect(() => {
        // console.log(wishlist);
    }, [wishlist]);

    const updateWishlist = async (p_id) => {
        let itempresent = wishlist.indexOf(p_id);
        console.log(itempresent);
        if (itempresent>=0) { 
            let new_wl = wishlist.filter(i => i != p_id);
            setWishlist(new_wl);
        }
        else { 
            wishlist.push(p_id);
        }  
    }
    return (
        <WishlistContext.Provider value={{ wishlist, setWishlist, updateWishlist }}>
            {children}
        </WishlistContext.Provider>
    )
}
export { WishlistContext, WishlistProvider };