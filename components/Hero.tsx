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
            className="mx-auto  w-full shadow-xl flex flex-col p-4  items-center rounded-lg
                        hover:scale-110 transform transition-transform duration-300 ease-in-out"   // centers the logo horizontally
          />

          
            <Image
              alt="logo"
              src="/comingsoon.png"
              width={453}
            height={107}
              className="mx-auto  shadow-xl flex flex-col items-center p-4 my-16 rounded-lg
                        hover:scale-103 transform transition-transform duration-300 ease-in-out"  // centers the second image inside the link
            />
          

    </div>

    </section>
  );
};

export default Hero;
