import React from "react";
import Image from "next/image";
import aurora from "/assets/aurora.jpg";
import ignitia from "/assets/ignitia.jpg";
import traverse from "/assets/traverse.jpg";
const Tracks = () => {
  return (
    <section className="bg-transparent pt-44">
      <div>
        <h2 className="mt-[-3rem] font-palanquin text-center text-5xl mb-10 font-bold bg-gradient-to-r from-[#efb98f] via-[#ef9a06] to-[#f1871d] bg-clip-text text-transparent">
          TRACKS
        </h2>

        <div className="max-w-[1380px] mx-auto grid lg:grid-cols-3 gap-8">
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

            <button className="bg-gradient-to-r from-[#d04848] via-[#972929] to-[#9e0101] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 text-white">
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
            <button className="bg-gradient-to-r from-[#d04848] via-[#972929] to-[#9e0101] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 text-white">
              Registation Closed
            </button>
          </div>
        </div>

        <div className="py-32 pb-0">
          <p className="flex items-center justify-center text-5xl font-bold">
            TICKETS
          </p>
          <div className="flex items-center justify-center">
            <a className="inline-flex justify-between items-center align-middle mt-8 py-2 px-12 text-sm  rounded-full text-black bg-gradient-to-r from-[#efb98f] via-[#ef9a06] to-[#f1871d]">
              <h2 className="text-2xl font-bold">IEEE Members :</h2>
              <span className="text-2xl font-bold">Rs.650/-</span>
            </a>
          </div>

          <div className="flex items-center justify-center">
            <a className="inline-flex justify-between items-center align-middle mt-8 py-2 px-6 text-sm  rounded-full text-black bg-gradient-to-r from-[#efb98f] via-[#ef9a06] to-[#f1871d]">
              <h2 className="text-2xl font-bold">Non-IEEE Members :</h2>
              <span className="text-2xl font-bold">Rs.950/-</span>
            </a>
          </div>

          <div className="flex items-center justify-center">
            <a className="inline-flex justify-between items-center align-middle mt-8 py-2 px-6 mb-20 text-sm  rounded-full text-black bg-gradient-to-r from-[#efb98f] via-[#ef9a06] to-[#f1871d]">
              <h2 className="text-2xl font-bold">First year (SCT ians) :</h2>
              <span className="text-2xl font-bold">Rs.700/-</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tracks;
