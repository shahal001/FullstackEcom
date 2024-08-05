import React from 'react';
import Slider from 'react-slick';
import image1 from "../assets/fogg.jpg"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Slider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false, // Hide default arrows if you want to customize
  };

  return (
    <div className="container mx-auto py-8">
      <Slider {...settings} className="rounded-lg overflow-hidden shadow-lg">
        <div className="relative">
          <img src={image1} alt="Slide 1" className="w-full"/>
          <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-4">
            Slide 1 Caption
          </div>
        </div>
        <div className="relative">
          <img src="https://via.placeholder.com/800x400" alt="Slide 2" className="w-full"/>
          <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-4">
            Slide 2 Caption
          </div>
        </div>
        <div className="relative">
          <img src="https://via.placeholder.com/800x400" alt="Slide 3" className="w-full"/>
          <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-4">
            Slide 3 Caption
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default Slider;