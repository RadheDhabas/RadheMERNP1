import React, { useContext, useEffect, useState } from "react";
import Layout from "./Layout/Layout";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../Context/cartContext";

function ProductDetails() {
  const [product, setProduct] = useState({});
  const [similarProduct, setSimilarProduct] = useState([]);
const {cart,setCart,addToCart} = useContext(CartContext);

  const prams = useParams();
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

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <img src={product.photo} alt={product.slug} className="img-fluid" />
          </div>
          <div className="col-md-6">
            <h1>{product.name}</h1>
            <p>Description: {product.description}</p>
            <p>Price: ₹{product.price}</p>
            <div className="buttons">
              <button onClick={()=>addToCart(product)}>Add to cart</button>
              <button>Add to Wishlist</button>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <h2>Similar Products</h2> 
          {
            similarProduct && similarProduct.map((product) => (
              <div
                className="col-lg-3 col-md-4 col-6 mb-3"
                key={product._id}
              >
                <div className="product_card card">
                  <Link
                    to={`/product/${product.slug}`}
                    className="product-link"
                  >
                    <div>
                      <img
                        src={product.photo}
                        className="img-fluid"
                        alt={product.name}
                      />
                    </div>
                    <p>{product.name}</p>
                    <p>Rs. {product.price} </p>
                  </Link>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </Layout>
  );
}

export default ProductDetails;
