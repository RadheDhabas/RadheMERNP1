import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Modal from 'react-bootstrap/Modal'
import { AuthContext } from "../../Context/authContext";
import SearchProduct from "../SearchBox";
import '../../CSS/Header.scss'
import { CartContext } from "../../Context/cartContext";
import HeaderMobile from "./HeaderMobile";

const Header = () => {
  let location = useLocation();
  const [showSearchModel, setShowSearchModel] = useState(false);
  const [fullscreen, setFullscreen] = useState(true);
  const [auth, setAuth] = useContext(AuthContext);
  const { cart, wishlist, setWishlist } = useContext(CartContext);
  const handelLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    setWishlist([]);
    localStorage.removeItem("token");
  };

  return (<>
    <nav className="main_header container-fluid">
      <div className="header_logo_category">
        <HeaderMobile handelLogout={handelLogout}></HeaderMobile>
        <Link className="header_brand" to="/">
          CandelA
        </Link>
        <ul className="header_category_list for_pc_only">
          <li className="">
            <Link
              className={`nav_link ${location.pathname === "/" ? "active" : ""
                }`}
              aria-current="page"
              to="/"
            >
              MEN
            </Link>
          </li>
          <li className="">
            <Link
              className={`nav_link ${location.pathname === "/about" ? "active" : ""
                }`}
              to="/about"
            >
              WOMEN
            </Link>
          </li>
          <li className="">
            <Link
              className={`nav_link ${location.pathname === "/about" ? "active" : ""
                }`}
              to="/about"
            >
              ELECTRONICS
            </Link>
          </li>
        </ul>
      </div>
      <div className="header_scl">
        <div className="for_pc_n_tab_only">
          <SearchProduct></SearchProduct>
        </div>
        {!auth.user ? (
          <div>
            <Link className="header_login_btn for_pc_only" to="/login" role="button">
              Login
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1979_421)">
                  <path d="M12.5 6H12V4C12 1.794 10.206 0 8 0C5.794 0 4 1.794 4 4V6H3.5C2.67333 6 2 6.67267 2 7.5V14.5C2 15.3273 2.67333 16 3.5 16H12.5C13.3267 16 14 15.3273 14 14.5V7.5C14 6.67267 13.3267 6 12.5 6ZM5.33333 4C5.33333 2.52933 6.52933 1.33333 8 1.33333C9.47067 1.33333 10.6667 2.52933 10.6667 4V6H5.33333V4ZM8.66667 11.148V12.6667C8.66667 13.0347 8.36867 13.3333 8 13.3333C7.63133 13.3333 7.33333 13.0347 7.33333 12.6667V11.148C6.93667 10.9167 6.66667 10.4913 6.66667 10C6.66667 9.26467 7.26467 8.66667 8 8.66667C8.73533 8.66667 9.33333 9.26467 9.33333 10C9.33333 10.4913 9.06333 10.9167 8.66667 11.148Z" fill="white" />
                </g>
                <defs>
                  <clipPath id="clip0_1979_421">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Link>
          </div>
        ) : (
          <Link
            className="header_cart_btn for_pc_only"
            to="/"
            onClick={handelLogout}
            role="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
              <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
            </svg>
          </Link>

        )}
        <button className="header_search_btn_for_mob" onClick={() => setShowSearchModel(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg>
        </button>
        <Link
          className="header_cart_btn"
          to={`${auth?.user ? '/my-wishlist' : '/login'}`}
        > {(wishlist.length > 0) && <span className="num_of_item">{wishlist.length}</span>}
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
            <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
          </svg>
        </Link>
        <Link
          className="header_cart_btn"
          to="/cart"
        > {(cart.length > 0) && <span className="num_of_item">{cart.reduce((a, b) => b.quantity + a, 0)}</span>}
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
            <path d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64v48H160V112zm-48 48H48c-26.5 0-48 21.5-48 48V416c0 53 43 96 96 96H352c53 0 96-43 96-96V208c0-26.5-21.5-48-48-48H336V112C336 50.1 285.9 0 224 0S112 50.1 112 112v48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z" />
          </svg>
        </Link>
      </div>
    </nav>
    <Modal show={showSearchModel} fullscreen={fullscreen} onHide={() => setShowSearchModel(false)}>

      <Modal.Body className="text-center mob_search_modal">

        <button className="mob_search_close_btn" onClick={() => setShowSearchModel(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 448 512">
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
          </svg>
        </button>
        <SearchProduct></SearchProduct>
      </Modal.Body>
    </Modal>
  </>
  );
};

export default Header;
