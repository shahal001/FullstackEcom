// src/SliderHed.js
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PrevArrow } from '../Components/Arrow'; // Ensure the correct path
import sliderImg from '../Data'; // Ensure the correct path

const SliderHed = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="">
      <Slider {...settings} className="rounded-lg overflow-hidden  ">
        {sliderImg.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index}`} className="w-full h-64 object-cover" />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SliderHed;