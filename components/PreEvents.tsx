"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";


const PreEvents = () => {
  const posters = ["/1.jpg", "/2.jpg", "/3.jpg"];
const links = [
  "https://tinyurl.com/DoodleQuest1",
  "https://bit.ly/trail_Quest",
  "https://tinyurl.com/StrikezoneDhyuthi",
];

  const [current, setCurrent] = useState(0);

  // Auto-scroll every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % posters.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [posters.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + posters.length) % posters.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % posters.length);
  };

  return (
    <div id="pre-events" className="w-full flex justify-center items-center py-12 md:py-16">
      <div className="md:w-[80%] m-3">
        <h2 className="font-palanquin text-4xl mb-12 font-bold bg-[#9348fc] bg-clip-text text-transparent">
          Pre-Events
        </h2>

        <div className="flex flex-col lg:flex-row lg:gap-8 lg:mb-12">
          {/* Carousel Posters */}
          <div className="relative w-full lg:w-1/2 mb-12 lg:mb-0 flex justify-center items-center">
  {/* Full container for poster */}
  <div className="w-full relative overflow-hidden rounded-lg aspect-[4/5]">
    {posters.map((poster, index) => (
      <div
        key={index}
        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ${
          index === current ? "opacity-100 z-20" : "opacity-0 z-10"
        }`}
      >
        <a href={links[index]} target="_blank" rel="noopener noreferrer">
          <Image
          src={poster}
          alt={`Pre-event Poster ${index + 1}`}
          fill
          style={{ objectFit: "cover" }} // fill the div entirely
          />
        </a>

      
      </div>
    ))}
  </div>

  {/* Navigation Arrows */}
  <button
    onClick={prevSlide}
    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full z-30"
  >
    &#10094;
  </button>
  <button
    onClick={nextSlide}
    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full z-30"
  >
    &#10095;
  </button>
</div>


          {/* Text Content */}
          <div className="flex flex-col justify-center w-full lg:w-1/2" data-aos="fade-left">
            <h3 className="text-lg lg:text-xl font-semibold text-purple-400 mb-3 lg:mb-4">
              Engaging Workshops & Talks
            </h3>
            <h2 className="mb-4 text-2xl font-bold text-white lg:text-4xl lg:mb-6">
              Build-Up to The Main Event
            </h2>
            <p className="text-base leading-relaxed text-gray-300">
              Leading up to DHYUTHI 6.0, we host a series of pre-events designed to ignite curiosity
              and build momentum. These include hands-on workshops, insightful tech talks by
              industry experts, and interactive sessions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreEvents;
