import React, { useEffect, useState } from "react";
import Layout from "./Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import '../CSS/ProductDetail.css'
import { addToCart } from '../Redux/Reducers/cartSlice'
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { addToWishlist, removeFromWishlist } from "../Redux/Reducers/wishlistSlice";

function ProductDetails() {
  const [product, setProduct] = useState({});
  const [similarProduct, setSimilarProduct] = useState([]);
  const cart = useSelector(state => state.cart);
  const auth = useSelector(state => state.auth);
  const wishlist = useSelector(state => state.wishlist);
  const dispatch = useDispatch();
  const prams = useParams();
  const navigate = useNavigate();
  const userId = auth?.user?._id;

  useEffect(() => {
    getSingleProduct();
  }, [prams?.slug]);
  // get single product by id or slug
  const getSingleProduct = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_USER_AUTH}/api/product/${prams.slug}`
    );
    setProduct(data.product);
    getSimilarProduct(data?.product._id, data?.product.category._id);
  };

  // get similar product
  const getSimilarProduct = async (prodId, category) => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_USER_AUTH}/api/product/similar-product/${prodId}/${category}`
    );
    setSimilarProduct(data?.products);
  };
  // update wishlist
  const updateWishlist = (productId) => {
    const check_wl = wishlist?.some(i => i._id === productId);
    check_wl ? dispatch(removeFromWishlist({ userId, productId }))
      : dispatch(addToWishlist({ userId, productId }))
  }

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-5">
            <div className="pd_img">
              <img src={product.photo} alt={product.slug} className="img-fluid" />
            </div>
          </div>
          <div className="col-md-6 col-lg-7">
            <h1 className="pd_brand">{product.product_brand}</h1>
            <h2 className="pd_name">{product.name}</h2>
            <p className="pd_desc">Description: {product.description}</p>
            <p className="pd_price">Price: ₹{product.price}</p>
            <p className="pd_inclusive">inclusive of all taxes</p>
            <div className="buttons">
              <button onClick={() => dispatch(addToCart(product))} className="add_to_cart_btn">Add to cart</button>
              <button className={`add_to_wl ${wishlist?.some(i => i._id == product._id) ? "wishlisted" : ''}`} onClick={() => { auth?.user ? updateWishlist(product._id) : navigate('/login') }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="_1l0elc" width="28" height="28" viewBox="0 0 20 16"><path d="M8.695 16.682C4.06 12.382 1 9.536 1 6.065 1 3.219 3.178 1 5.95 1c1.566 0 3.069.746 4.05 1.915C10.981 1.745 12.484 1 14.05 1 16.822 1 19 3.22 19 6.065c0 3.471-3.06 6.316-7.695 10.617L10 17.897l-1.305-1.215z" fill="" className="eX72wL" stroke="#FFF" fillRule="evenodd" opacity=".9"></path></svg>
              </button>
            </div>
          </div>
        </div>

        <div className="row mt-4 mb-4">
          <h2 className="all_product_heading">Similar Category Products</h2>
          {
            similarProduct && similarProduct.map((product) => (
              <div
                className="col-lg-3 col-md-4 col-6"
                key={product._id} >

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

                  <button className={`whislist_btn ${wishlist?.some(i => i._id == product._id) ? "wishlisted" : ''}`} onClick={() => { auth?.user ? updateWishlist(product._id) : navigate('/login') }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="_1l0elc" width="28" height="28" viewBox="0 0 20 16"><path d="M8.695 16.682C4.06 12.382 1 9.536 1 6.065 1 3.219 3.178 1 5.95 1c1.566 0 3.069.746 4.05 1.915C10.981 1.745 12.484 1 14.05 1 16.822 1 19 3.22 19 6.065c0 3.471-3.06 6.316-7.695 10.617L10 17.897l-1.305-1.215z" fill="" className="eX72wL" stroke="#FFF" fillRule="evenodd" opacity=".9"></path></svg>
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
}

export default ProductDetails;
