import React from "react";
import Layout from "./Layout/Layout";
import Homeslider from "./HomePage/Homeslider";

export default function Home(){

  return(
    <Layout>
      <Homeslider></Homeslider>
    <div className="container-fluid">
      <p className='to_hot_to_missed_text'>
      TOO HOT TO BE MISSED
      </p>
      <div className="to_hot_to_missed">
        <div className="img_items">
          <img src="https://images.bewakoof.com/uploads/grid/app/sale-midsize-desktop-banner-buy-3-at-999-1698766262.jpg" className='img-fluid' alt="" />
        </div>
        <div className="img_items">
          <img src="https://images.bewakoof.com/uploads/grid/app/Sweaters-Common-desktop-mid-size-banner-1698564267.jpg" className='img-fluid' alt="" />
        </div>
        <div className="img_items">
          <img src="https://images.bewakoof.com/uploads/grid/app/sale-midsize-desktop-banner-B1G1-FREE-1698766263.jpg" className='img-fluid' alt="" />
        </div>
        <div className="img_items">
          <img src="https://images.bewakoof.com/uploads/grid/app/desktop-mid-size-hygiene-revamp-FS--1--1698564264.jpg" className='img-fluid' alt="" />
        </div>
      </div>
    </div>
    </Layout>
  )
}
