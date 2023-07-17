import { createContext, useEffect, useState } from "react";
import axios from 'axios';
const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let cart_exist = JSON.parse(localStorage.getItem('cart'));
    if (cart_exist) {
      setCart(cart_exist);
    }
  }, [])

  //  item add to cart
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
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // increment in cart item quantity
  const IncreaseQnty = (item) => {
    setCart(cart.map(i => (i._id === item._id) ? { ...i, quantity: i.quantity + 1 } : { ...i }));

  }
  // decrement in cart item quantity
  const DecreaseQnty = (item) => {
    let upd_cart = cart.map(i => (i._id === item._id && i.quantity > 1) ? { ...i, quantity: i.quantity - 1 } : { ...i });
    setCart(upd_cart);
  }

  // remove item from cart
  const RemoveItem = (item) => {
    let upd_cart = cart.filter(i => i._id !== item._id);
    setCart(upd_cart);

  }
  // reset cart
  const ResetCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  }
  const cart_quantity = () => {
    return cart.reduce((a, b) => b.quantity + a, 0);
  }
  // total cart value
  const cart_value = () => {
    let total_value = cart.reduce((a, b) => b.price * b.quantity + a, 0);
    return total_value.toLocaleString("en-US", {
      style: "currency",
      currency: "INR",
    })
  }

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }, [cart_quantity])

  // for payment handling
  const handleCheckout = async () => {
    try { 
      const response = (await axios.post(`${process.env.REACT_APP_USER_AUTH}/payment/orders`, { cart }));
      if (!response) {
        alert("Server error. Are you online?");
        return;
      }

      // Getting the order details back
      const { amount, id: order_id, currency } = response.data;

      const options = {
        key: "rzp_test_EdfFsmww3UNixU", // Enter the Key ID generated from the Dashboard
        amount: amount.toString(),
        currency: currency,
        name: "Bhaskar Ind.",
        description: "Test Transaction",
        //  image: { logo },
        order_id: order_id,
        handler: async function (response) {
          const data = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };
          
          const result = await axios.post(`${process.env.REACT_APP_USER_AUTH}/payment/verify`, data);

          alert(result.data.msg);

        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error(error);
    }

  };
  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, IncreaseQnty, DecreaseQnty, ResetCart, RemoveItem, cart_quantity, cart_value, handleCheckout }}>
      {children}
    </CartContext.Provider>
  )
}
export { CartContext, CartProvider }