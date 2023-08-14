import React, { useContext, useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/authContext';

function HeaderMobile({ handelLogout }) {
  const [show, setShow] = useState(false);
  let location = useLocation();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [auth, setAuth] = useContext(AuthContext);

  return (
    <>
      <button className='mobile_header_sidemenu_btn' onClick={handleShow}>
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
          <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" /></svg>
      </button>

      <Offcanvas show={show} onHide={handleClose} className="mobile_header_sidemenu">
        <Offcanvas.Body>
          <div className='mob_sidemenu_header'>
            <p className='mob_menu_header'>Welcome</p>
            {auth?.user?.name}
           
          </div>
          <ul className="header_category_list">
            <li className="mob_explore_link">
              <Link
                className={`nav_link ${location.pathname === "/" ? "active" : ""
                  }`}
                aria-current="page"
                to="/dashboard"
              >
                My Profile
              </Link>
            </li>

            <li className="mob_explore_link">
              <Link
                className={`nav_link ${location.pathname === "/" ? "active" : ""
                  }`}
                aria-current="page"
                to="/"
              >
                MEN
              </Link>
            </li>
            <li className="mob_explore_link">
              <Link
                className={`nav_link ${location.pathname === "/about" ? "active" : ""
                  }`}
                to="/about"
              >
                WOMEN
              </Link>
            </li>
            <li className="mob_explore_link">
              <Link
                className={`nav_link ${location.pathname === "/about" ? "active" : ""
                  }`}
                to="/about"
              >
                ELECTRONICS
              </Link>
            </li>
            <li className="mob_explore_link">

              {auth?.user &&
                <Link

                  to="/"
                  onClick={handelLogout}
                  role="button"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                    <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
                  </svg>
                  Sign Out
                </Link> 
              }
            </li>
          </ul>
          {!auth?.user && (
              <div className='mt-4'>
                <Link className="mob_ligin_signup" to="/login" role="button">
                  Login
                </Link>
                 or
                <Link className="mob_ligin_signup" to="/signup" role="button">
                  SignUp
                </Link>
              </div>
            )}

        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default HeaderMobile