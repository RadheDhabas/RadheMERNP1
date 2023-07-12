import React, { useContext, useEffect } from 'react'
import Layout from './Layout/Layout'
import '../CSS/cartpage.css'
import { CartContext } from '../Context/cartContext'
import { useNavigate } from 'react-router-dom';
function Cart() {
  const { cart, setCart, IncreaseQnty, DecreaseQnty, ResetCart, RemoveItem, cart_value, cart_quantity } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <Layout>
      {cart_quantity() > 0 ?
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {cart && cart.map(i =>
                <div className="row mt-3 align-items-center" key={i._id}>
                  <div className="col-3">
                    <img src={i.photo} className='img-fluid' alt="" />
                  </div>
                  <div className="col-5">
                    <p>
                      {i.name}
                    </p>
                    <div className="row">
                      <div className="col-5">
                        <button onClick={(() => RemoveItem(i))}>Remove</button>
                      </div>
                      <div className="col-7">
                        <button onClick={() => DecreaseQnty(i)}>-</button>
                        {i.quantity}
                        <button onClick={() => IncreaseQnty(i)}>+</button>
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
                    <div className="items">{cart_quantity()} {cart_quantity > 1 ? "Items" : "item"}</div>
                  </div>
                  <div className="total-amount">{cart_value()}</div>
                </div>
                <button className="button">Checkout</button></div>
            </div>
          </div>
        </div >
        :
        <div className='container'>
          <div className='text-center'>
            <p>
              There is nothing in your bag. Let's add some items.
            </p>
            <button onClick={() => navigate('/')}>
              Start Shoping
            </button>
          </div>
        </div>
      }
    </Layout >
  )
}

export default Cart