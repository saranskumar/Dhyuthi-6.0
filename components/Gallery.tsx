import Image from "next/image";
import React from "react";

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
  return (
    <div id="page8" className="w-full flex justify-center items-center ">
      <div className="md:w-[80%] m-3 mt-12 justify-center items-center">
        <h2 className=" font-palanquin text-4xl mb-10 font-bold ">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="grid gap-4">
            <div>
              <Image
                className="h-auto max-w-full rounded-lg  hover:scale-105 duration-300"
                src={dhyuthi1}
                alt=""
                width={500}
                height={300}
              />
            </div>
            <div>
              <Image
                className="h-auto max-w-full rounded-lg hover:scale-105 duration-300"
                src={dhyuthi2}
                alt=""
                width={500}
                height={300}
              />
            </div>
            <div>
              <Image
                className="h-auto max-w-full rounded-lg hover:scale-105 duration-300"
                src={dhyuthi3}
                alt=""
                width={500}
                height={300}
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div>
              <Image
                className="h-auto max-w-full rounded-lg hover:scale-105 duration-300"
                src={dhyuthi4}
                alt=""
                width={500}
                height={300}
              />
            </div>
            <div>
              <Image
                className="h-auto max-w-full rounded-lg hover:scale-105 duration-300"
                src={dhyuthi5}
                alt=""
                width={500}
                height={300}
              />
            </div>
            <div>
              <Image
                className="h-auto max-w-full rounded-lg hover:scale-105 duration-300"
                src={dhyuthi6}
                alt=""
                width={500}
                height={300}
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div>
              <Image
                className="h-auto max-w-full rounded-lg hover:scale-105 duration-300"
                src={dhyuthi7}
                alt=""
                width={500}
                height={300}
              />
            </div>
            <div>
              <Image
                className="h-auto max-w-full rounded-lg hover:scale-105 duration-300"
                src={dhyuthi8}
                alt=""
                width={500}
                height={300}
              />
            </div>
            <div>
              <Image
                className="h-auto max-w-full rounded-lg hover:scale-105 duration-300"
                src={dhyuthi9}
                alt=""
                width={500}
                height={300}
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div>
              <Image
                className="h-auto max-w-full rounded-lg hover:scale-105 duration-300"
                src={dhyuthi10}
                alt=""
                width={500}
                height={300}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
