import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "./Layout/Layout";
import { AuthContext } from "../Context/authContext";
import axios from "axios";
import { Prices } from "./PriceFilter";
import Home_banner from "../elements/Home_banner";
import { CartContext } from "../Context/cartContext";

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterCat, setFilterCat] = useState([]);
  const [filterPrice, setFilterPrice] = useState([]);
  const [auth, setAuth ] = useContext(AuthContext);
  const { wishlist, setWishlist, updateWishlist} = useContext(CartContext);
  const navigate = useNavigate();
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
  const clearFilter = async () => {
    setFilterCat([]);
    setFilterPrice([]);
    const check_boxes = document.querySelectorAll(".filter_container input[type=checkbox]");
    check_boxes.forEach(i => i.checked = false)
  }

  return (
    <Layout>
      <Home_banner></Home_banner>
      <div className="product_listing">
        <div className="container my-4">
          <div className="row">
            <div className="col-md-3">
              <div className="d-flex justify-content-between">
                <h3>Filter</h3>
                {(filterCat.length || filterPrice.length) ? <button className="btn btn-danger" onClick={clearFilter}>Clear</button> : ""}
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

                        <button className={`whislist_btn ${wishlist.includes(product._id) ? "wishlisted" : ''}`} onClick={() => { auth?.user ? updateWishlist(product._id) : navigate('/login') }}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="_1l0elc" width="28" height="28" viewBox="0 0 20 16"><path d="M8.695 16.682C4.06 12.382 1 9.536 1 6.065 1 3.219 3.178 1 5.95 1c1.566 0 3.069.746 4.05 1.915C10.981 1.745 12.484 1 14.05 1 16.822 1 19 3.22 19 6.065c0 3.471-3.06 6.316-7.695 10.617L10 17.897l-1.305-1.215z" fill="" className="eX72wL" stroke="#FFF" fillRule="evenodd" opacity=".9"></path></svg>
                        </button>
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
