import React from "react";
import Image from 'next/image';

const Hero = () => {
  return (
    <section id="page0" className="bg-transparent pt-24">
    <div className="flex flex-col items-center justify-center px-4 space-y-4 text-center">
  {/* Event Logo */}
  <div className="w-[90%] max-w-xl  -mt-6">
  <Image
    alt="Event Title"
    src="/glow.png"
    width={800}
    height={200}
    className="w-full h-auto mx-auto"
  />
</div>

{/* Event Title (as image) */}
<div className="w-[90%] max-w-xl  -mt-4">
  <Image
    alt="Event Title"
    src="/dhyuthiplane.png"
    width={800}
    height={200}
    className="w-full h-auto mx-auto"
  />
</div>




  {/* Call-to-Action Button */}
 

  {/* Location & Date */}
  <div className="flex flex-col items-center justify-center gap-4 mb-2 sm:gap-6">
  {/* Date first */}
  <div className="w-32 sm:w-40 md:w-48 lg:w-56">
    <Image
      alt="Date"
      src="/date.png"
      width={800}   // original image width
      height={200}  // original image height
      className="w-full h-auto"
    />
  </div>

  {/* Location second */}
  <div className="w-32 sm:w-40 md:w-48 lg:w-56">
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
