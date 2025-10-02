"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSwipeable } from "react-swipeable";

import dhyuthi1 from "../Dhyuthi/gallery/dhyuthi1.jpg";
import dhyuthi2 from "../Dhyuthi/gallery/dhyuthi2.jpg";
import dhyuthi3 from "../Dhyuthi/gallery/dhyuthi3.jpg";
import dhyuthi4 from "../Dhyuthi/gallery/dhyuthi4.jpg";
import dhyuthi5 from "../Dhyuthi/gallery/dhyuthi5.jpg";
import dhyuthi6 from "../Dhyuthi/gallery/dhyuthi6.jpg";
import dhyuthi7 from "../Dhyuthi/gallery/dhyuthi7.jpg";
import dhyuthi8 from "../Dhyuthi/gallery/dhyuthi8.jpg";
import dhyuthi9 from "../Dhyuthi/gallery/dhyuthi9.jpg";
import dhyuthi10 from "../Dhyuthi/gallery/dhyuthi10.jpg";

const Gallery = () => {
  const images = [
    dhyuthi1,
    dhyuthi2,
    dhyuthi3,
    dhyuthi4,
    dhyuthi5,
    dhyuthi6,
    dhyuthi7,
    dhyuthi8,
    dhyuthi9,
    dhyuthi10,
  ];

  const [current, setCurrent] = useState(0);

  // Auto-scroll every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  // Swipe Handlers
  const handlers = useSwipeable({
  onSwipedLeft: nextSlide,
  onSwipedRight: prevSlide,
  preventScrollOnSwipe: true,
  trackMouse: true,
});


  return (
    <div id="page8" className="w-full flex justify-center items-center py-12">
      <div className="w-full md:w-[90%] lg:w-[65%] px-3">
        <h2 className="font-palanquin text-4xl mb-10 font-bold">Gallery</h2>

        {/* Carousel Container */}
        <div
          {...handlers}
          className="relative w-full flex justify-center items-center select-none"
        >
          {/* Image Container */}
          <div className="w-full relative overflow-hidden rounded-lg aspect-[16/9] min-h-[300px] sm:min-h-[400px] md:min-h-[500px]">
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
                  index === current ? "opacity-100 z-20" : "opacity-0 z-10"
                }`}
              >
                <Image
                  src={image}
                  alt={`Gallery Image ${index + 1}`}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-lg"
                />
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full z-30 transition-colors"
          >
            &#10094;
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full z-30 transition-colors"
          >
            &#10095;
          </button>

          {/* Dot Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === current ? "bg-white w-8" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
