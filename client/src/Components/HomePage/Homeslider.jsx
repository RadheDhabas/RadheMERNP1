import React from 'react';
import {Link} from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MySlickSlider from '../Layout/MySlickSlider';
import './../../CSS/Home.css'

function Homeslider() {
    return (
        <div className='homeslider1'>
            <MySlickSlider></MySlickSlider>
        </div>
    );
}

export default Homeslider;
