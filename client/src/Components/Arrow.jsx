// src/Arrows.js
import React from 'react';

export const NextArrow = ({ className, style, onClick }) => (
  <div
    className={`${className} text-white rounded-full  `}
    style={{ ...style, display: 'block', right: '10px', zIndex: 10 }}
    onClick={onClick}
  >
    &#10095;
  </div>
);

export const PrevArrow = ({ className, style, onClick }) => (
  <div
    className={`${className} text-white rounded-full  `}
    style={{ ...style, display: 'block', left: '10px', zIndex: 10 }}
    onClick={onClick}
  >
    &#10094;
  </div>
);
