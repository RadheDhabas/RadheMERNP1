import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/authContext";
import SearchProduct from "../SearchBox";
import '../../CSS/Header.scss'
import { CartContext } from "../../Context/cartContext";

const Header = () => {
  let location = useLocation();

  const [auth, setAuth] = useContext(AuthContext);
  const {cart} = useContext(CartContext);
  const handelLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("token");
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Warrior K
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
          <ul className="navbar-nav  mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          <SearchProduct></SearchProduct>
          {!auth.user ? (
            <>
              <Link className="btn btn-primary mx-1" to="/login" role="button">
                Login
              </Link>
              <Link className="btn btn-primary mx-1" to="/signup" role="button">
                Signup
              </Link>
            </>
          ) : (
            <Link
              className="btn btn-primary mx-1"
              to="/"
              onClick={handelLogout}
              role="button"
            >
              Logout
            </Link>
            
          )}
          <Link
                className="header_cart_btn"
                to="/cart"
              > <span className="num_of_item">{cart.reduce((a,b)=>b.quantity+a,0)}</span>
                Cart
              </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
