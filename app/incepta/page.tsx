"use client";
import React from 'react'
import { Calendar, MapPin,  Users, ArrowRight,  Network } from 'lucide-react'
import Image from 'next/image';
 
export default function Track1Page() {
 



  return (
    <div className='min-h-screen bg-transparent'>
      {/* Hero Section */}
      <div className='relative'>
        <div className='relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8'>
          <div className='grid md:grid-cols-2 gap-12 items-center'>
            {/* Event Poster Card */}
            <div className='relative'>
              <div className='bg-black/40 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-purple-500/20'>
                <div className='text-center'>
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-6">
                      <Image
                        src="/incepta.jpg"          // replace with your poster
                        alt="TRACK1 Poster"
                        fill
                        className="object-cover object-center"
                        priority={false}
                      />
                    </div>


                  <div className='space-y-4 text-purple-200'>
                    <div className='flex items-center justify-center gap-2'>
                      <Calendar className='w-5 h-5 text-purple-400' />
                      <span className='font-semibold'>24-25-26 Oct 2025</span>
                    </div>

                  

                    <div className='flex items-center justify-center gap-2'>
                      <MapPin className='w-5 h-5 text-purple-400' />
                      <span>SCTCE, Pappanamcode,Trivandrum</span>
                    </div>

                    
                  </div>

                  
                </div>
              </div>
            </div>

            {/* Event Description */}
            <div className='text-white'>
              <h2 className='text-5xl font-bold leading-tight'>
                Incepta

              </h2>
                 <p className='block text-3xl font-semibold bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent'>
                  Design it, Drive it, Dominate the field
                </p>
              <p className='text-xl mb-8 mt-6 text-purple-200 leading-relaxed'>
                Join us for a dynamic, hands-on experience where you will design, fabricate, and control a custom mechatronic prototype. Your essential kickstart into product engineering.
              </p>

              <div className='flex flex-wrap gap-4 mb-8'>
                <span className='bg-purple-500/30 text-purple-200 px-4 py-2 rounded-full text-sm font-medium'>
                  Fusion 360

                </span>
                <span className='bg-purple-500/30 text-purple-200 px-4 py-2 rounded-full text-sm font-medium'>
                  ESP32

                </span>
                <span className='bg-purple-500/30 text-purple-200 px-4 py-2 rounded-full text-sm font-medium'>
                3D Printing
                </span>
                 <span className='bg-purple-500/30 text-purple-200 px-4 py-2 rounded-full text-sm font-medium'>
                  Product development
                </span>
              </div>

              <a
                href='/incepta/reg'
                className='inline-flex items-center bg-gradient-to-r from-purple-600 to-purple-800 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-purple-900 transform hover:scale-105 transition-all duration-300 shadow-lg'
              >
                Register Now
                <ArrowRight className='ml-2 w-5 h-5' />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* About Event Section */}
      <section
  id="about-event"   // <- this is the target
  className="max-w-4xl mx-auto my-10 rounded-3xl text-white  p-6"
>
      <div id="abt1" className='max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl font-bold text-white mb-4'>About The Event</h2>
          <p className='text-xl text-purple-200 max-w-3xl mx-auto'>
           Learn how to design and simulate your own robot chassis using 3D CAD tools and then bring it to life through hands-on assembly and electronics integration. Participants will explore the basics of CAD, motors, controllers, and sensors while building a two-wheel drive robot from the ground up. The workshop concludes with an exciting RoboFootball competition, where teams put their creations to the test in a thrilling match of skill, design, and strategy.
          </p>
        </div>

        <div className='grid md:grid-cols-3 gap-8 mb-16'>
          <div className='bg-black/40 backdrop-blur-md p-8 rounded-xl shadow-lg hover:shadow-purple-500/30 transition-shadow duration-300 border border-purple-500/10'>
            <div className='w-16 h-16 bg-purple-600/20 rounded-lg flex items-center justify-center mb-6'>
              <Users className='w-8 h-8 text-purple-400' />
            </div>
            <h3 className='text-xl font-bold text-white mb-4'>Expert Speakers</h3>
            <p className='text-purple-200'>
             Learn practical methods and design secrets from senior student mentors and faculty experts currently specializing in mechatronics and digital fabrication.

            </p>
          </div>

          <div className='bg-black/40 backdrop-blur-md p-8 rounded-xl shadow-lg hover:shadow-purple-500/30 transition-shadow duration-300 border border-purple-500/10'>
            <div className='w-16 h-16 bg-purple-600/20 rounded-lg flex items-center justify-center mb-6'>
              <Calendar className='w-8 h-8 text-purple-400' />
            </div>
            <h3 className='text-xl font-bold text-white mb-4'>Hands-on Workshops</h3>
            <p className='text-purple-200'>
              Design, 3D-Print, Wire, and Code your own wirelessly controlled mechatronic vehicle, culminating in a systems validation challenge.

            </p>
          </div>

          <div className='bg-black/40 backdrop-blur-md p-8 rounded-xl shadow-lg hover:shadow-purple-500/30 transition-shadow duration-300 border border-purple-500/10'>
            <div className='w-16 h-16 bg-purple-600/20 rounded-lg flex items-center justify-center mb-6'>
              <Network className='w-8 h-8 text-purple-400' />
            </div>
            <h3 className='text-xl font-bold text-white mb-4'>Networking</h3>
            <p className='text-purple-200'>
              Gain immediate skills in CAD modeling, embedded systems programming, and mechatronics integration crucial for modern engineering roles.
            </p>
          </div>
        </div>
      </div>
</section>
      
      

      {/* Call-to-action at the bottom */}
      <div className="bg-purple-600/50 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Join INCEPTA?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Do not miss this opportunity to be part of the premier tech event of the
            year. Secure your spot today and connect with the future of technology.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/incepta/reg"
              className="inline-flex items-center justify-center bg-white text-purple-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-50 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Register Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>

            <button
              onClick={() => {
                const el = document.getElementById("about-event");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center bg-[#9348fc] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#7b3ae0] transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Learn More
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}