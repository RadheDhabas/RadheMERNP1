import React, { useContext } from "react";
import { SearchContext } from "../Context/searchContext";
import Layout from "./Layout/Layout";
import { Link } from "react-router-dom";

function Search() {
  const {searchProduct, setSearchProduct,searchedKeyword} = useContext(SearchContext);
  console.log(searchProduct); 
  console.log(searchedKeyword)
  return (
    <Layout>
      <div className="container">
        {searchProduct.length < 1 ? (
          <div>Please try with a different search keyword</div>
        ) : (
          <div>
            <h1>Searched Products <span>{searchProduct.length} Found</span></h1>
            <div className="row">
              {searchProduct &&
                searchProduct.map((product) => (
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
        )}
      </div>
    </Layout>
  );
}

export default Search;
