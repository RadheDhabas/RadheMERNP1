import React from 'react'
import { Link } from 'react-router-dom';
import '../../CSS/Footer.css'

function Footer() {
    return (
        <div className='footer'>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Link className="footer_brand" to="/">
                            CandelA
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-3 col-6">
                        <p className="footer-headding">
                        Customer Service
                        </p>
                        <ul className="footer-menu">
                            <li>
                                <a href="/">Contact Us</a>
                            </li>
                            <li>
                                <a href="/">My Orders</a>
                            </li>
                            <li>
                                <a href="/">Wishlist</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-6">
                        <p className="footer-headding">
                            Company
                        </p>
                        <ul className="footer-menu">
                            <li>
                                <a href="/about-us">About us</a>
                            </li>
                            <li>
                            <a href="/">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="/">Terms & Conditions</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-6">
                        <p className="footer-headding">
                            Connact with us
                        </p>
                        <ul className="footer-menu">
                            <li>
                                <a href="/contact-us">Linkden</a>
                            </li>
                            <li>
                                <a href="/">Instagram</a>
                            </li>
                            <li>
                                <a href="/">Facebook</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-6">
                        <p className="footer-headding">
                            Keep up to date
                        </p>
                        <ul className="footer-menu">

                            <li>
                                <a href="/">Android</a>
                            </li>

                            <li>
                                <a href="/">IOS</a>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer