import React from "react";
import Image from 'next/image';

const Hero = () => {
  return (
    <section id="page0" className="bg-transparent pt-44">
    <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12 space-y-8">
  <Image
    alt="logo"
    src="/noglow.png"
    width={1560}
    height={322}
    className="mx-auto w-[90%] sm:w-[80%] md:w-[70%] h-auto rounded-lg"
  />

  <Image
    alt="logo"
    src="/dhyuthiplane.png"
    width={1360}
    height={1175}
    className="mx-auto w-[90%] sm:w-[80%] md:w-[60%] h-auto rounded-lg"
  />

  <Image
    alt="logo"
    src="/date.png"
    width={453}
    height={107}
    className="mx-auto w-[70%] sm:w-[60%] md:w-[50%] h-auto rounded-lg my-16"
  />
</div>



    </section>
  );
};

export default Hero;
