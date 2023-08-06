import axios from "axios";
import { createContext, useEffect, useState } from "react";
const WishlistContext = createContext();
const WishlistProvider = ({ children }) => {

    const [wishlist, setWishlist] = useState([]);
    const updateWishlist = (p_id)=>{
        let itempresent = wishlist.includes(p_id);
        if (itempresent) {
            let new_wl = wishlist.filter(i => i !== p_id);
            setWishlist(new_wl);
        }
        else { 
            setWishlist([...wishlist,p_id]);
        }
       

    }
    useEffect(()=>{
        console.log(wishlist)
    },[wishlist.length])
    return (
        <WishlistContext.Provider value={{ wishlist, setWishlist, updateWishlist }}>
            {children}
        </WishlistContext.Provider>
    )
}
export { WishlistContext, WishlistProvider };