"use client";
import React from 'react'
import { Calendar, MapPin, Clock, Users, ArrowRight, Star } from 'lucide-react'
import Image from 'next/image';
 
export default function Track1Page() {
  const speakers = [
    {
      name: 'Dr. Sarah Johnson',
      title: 'AI Research Director',
      company: 'TechCorp',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      topic: 'Future of Artificial Intelligence'
    },
    {
      name: 'Mike Chen',
      title: 'Senior Developer',
      company: 'DevSolutions',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      topic: 'Building Scalable Applications'
    },
    {
      name: 'Lisa Rodriguez',
      title: 'UX Design Lead',
      company: 'DesignHub',
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      topic: 'Design Systems & User Experience'
    }
  ]


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
                        src="/lock.jpg"          // replace with your poster
                        alt="TRACK1 Poster"
                        fill
                        className="object-cover object-center"
                        priority={false}
                      />
                    </div>


                  <div className='space-y-4 text-purple-200'>
                    <div className='flex items-center justify-center gap-2'>
                      <Calendar className='w-5 h-5 text-purple-400' />
                      <span className='font-semibold'>March 15, 2025</span>
                    </div>

                    <div className='flex items-center justify-center gap-2'>
                      <Clock className='w-5 h-5 text-purple-400' />
                      <span>9:00 AM - 5:00 PM</span>
                    </div>

                    <div className='flex items-center justify-center gap-2'>
                      <MapPin className='w-5 h-5 text-purple-400' />
                      <span>Convention Center, Tech District</span>
                    </div>

                    <div className='flex items-center justify-center gap-2'>
                      <Users className='w-5 h-5 text-purple-400' />
                      <span>500+ Attendees Expected</span>
                    </div>
                  </div>

                  <div className='mt-6 pt-6 border-t border-purple-500/20'>
                    <div className='flex justify-center space-x-2'>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className='w-5 h-5 text-yellow-500 fill-current'
                        />
                      ))}
                    </div>
                    <p className='text-sm text-purple-200 mt-2'>Premium Tech Event</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Description */}
            <div className='text-white'>
              <h2 className='text-5xl font-bold mb-6 leading-tight'>
                The Future of
                <span className='block bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent'>
                  Technology
                </span>
              </h2>

              <p className='text-xl mb-8 text-purple-200 leading-relaxed'>
                Join industry leaders, innovators, and tech enthusiasts for a full
                day of cutting-edge presentations, hands-on workshops, and
                networking opportunities that will shape the future of technology.
              </p>

              <div className='flex flex-wrap gap-4 mb-8'>
                <span className='bg-purple-500/30 text-purple-200 px-4 py-2 rounded-full text-sm font-medium'>
                  AI & Machine Learning
                </span>
                <span className='bg-purple-500/30 text-purple-200 px-4 py-2 rounded-full text-sm font-medium'>
                  Web Development
                </span>
                <span className='bg-purple-500/30 text-purple-200 px-4 py-2 rounded-full text-sm font-medium'>
                  UX Design
                </span>
              </div>

              <a
                href='/track1/reg'
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
            TRACK1 is more than just a conference – it is a catalyst for innovation,
            learning, and meaningful connections in the tech community.
          </p>
        </div>

        <div className='grid md:grid-cols-3 gap-8 mb-16'>
          <div className='bg-black/40 backdrop-blur-md p-8 rounded-xl shadow-lg hover:shadow-purple-500/30 transition-shadow duration-300 border border-purple-500/10'>
            <div className='w-16 h-16 bg-purple-600/20 rounded-lg flex items-center justify-center mb-6'>
              <Users className='w-8 h-8 text-purple-400' />
            </div>
            <h3 className='text-xl font-bold text-white mb-4'>Expert Speakers</h3>
            <p className='text-purple-200'>
              Learn from industry veterans and thought leaders who are shaping the
              future of technology.
            </p>
          </div>

          <div className='bg-black/40 backdrop-blur-md p-8 rounded-xl shadow-lg hover:shadow-purple-500/30 transition-shadow duration-300 border border-purple-500/10'>
            <div className='w-16 h-16 bg-purple-600/20 rounded-lg flex items-center justify-center mb-6'>
              <Calendar className='w-8 h-8 text-purple-400' />
            </div>
            <h3 className='text-xl font-bold text-white mb-4'>Hands-on Workshops</h3>
            <p className='text-purple-200'>
              Participate in interactive sessions and practical workshops.
            </p>
          </div>

          <div className='bg-black/40 backdrop-blur-md p-8 rounded-xl shadow-lg hover:shadow-purple-500/30 transition-shadow duration-300 border border-purple-500/10'>
            <div className='w-16 h-16 bg-purple-600/20 rounded-lg flex items-center justify-center mb-6'>
              <MapPin className='w-8 h-8 text-purple-400' />
            </div>
            <h3 className='text-xl font-bold text-white mb-4'>Networking</h3>
            <p className='text-purple-200'>
              Connect with like-minded professionals, potential collaborators, and
              industry leaders.
            </p>
          </div>
        </div>
      </div>
</section>
      {/* Speakers */}
      <div className='py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>Featured Speakers</h2>
            <p className='text-xl text-purple-200'>
              Meet the industry experts who will be sharing their insights
            </p>
          </div>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
  {speakers.map((speaker, index) => (
    <div
      key={index}
      className="bg-black/40 backdrop-blur-md rounded-xl shadow-lg hover:shadow-purple-500/30 transition-shadow duration-300 overflow-hidden border border-purple-500/10"
    >
     <div className="relative w-full h-64">
  <Image
    src={speaker.image}
    alt={speaker.name}
    fill
    className="object-cover rounded-t-xl"
  />
</div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-1">{speaker.name}</h3>
        <p className="text-purple-400 font-medium mb-2">{speaker.title}</p>
        <p className="text-purple-200 text-sm mb-3">{speaker.company}</p>
        <p className="text-purple-100 font-medium">{speaker.topic}</p>
      </div>
    </div>
  ))}
</div>
        </div>
      </div>    

      

      {/* Call-to-action at the bottom */}
      <div className="bg-purple-600/50 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Join TRACK1?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Do not miss this opportunity to be part of the premier tech event of the
            year. Secure your spot today and connect with the future of technology.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/track1/reg"
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