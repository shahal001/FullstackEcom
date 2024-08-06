// src/Arrows.js
import React from 'react';

export const NextArrow = ({ className, style, onClick }) => (
  <div
    className={`${className} bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700`}
    style={{ ...style, display: 'block', right: '10px', zIndex: 10 }}
    onClick={onClick}
  >
    &#10095;
  </div>
);

export const PrevArrow = ({ className, style, onClick }) => (
  <div
    className={`${className} bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700`}
    style={{ ...style, display: 'block', left: '10px', zIndex: 10 }}
    onClick={onClick}
  >
    &#10094;
  </div>
);
