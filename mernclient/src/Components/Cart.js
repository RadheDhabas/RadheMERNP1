import React, { useState } from 'react'
import Layout from './Layout/Layout'
import '../CSS/cartpage.css'
// import { CartContext } from '../Context/cartContext'
import { useNavigate, Link } from 'react-router-dom';
import { IncreaseQnty, DecreaseQnty, ResetCart, RemoveItem, CartQuantity } from '../Redux/Reducers/cartSlice'
import { handleCheckout } from '../Helperfuns/RazorpayCheckout'
import { useDispatch, useSelector } from 'react-redux';
function Cart() {
  // const { handleCheckout } = useContext(CartContext);
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  let cartQuantity = cart.reduce((a, b) => a + b.quantity, 0);
  let cartValue = cart.reduce((a, b) => a + b.quantity * b.price, 0)
  const [loading, setLoading] = useState(false);
  const startCheckout = async () => {
    setLoading(true)
    await handleCheckout(cart, auth)
    setLoading(false)
  }
  return (
    <Layout>
      {cartQuantity > 0 ?
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className='cart_heading'>
                <span>My Bag</span> {cartQuantity} item{cartQuantity > 1 ? '(s)' : ''}
              </h1>
            </div>
            <div className="col-lg-7 col-md-8">

              {cart && cart.map(i =>
                <div class="cartProduct" key={i._id}>
                  <div class="cartProductInner">
                    <div class="item_detail_box">
                      <Link className='item_name' to={`/product/${i.slug}`}>
                        {i.name}
                      </Link>
                      <p className="price">
                        {(i.price * i.quantity).toLocaleString("en-US", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </p>
                      <div className='itm_qty'>
                        <span className='qty'>Qty: <span>{i.quantity}</span></span>
                        <button className='qty_btn' onClick={() => dispatch(DecreaseQnty(i))}>-</button>

                        <button className='qty_btn' onClick={() => dispatch(IncreaseQnty(i))}>+</button>
                      </div>
                    </div>
                    <div className='item_image_box'>
                      <Link className="product_image" to={`/product/${i.slug}`}>
                        <img src={i.photo} className='img-fluid' alt="" />
                      </Link>
                    </div>
                  </div>
                  <div className='remove_btn_box'>
                    <button className='remove_from_cart' onClick={(() => dispatch(RemoveItem(i)))}>Remove</button>
                  </div>
                </div>
              )}
            </div>
            <div className="col-lg-5 col-md-4">
              <div className="cart_details">
                <div className="price_summary">Price Summary</div>
                <div className='cd_box'>
                  <p className="total_items">Total Quantity</p> <p className="total_items"><span>{cartQuantity}</span> {(cartQuantity > 1) ? "Items" : "item"}</p>
                </div>
                <div className='cd_box'>
                <p className="total_items">Total MRP (Incl. of taxes):</p> <p className="total_items">{cartValue.toLocaleString("en-US", {
                          style: "currency",
                          currency: "INR",
                        })}</p>
                </div>
                <div className='cd_box'>
                  <p className="total_items">Delivery Fee</p> <p className="total_items green">FREE</p>
                </div>
                <div className='cd_box'>
                <p className="total_items">Bag Discount </p> <p className="total_items">{(0).toLocaleString("en-US", {
                          style: "currency",
                          currency: "INR",
                        })}</p>
                </div>

                <div className="cd_box stotal">
                  <p className="subtotal">
                  Subtotal 
                  </p>
                  <p className="subtotal">
                  {cartValue.toLocaleString("en-US", {
                          style: "currency",
                          currency: "INR",
                        })}
                  </p>
                </div>
                <div className="cd_box">
                <button className="checkout_btn" onClick={() => startCheckout()}>{!loading ? 'Checkout' : `Processing...`}</button>
                <button className="reset_cart" onClick={() => dispatch(ResetCart())}>Reset Cart</button>
                </div>
                
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