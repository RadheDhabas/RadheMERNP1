import React, { useContext, useEffect } from 'react'
import Layout from './Layout/Layout'
import '../CSS/cartpage.css'
import { CartContext } from '../Context/cartContext'
import { useNavigate, Link } from 'react-router-dom';
import { IncreaseQnty, DecreaseQnty, ResetCart, RemoveItem, CartQuantity } from '../Redux/Reducers/cartSlice'
// import {handleCheckout} from '../Helperfuns/RazorpayCheckout'
import { useDispatch, useSelector } from 'react-redux';
function Cart() {
  const { handleCheckout } = useContext(CartContext);
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart);
  const auth = useSelector(state=>state.auth);
  const dispatch = useDispatch();
  let cartQuantity = cart.reduce((a, b) => a + b.quantity, 0);
  let cartValue = cart.reduce((a, b) => a + b.quantity * b.price, 0)

  return (
    <Layout>
      {cartQuantity > 0 ?
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {cart && cart.map(i =>
                <div className="row mt-3 align-items-center" key={i._id}>
                  <div className="col-3">
                    <Link className="product_image" to={`/product/${i.slug}`}>
                      <img src={i.photo} className='img-fluid' alt="" />
                    </Link>
                  </div>
                  <div className="col-5">
                    <p>
                      {i.name}
                    </p>
                    <div className="row">
                      <div className="col-5">
                        <button onClick={(() => dispatch(RemoveItem(i)))}>Remove</button>
                      </div>
                      <div className="col-7">
                        <button onClick={() => dispatch(DecreaseQnty(i))}>-</button>
                        {i.quantity}
                        <button onClick={() => dispatch(IncreaseQnty(i))}>+</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    {(i.price * i.quantity).toLocaleString("en-US", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </div>
                </div>
              )}
            </div>
            <div className="col-lg-4">
              <div className="checkout">
                <div className="total">
                  <div>
                    <div className="Subtotal">Sub-Total</div>
                    <div className="items">{cartQuantity} {(cartQuantity > 1) ? "Items" : "item"}</div>
                  </div>
                  <div className="total-amount">{cartValue}</div>
                </div>
                <button className="button" onClick={() => handleCheckout()}>Checkout</button>
                <button className="button" onClick={() => dispatch(ResetCart())}>reset cart</button>
              </div>
            </div>
          </div> 
        </div >
        :
        <div className='container'>
          <div className="empty_cart">
            <div className='empty_cart_img'>
              <img src="https://images.bewakoof.com/images/doodles/empty-cart-page-doodle.png" title="Empty Cart Page Doodle" alt="Empty Cart Page Doodle" width="150px" />
            </div>
            <div className="empty_cart_text">Nothing in the bag!</div>
            <button className='start_shoping_btn' onClick={() => navigate('/')}>
              Start Shoping
            </button>
          </div>
        </div>
      }
    </Layout >
  )
}

export default Cart