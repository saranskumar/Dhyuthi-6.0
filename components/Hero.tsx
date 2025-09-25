import React from "react";
import Image from 'next/image';

const Hero = () => {
  return (
    <section id="page0" className="bg-transparent pt-44">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">

  <Image
    alt="logo"
    src="/dhyuthi.png"
      width={1360}
      height={322}
    className="mx-auto"   // centers the logo horizontally
  />

  <a className="inline-flex justify-center items-center mt-8 py-1 px-1 pr-4 mb-7">
    <Image
      alt="logo"
      src="/comingsoon.png"
      width={680}
    height={161}
      className="mx-auto"  // centers the second image inside the link
    />
  </a>

</div>

    </section>
  );
};

export default Hero;
