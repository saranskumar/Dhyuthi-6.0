import React from "react";
import Image from 'next/image';

const Hero = () => {
  return (
    <section id="page0" className="bg-transparent pt-24">
    <div className="flex flex-col items-center justify-center px-4 space-y-4 text-center">
  {/* Event Logo */}
  <div className="w-[100%] max-w-xl  -mt-6">
  <Image
    alt="Event Title"
    src="/LOGOWEB.png"
    width={800}
    height={200}
    className="w-full h-auto mx-auto"
  />
</div>


  {/* Location & Date */}
<div className="flex flex-col items-center justify-center gap-6 mb-4 sm:gap-8">
  {/* Date first (slightly bigger) */}
  <div className="w-[85%]">
    <Image
      alt="Date"
      src="/date.png"
      width={800}   // original image width
      height={200}  // original image height
      className="w-full h-auto"
    />
  </div>

  {/* Location second (much bigger) */}
  <div className="w-56 sm:w-64 md:w-72 lg:w-80 xl:w-96">
    <Image
      alt="Location"
      src="/location.png"
      width={800}   // original image width
      height={200}  // original image height
      className="w-full h-auto"
    />
  </div>
</div>



  {/* Registration Info */}
 
</div>




    </section>
  );
};

export default Hero;
