"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

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

const Gallery = () => {
  const [modalImg, setModalImg] = useState<string | null>(null);

  return (
    <div id="page8" className="w-full flex justify-center items-center">
  <div className="md:w-[80%] m-3 mt-12">
  {/* Heading left-aligned */}
  <h2 className=" font-palanquin text-4xl mb-10 font-bold bg-[#9348fc] bg-clip-text text-transparent">
          Gallery
        </h2>
  {/* Centered Carousel */}
  <div className="w-full flex justify-center">
    <div className="w-full md:w-[70%] relative">
      <Swiper
        modules={[Autoplay, Navigation]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        slidesPerView={1}
        className="rounded-xl"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src={img}
                alt={`gallery-${idx}`}
                fill
                className="object-cover cursor-pointer"
                onClick={() => setModalImg(img.src)}
              />
            </div>
          </SwiperSlide>
        ))}

        {/* Purple Navigation Buttons */}
        <div className="swiper-button-prev !text-purple-600 !font-bold"></div>
        <div className="swiper-button-next !text-purple-600 !font-bold"></div>
      </Swiper>
    </div>
  </div>
</div>


  {/* Modal Lightbox remains the same */}
  {modalImg && (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="relative max-w-4xl w-full flex justify-center">
        <Image
          src={modalImg}
          alt="preview"
          width={1200}
          height={900}
          className="rounded-lg object-contain"
        />
        <button
          className="absolute top-4 right-4 bg-white text-black px-3 py-1 rounded-full font-bold"
          onClick={() => setModalImg(null)}
        >
          ✕
        </button>
      </div>
    </div>
  )}
</div>

  );
};

export default Gallery;
