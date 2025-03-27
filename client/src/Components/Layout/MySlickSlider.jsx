import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function MySlickSlider() {
  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    margin: 10,
    speed: 500,
    dots: false,
    autoplaySpeed: 3000,
    autoplay: true,
};
  return (

    <Slider {...settings}>
      <div key={1}>
        <Link className='slider_item'>
          <img src="https://images.bewakoof.com/uploads/grid/app/Sale-1x1-Banner-buy-3-at-1199-1698766264.jpg" className='img-fluid' />
        </Link>
      </div>
      <div key={2} className='slider_item'>
        <Link>
          <img src="	https://images.bewakoof.com/uploads/grid/app/newbanner-1x1-AIRWindcheater-common-1-1698331048.jpg" className='img-fluid' />
        </Link>
      </div>
      <div key={3} className='slider_item'>
        <Link>
          <img src="https://images.bewakoof.com/uploads/grid/app/NovCOTM-Mickey-1x1-Model-common-1698763479.jpg" className='img-fluid' />
        </Link>
      </div>
      <div key={4} className='slider_item'>
        <Link>
          <img src="https://images.bewakoof.com/uploads/grid/app/1x1-Banner-Sweatshirts-and-Hoodies---3--1698381629.jpg" className='img-fluid' />
        </Link>
      </div>
    </Slider>
  );
}

export default MySlickSlider;