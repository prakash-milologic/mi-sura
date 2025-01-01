"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { Settings } from "react-slick";

import React from 'react';

export default function Carousel({ children }: { children: React.ReactNode }) {
  const settings: Settings = {
    dots: true,
    infinite: true,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };

  return <Slider {...settings}>{children}</Slider>;
}
