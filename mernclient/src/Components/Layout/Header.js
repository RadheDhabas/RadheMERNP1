import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Modal from 'react-bootstrap/Modal'
import '../../CSS/Header.scss'
import HeaderMobile from "./HeaderMobile";
import SearchProduct from "../SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../Redux/Reducers/authSlice";
import { ResetWishlist, fetchWishlist } from "../../Redux/Reducers/wishlistSlice";
import { ResetCart } from "../../Redux/Reducers/cartSlice";

const Header = () => {
  let location = useLocation();
  const [showSearchModel, setShowSearchModel] = useState(false);
  const [fullscreen, setFullscreen] = useState(true);

  const auth = useSelector(state => state.auth)
  const cart = useSelector(state => state.cart)
  const wishlist = useSelector(state => state.wishlist)
  const dispatch = useDispatch();
  
 
  useEffect(() => {
    
    if (!auth.isAuthenticated) {
      dispatch(ResetWishlist());
      dispatch(ResetCart());
      
    }
    dispatch(fetchWishlist(auth?.user?._id))
  }, [auth])
  return (<>
    <nav className="main_header container-fluid">
      <div className="header_logo_category">
        <HeaderMobile></HeaderMobile>
        <Link className="header_brand" to="/">
          CandelA
        </Link>
        <ul className="header_category_list for_pc_only">
          <li className="">
            <Link
              className={`nav_link ${location.pathname === "/about" ? "active" : ""
                }`}
              to="/all-products"
            >
              All Products
            </Link>
          </li>
                 <li className="">
            <Link
              className={`nav_link ${location.pathname === "/about" ? "active" : ""
                }`}
              to="/about"
            >
              About
            </Link>
          </li>
        </ul>
      </div>
      <div className="header_scl">
        <div className="for_pc_n_tab_only">
          <SearchProduct></SearchProduct>
        </div>
        {!(auth?.user) ? (
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
          <div className="after_login_profile_btn for_pc_only" >
            <Link className="my_ac_btn">
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 448 512">
                <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
              </svg>
            </Link>
            <ul className="user_submenu">
              <li>
                <Link to={auth.user.role == 0 ? "/my-account" : (auth.user.role == 1 ? '/admin' : '')}>
                  <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.542236 12.8333C0.542236 13.1554 0.803141 13.4166 1.12557 13.4166C1.448 13.4166 1.7089 13.1554 1.7089 12.8333C1.7089 10.7748 2.89394 8.9524 4.7411 8.09061C5.38037 8.50603 6.14087 8.74992 6.95833 8.74992C7.7789 8.74992 8.54231 8.5044 9.18308 8.08605C9.73451 8.34635 10.2455 8.69658 10.6708 9.12162C11.6626 10.1137 12.2089 11.4319 12.2089 12.8333C12.2089 13.1554 12.4698 13.4166 12.7922 13.4166C13.1147 13.4166 13.3756 13.1554 13.3756 12.8333C13.3756 11.1203 12.7079 9.50928 11.4957 8.29675C11.0901 7.89091 10.6186 7.54291 10.1128 7.25602C10.6928 6.55081 11.0417 5.64875 11.0417 4.66659C11.0417 2.415 9.20964 0.583252 6.95833 0.583252C4.70703 0.583252 2.875 2.415 2.875 4.66659C2.875 5.64637 3.22246 6.54622 3.79985 7.25068C1.79738 8.37811 0.542236 10.4846 0.542236 12.8333ZM6.95833 1.74992C8.56649 1.74992 9.875 3.05843 9.875 4.66659C9.875 6.27474 8.56649 7.58325 6.95833 7.58325C5.35018 7.58325 4.04167 6.27474 4.04167 4.66659C4.04167 3.05843 5.35018 1.74992 6.95833 1.74992Z"></path>
                  </svg>
                  My Account</Link>
              </li>
              <li>
                <Link to="/"
                  onClick={() => dispatch(logoutUser())}
                  role="button">
                  <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.9349 13.3438C9.9349 13.5178 9.86576 13.6847 9.74269 13.8078C9.61961 13.9309 9.45269 14 9.27865 14H3.09204C2.51208 13.9993 1.95606 13.7687 1.54596 13.3586C1.13587 12.9485 0.905192 12.3925 0.904541 11.8125V2.1875C0.905192 1.60754 1.13587 1.05152 1.54596 0.641423C1.95606 0.231329 2.51208 0.000651358 3.09204 0L9.27865 0C9.45269 0 9.61961 0.0691404 9.74269 0.192211C9.86576 0.315282 9.9349 0.482202 9.9349 0.65625C9.9349 0.830298 9.86576 0.997218 9.74269 1.12029C9.61961 1.24336 9.45269 1.3125 9.27865 1.3125H3.09204C2.86005 1.31275 2.63764 1.40502 2.4736 1.56906C2.30956 1.7331 2.21729 1.95551 2.21704 2.1875V11.8125C2.21729 12.0445 2.30955 12.2669 2.47359 12.4309C2.63764 12.595 2.86005 12.6873 3.09204 12.6875H9.27865C9.45269 12.6875 9.61961 12.7566 9.74269 12.8797C9.86576 13.0028 9.9349 13.1697 9.9349 13.3438ZM12.9031 6.53598L9.78456 3.41737C9.72387 3.35531 9.65148 3.30591 9.57157 3.27203C9.49165 3.23815 9.40582 3.22045 9.31902 3.21997C9.23222 3.21949 9.14619 3.23623 9.06591 3.26923C8.98563 3.30223 8.91269 3.35082 8.85132 3.4122C8.78995 3.47358 8.74136 3.54652 8.70837 3.62681C8.67539 3.70709 8.65865 3.79313 8.65915 3.87992C8.65964 3.96672 8.67734 4.05256 8.71123 4.13246C8.74513 4.21237 8.79453 4.28476 8.8566 4.34544L10.8548 6.34375H5.68858C5.51453 6.34375 5.34761 6.41289 5.22454 6.53596C5.10147 6.65903 5.03233 6.82595 5.03233 7C5.03233 7.17405 5.10147 7.34097 5.22454 7.46404C5.34761 7.58711 5.51453 7.65625 5.68858 7.65625H10.8548L8.85649 9.65453C8.79528 9.71541 8.74668 9.78777 8.71348 9.86746C8.68028 9.94715 8.66313 10.0326 8.66301 10.1189C8.66289 10.2053 8.67981 10.2908 8.71279 10.3706C8.74578 10.4503 8.79418 10.5228 8.85522 10.5839C8.91627 10.6449 8.98876 10.6933 9.06854 10.7263C9.14832 10.7593 9.23382 10.7762 9.32015 10.7761C9.40648 10.776 9.49194 10.7588 9.57163 10.7256C9.65132 10.6924 9.72368 10.6438 9.78456 10.5826L12.9031 7.46405C13.0262 7.34098 13.0954 7.17406 13.0954 7.00001C13.0954 6.82597 13.0262 6.65905 12.9031 6.53598Z"></path>
                  </svg>
                  Sign Out
                </Link>
              </li>
            </ul>
          </div>

        )}
        <button className="header_search_btn_for_mob" onClick={() => setShowSearchModel(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg>
        </button>
        <Link
          className="header_cart_btn"
          to={`${auth?.user ? '/my-wishlist' : '/login'}`}
        > {(wishlist?.length > 0) && <span className="num_of_item">{wishlist?.length}</span>}
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
            <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
          </svg>
        </Link>
        <Link
          className="header_cart_btn"
          to="/cart"
        > {(cart?.length > 0) && <span className="num_of_item">{cart.reduce((a, b) => b.quantity + a, 0)}</span>}
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
