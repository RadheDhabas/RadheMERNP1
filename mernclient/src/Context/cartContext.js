import { createContext, useEffect, useState } from "react";

const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  useEffect(()=>{
    let cart_exist = JSON.parse(localStorage.getItem('cart'));
    if(cart_exist){ 
      setCart(cart_exist); 
    }
    },[])
  const addToCart = (item) => {
    const itemInCart = cart.find(i => i._id == item._id);
    if (itemInCart) {
      setCart(
        cart.map(i => (i._id == item._id) ? { ...i, quantity: i.quantity + 1 } : { ...i })
      )
    }
    else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    localStorage.setItem('cart',JSON.stringify(cart));
  }
  const IncreaseQnty = (item)=>{
   setCart(cart.map(i=>(i._id===item._id)?{...i, quantity:i.quantity+1}:{...i}));
 
  }
  const DecreaseQnty = (item)=>{
   let upd_cart= cart.map(i=>(i._id===item._id && i.quantity>1)?{...i, quantity:i.quantity-1}:{...i});
   setCart(upd_cart); 
  }
  const RemoveItem = (item)=>{
    let upd_cart = cart.filter(i=>i._id!==item._id );
    setCart(upd_cart);
    
  }
  const ResetCart = ()=>{
    setCart([]);
    localStorage.removeItem("cart");  }
  const cart_quantity = ()=>{
    return cart.reduce((a,b)=>b.quantity+a,0);
  }
  const cart_value = ()=>{
    let total_value =cart.reduce((a,b)=>b.price*b.quantity+a,0);
    return  total_value.toLocaleString("en-US", {
      style: "currency",
      currency: "INR",
  })}

  useEffect(()=>{
    if(cart.length>0){
      localStorage.setItem('cart',JSON.stringify(cart))}
    },[cart_quantity])
 
  return (
    <CartContext.Provider value={{ cart, setCart, addToCart,IncreaseQnty,DecreaseQnty,ResetCart,RemoveItem,cart_quantity,cart_value }}>
      {children}
    </CartContext.Provider>
  )
}
export { CartContext, CartProvider }