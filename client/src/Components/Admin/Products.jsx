import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
import AdminMenu from "../Layout/AdminMenu";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [updateItem,setUpdateItem]= useState('');
  useEffect(() => {
    getProducts();
  }, []);
  // get all products
  const getProducts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_USER_AUTH}/api/product/all-products`
      );
      if (response.status == 200) {
        setProducts(response.data?.products);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>All Product</h1>
            <div className="row">
              {
                products && products.map(product=> 
                  <div
                  className="col-lg-3 col-md-4 col-6"
                  key={product._id} >

                  <div className="product_card">
                    <Link className="product_image" to={`/admin/product/manage/${product.slug}`}>
                      <img
                        src={product.photo}
                        className="img-fluid"
                        alt={product.name}
                      />
                    </Link>

                    <div className="p_details" >
                      <p className="brand">{product.product_brand}</p>
                      <p className="p-name">{product.name}</p>
                      <p className="p-price pb-2">Rs. {product.price} </p>
                      <Link className="header_login_btn" to={`/admin/product/manage/${product.slug}`}>
                        Manage
                      </Link>
                    </div>
 
                  </div>
                </div>
               )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Products;
