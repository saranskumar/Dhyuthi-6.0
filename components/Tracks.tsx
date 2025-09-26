import React from "react";
import Image from "next/image";

import aurora from "../assets/images/au.png";
import ignitia from "../assets/images/ig.png";
import traverse from "../assets/images/tr.png";

const Tracks = () => {
  return (
    <div id="page2" className="w-full flex justify-center items-center ">
      <div className="md:w-[80%] m-3 mt-16 justify-center items-center">
        <h2 className=" font-palanquin text-4xl mb-10 font-bold bg-[#9348fc] bg-clip-text text-transparent">
          Tracks
        </h2>

        <div className="max-w-[1380px] mx-auto grid lg:grid-cols-2 gap-8">
          <div className="w-full shadow-xl flex flex-col p-4 my-16 rounded-lg hover:scale-105 duration-300">
            <div className="mx-auto mt-[-3rem] bg-white">
              <Image src={aurora} alt="" width="350" height="80" />
            </div>

            {/*  <h2 className='my-16 text-3xl font-bold text-center'>AURORA</h2>
            <p className='mt-[-3rem] text-center text-2xl font-serif'>$149</p>
            
            
            <div className='text-center font-medium'>
                <p className='text-justify py-2 border-b mx-8 mt-8'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div> */}
            <button className="bg-gradient-to-r from-[#d04848] via-[#972929] to-[#9e0101] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 text-black">
              Registation Closed
            </button>
          </div>

          <div className="w-full shadow-xl flex flex-col p-4 my-16 rounded-lg hover:scale-105 duration-300">
            <div className="mx-auto mt-[-3rem] bg-white">
              <Image src={traverse} alt="" width="350" height="80" />
            </div>

            {/*  <h2 className='my-16 text-3xl font-bold text-center'>TRAVERSE</h2>
            <p className='mt-[-3rem] text-center text-2xl font-serif'>$149</p>
            
            
            <div className='text-center font-medium'>
                <p className='text-justify py-2 border-b mx-8 mt-8'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>*/}

            <button className="bg-gradient-to-r from-[#d04848] via-[#972929] to-[#9e0101] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 text-black">
              Registation Closed
            </button>
          </div>

          <div className="w-full shadow-xl flex flex-col p-4 my-16 rounded-lg hover:scale-105 duration-300">
            <div className="mx-auto mt-[-3rem] bg-white">
              <Image src={traverse} alt="" width="350" height="80" />
            </div>

            {/*  <h2 className='my-16 text-3xl font-bold text-center'>TRAVERSE</h2>
            <p className='mt-[-3rem] text-center text-2xl font-serif'>$149</p>
            
            
            <div className='text-center font-medium'>
                <p className='text-justify py-2 border-b mx-8 mt-8'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>*/}

            <button className="bg-gradient-to-r from-[#d04848] via-[#972929] to-[#9e0101] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 text-black">
              Registation Closed
            </button>
          </div>


          <div className="w-full shadow-xl flex flex-col p-4 my-16 rounded-lg hover:scale-105 duration-300">
            <div className="mx-auto mt-[-3rem] bg-white">
              <Image src={ignitia} alt="" width="350" height="80" />
            </div>

            {/*  <h2 className='my-16 text-3xl font-bold text-center'>IGNITIA</h2>
            <p className='mt-[-3rem] text-center text-2xl font-serif'>$149</p>
            
            
            <div className='text-center font-medium'>
                <p className='text-justify py-2 border-b mx-8 mt-8'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>*/}

            <button className="bg-gradient-to-r from-[#d04848] via-[#972929] to-[#9e0101] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 text-black">
              Registation Closed
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center"></div>
      </div>
    </div>
  );
};

export default Tracks;
