import React, { useEffect, useState, Suspense, lazy } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "./Layout/Layout.jsx";
import axios from "axios";
import { Prices } from "./PriceFilter.js";
// import Home_banner from "../elements/Home_banner.jsx";
import '../CSS/AllProductPage.scss'
import { useDispatch, useSelector } from "react-redux";
import Homeslider from "./HomePage/Homeslider.jsx";
import { addToWishlist, removeFromWishlist } from '../Redux/Reducers/wishlistSlice.js';
import Spinner from "./Spinner.jsx";
function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [filterCat, setFilterCat] = useState([]);
  const [filterPrice, setFilterPrice] = useState([]);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlist = useSelector((state) => state.wishlist);
  const userId = auth?.user?._id;

  const updateWishlist = (productId) => {
    const check_wl = wishlist?.some(i => i._id === productId);
    check_wl ? dispatch(removeFromWishlist({ userId, productId }))
      : dispatch(addToWishlist({ userId, productId }))
  }

  useEffect(() => {
    getProducts();
    getAllCategory();
  }, []);
  // get all products
  const getProducts = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_USER_AUTH}/api/product/all-products`
      );
      if (response.status == 200) {
        setProducts(response.data?.products);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  //get all cat
  const getAllCategory = async () => {
    try {
      const categories = await axios.get(
        `${import.meta.env.VITE_USER_AUTH}/api/category/get-categories`
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
        `${import.meta.env.VITE_USER_AUTH}/api/product/filter-products`,
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
      <div className="product_listing">
        <div className="container my-4">
          <div className="row">
            <div className="col-md-3">
              <div className="filter_section">
                <div className="filter_header">
                  <p>Filter</p>
                  {(filterCat.length || filterPrice.length) ? <button className="clear_filter_btn" onClick={clearFilter}>Clear</button> : ""}
                </div>
                <div className="filter_container">
                  <div className="filter_type">
                    <a href="#ftype1" className="filter_name collapsed" data-bs-toggle='collapse' aria-expanded='false' aria-controls='ftype1'>Category
                      <svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.26287 6C5.07423 6 4.88561 5.92797 4.74178 5.78422L0.215928 1.25832C-0.0719759 0.970413 -0.0719759 0.503627 0.215928 0.21584C0.503715 -0.0719468 0.970408 -0.0719468 1.25833 0.21584L5.26287 4.22061L9.26743 0.21598C9.55533 -0.0718069 10.022 -0.0718069 10.3097 0.21598C10.5978 0.503767 10.5978 0.970553 10.3097 1.25846L5.78396 5.78436C5.64006 5.92814 5.45144 6 5.26287 6Z" fill="#333"></path>
                      </svg>
                    </a>
                    <div className="filter_type_option collapse" id="ftype1">
                      {categories?.map((i) => (
                        <div key={i._id} className="check_options">
                          <input
                            type="checkbox"
                            onChange={(e) => handleFilter(e.target.checked, i._id)}
                          />
                          <label>{i.name}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="filter_type">
                    <a href="#ftype2" className="filter_name collapsed" data-bs-toggle='collapse' aria-expanded='false' aria-controls='ftype1'>Price
                      <svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.26287 6C5.07423 6 4.88561 5.92797 4.74178 5.78422L0.215928 1.25832C-0.0719759 0.970413 -0.0719759 0.503627 0.215928 0.21584C0.503715 -0.0719468 0.970408 -0.0719468 1.25833 0.21584L5.26287 4.22061L9.26743 0.21598C9.55533 -0.0718069 10.022 -0.0718069 10.3097 0.21598C10.5978 0.503767 10.5978 0.970553 10.3097 1.25846L5.78396 5.78436C5.64006 5.92814 5.45144 6 5.26287 6Z" fill="#333"></path>
                      </svg>
                    </a>
                    <div className="filter_type_option collapse" id="ftype2">
                      {Prices?.map((price) => (
                        <div key={price._id} className="check_options">
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
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <h1 className="all_product_heading">Candela's Collection</h1>
              {loading ? <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="sr-only"></span>
                </div>
              </div> :
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

                          <button className={`whislist_btn ${wishlist?.some(i => i._id == product._id) ? "wishlisted" : ''}`} onClick={() => { auth?.user ? updateWishlist(product._id) : navigate('/login') }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="_1l0elc" width="28" height="28" viewBox="0 0 20 16"><path d="M8.695 16.682C4.06 12.382 1 9.536 1 6.065 1 3.219 3.178 1 5.95 1c1.566 0 3.069.746 4.05 1.915C10.981 1.745 12.484 1 14.05 1 16.822 1 19 3.22 19 6.065c0 3.471-3.06 6.316-7.695 10.617L10 17.897l-1.305-1.215z" fill="" className="eX72wL" stroke="#FFF" fillRule="evenodd" opacity=".9"></path></svg>
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AllProducts;
