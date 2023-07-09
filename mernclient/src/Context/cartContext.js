import { createContext, useState } from "react";

const CartContext = createContext();
const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const addTOCart = (item)=>{
        setCart(cart.push(item));
    }
    return (
        <CartContext.Provider value={{cart, setCart,addTOCart}}>
            {children}
        </CartContext.Provider>
    )
}
export { CartContext, CartProvider }