import React from "react";
import Image from "next/image";
import logo from "../assets/images/logo.png";
//hidden md:block
const About = () => {
  const about_event = `Dhyuthi, the flagship event of IEEE SCT SB, is back for its 5th edition after a one-year hiatus. This highly anticipated event will feature three distinct tracks that delve into relevant topics and showcase technologies with significant growth potential, offering participants a chance to explore cutting-edge advancements in various fields. Dhyuthi is designed to provide a rich experience, packed with technical workshops where attendees can gain hands-on skills as well as participate in competitions that encourage innovation and teamwork. Dhyuthi 5.0 fosters collaboration and innovation, offering diverse activities that promote personal growth and academic discourse, solidifying its status as a highly anticipated IEEE event.`;
  return (
    <section className="padding pt-20">
      <section
        id="page1"
        className="flex justify-between items-center max-lg:flex-col gap-10 w-full max-container text-white"
      >
        <div className="flex-1 flex justify-center items-center ">
          <Image
            src={logo}
            alt=""
            loading="lazy"
            width="350"
            height="280"
            decoding="async"
            data-nimg="1"
            className=" object-contain rounded-md"
          />
        </div>
        <div className="flex m-5 flex-1 flex-col">
          <h2 className="font-palanquin text-4xl mb-10 font-bold lg:max-w-lg lg:text-start ">
            About Dhyuthi 2024
          </h2>
          <p className="mt-4 lg:max-w-lg font-montserrat text-slate-gray text-lg leading-7 text-justify text-[#bbbcbc]">
            {about_event}
          </p>
          <div className="flex-1 flex justify-center items-center ">
            <h2 className="font-palanquin text-4xl mb-10 font-bold bg-gradient-to-r from-[#efb98f] via-[#ef9a06] to-[#f1871d] bg-clip-text text-transparent lg:max-w-lg">
              October 04 | 05 | 06
            </h2>
          </div>
        </div>
      </section>
    </section>
  );
};

export default About;
