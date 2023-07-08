import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout/Layout";
import { AuthContext } from "../Context/authContext";
import axios from "axios";
import { Prices } from "./PriceFilter";
import Home_banner from "../elements/Home_banner";

function Home() {
  const [auth, setAuth] = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterCat, setFilterCat] = useState([]);
  const [filterPrice, setFilterPrice] = useState([]);
  useEffect(() => {
    getProducts();
    getAllCategory();
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
  //get all cat
  const getAllCategory = async () => {
    try {
      const categories = await axios.get(
        `${process.env.REACT_APP_USER_AUTH}/api/category/get-categories`
      );
      setCategories(categories?.data?.categories);
    } catch (error) {
      console.log(error);
    }
  };

  // filter by category
  const handleFilter = (value, id) => {
    let all = [...filterCat];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setFilterCat(all);
  };
  // filter by price
  const handlePriceFilter = (value, arr) => {
    let all = [...filterPrice];
    if (value) {
      all.push(arr);
    } else {
      all = all.filter((c) => c !== arr);
    }
    setFilterPrice(all);
  };
  // filter product use with useeffect
  useEffect(() => {
    if (filterCat.length || filterPrice.length) {
      filterProduct();
    } else {
      getProducts();
    }
  }, [filterCat.length, filterPrice.length]);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_USER_AUTH}/api/product/filter-products`,
        {
          filterCat,
          filterPrice,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // clear filter function
  const clearFilter = async()=>{
    setFilterCat([]);
    setFilterPrice([]);
    const check_boxes = document.querySelectorAll(".filter_container input[type=checkbox]");
    check_boxes.forEach(i=>i.checked=false)
  }
 
  return (
    <Layout> 
      <Home_banner></Home_banner>
      <div className="product_listing">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
       <div className="d-flex justify-content-between"> 
       <h3>Filter</h3>
      {(filterCat.length || filterPrice.length)?<button className="btn btn-danger" onClick={clearFilter}>Clear</button>:""}
       </div>
       <div className="filter_container">
            <p className="my-2">Category</p>
            {categories?.map((i) => (
              <div key={i._id}>
                <input
                  type="checkbox" 
                  onChange={(e) => handleFilter(e.target.checked, i._id)}
                />
                <label>{i.name}</label>
              </div>
            ))}
            <p className="pt-4">Price</p>
            {Prices?.map((price) => (
              <div key={price._id}>
                <input
                  type="checkbox" 
                  onChange={(e) =>
                    handlePriceFilter(e.target.checked, price.array)
                  }
                />
                <label>{price.name}</label>
              </div>
            ))}
            </div>
          </div>
          <div className="col-md-9">
            <h1>All Product</h1>
            <div className="row">
              {products &&
                products.map((product) => (
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
                ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </Layout>
  );
}

export default Home;
