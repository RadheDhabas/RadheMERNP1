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
        `${process.env.REACT_APP_USER_AUTH}/api/product/all-products`
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
              <div className="col-lg-3 col-md-4 col-6 mb-3" key={product._id}>
                <div className="product_card card">
                  <Link
                    to={`/admin/product/manage/${product.slug}`}
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
                    <p> {product.price} </p>
                  </Link>
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
