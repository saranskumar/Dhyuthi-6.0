import React from "react";
import Image from 'next/image';

const Hero = () => {
  return (
    <section id="page0" className="bg-transparent pt-44">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12 ">

  <Image
    alt="logo"
    src="/dhyuthi.png"
      width={1360}
      height={322}
    className="mx-auto  w-full shadow-xl flex flex-col p-4  rounded-lg
                hover:scale-75 transform transition-transform duration-300 ease-in-out"   // centers the logo horizontally
  />

  <a className="inline-flex justify-center items-center   px-1 pr-4 mb-7 w-full shadow-xl ">
    <Image
      alt="logo"
      src="/comingsoon.png"
      width={453}
    height={107}
      className="mx-autow-full shadow-xl flex flex-col p-4 my-16 rounded-lg
                hover:scale-103 transform transition-transform duration-300 ease-in-out"  // centers the second image inside the link
    />
  </a>

</div>

    </section>
  );
};

export default Hero;
