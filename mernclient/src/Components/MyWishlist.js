import React, { useEffect } from 'react'
import Layout from "./Layout/Layout";
import '../CSS/Wishlist.scss'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../Redux/Reducers/wishlistSlice';

function MyWishlist() {
  const auth = useSelector(state=>state.auth);
  const dispatch = useDispatch();
  const userId = auth?.user?._id;
  const wishlist = useSelector(state=>state.wishlist)
  const navigate = useNavigate();
  const updateWishlist = (productId)=>{
    const check_wl = wishlist?.some(i=>i._id===productId);
    check_wl ? dispatch(removeFromWishlist({ userId, productId }))
      : dispatch(addToWishlist({userId, productId }))
    }
    
  return (
    <Layout>
      <div className="container">
        <h1 className='wishlist_header'>My Wishlist ({wishlist.length} Item{wishlist.length > 1 ? 's' : ''})</h1>
        <div>
          {wishlist.length > 0 ?
            <div className="row">
              {wishlist.map(product =>
                <div className="col-md-4 col-lg-3 col-6" key={product._id}>
                  <div className="product_card">
                    <Link className="product_image" to={`/product/${product.slug}`}>
                      <img
                        src={product.photo}
                        className="img-fluid"
                        alt={product.name}
                      />
                    </Link>

                    <Link className="p_details" to={`/product/${product.slug}`}>
                      <p className="brand">{product.product_brand}</p>
                      <p className="p-name">{product.name}</p>
                      <p className="p-price">Rs. {product.price} </p>
                    </Link>

                    <button className={`whislist_btn ${wishlist?.some(i=>i._id==product._id) ? "wishlisted" : ''}`} onClick={() => { auth?.user ? updateWishlist(product._id) : navigate('/login') }}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="_1l0elc" width="28" height="28" viewBox="0 0 20 16"><path d="M8.695 16.682C4.06 12.382 1 9.536 1 6.065 1 3.219 3.178 1 5.95 1c1.566 0 3.069.746 4.05 1.915C10.981 1.745 12.484 1 14.05 1 16.822 1 19 3.22 19 6.065c0 3.471-3.06 6.316-7.695 10.617L10 17.897l-1.305-1.215z" fill="" className="eX72wL" stroke="#FFF" fillRule="evenodd" opacity=".9"></path></svg>
                        </button>
                  </div>
                </div>
              )}
            </div>
            :
            <div className="row">
              <div className="col-12">
                Nothing in wishlist...
              </div>
              <div className="col-12">
                <button onClick={() => navigate('/')}>
                  Start Shoping
                </button>
              </div>
            </div>
          }
        </div>
      </div>
    </Layout>
  )
}

export default MyWishlist