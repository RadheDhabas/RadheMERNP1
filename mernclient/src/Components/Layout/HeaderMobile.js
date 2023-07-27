import React, { useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, useLocation } from 'react-router-dom';

function HeaderMobile() {
    const [show, setShow] = useState(false);
    let location = useLocation();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button className='mobile_header_sidemenu_btn' onClick={handleShow}>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                    <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" /></svg>
            </button>

            <Offcanvas show={show} onHide={handleClose} className="mobile_header_sidemenu">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                <ul className="header_category_list">
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
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default HeaderMobile