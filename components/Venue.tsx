import React from "react";
import { MapPinIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";


const Venue = () => {
  return (
    <div id="page5" className="w-full flex justify-center items-center ">
      <div className="md:w-[80%] m-3 mt-8">
        <h2 className=" font-palanquin text-4xl mb-10 font-bold text-[#9348fc] ">Venue</h2>
        <div className="">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1087.1118851564481!2d76.97857658187175!3d8.470231553187036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05baee56e6b99b%3A0x4ce024c88eb0ddcb!2sSree%20Chitra%20Thirunal%20College%20of%20Engineering%2C%20Thiruvananthapuram!5e0!3m2!1sen!2sin!4v1711636446051!5m2!1sen!2sin"
            width="600"
            height="450"
            // Source Stackoverflow
            style={{ border: 0, filter: 'invert(90%) hue-rotate(250deg) saturate(150%) brightness(80%)' }}
            // allowfullscreen={false}
            loading="lazy"
            className="w-full rounded-md mb-5"
            // referrerpolicy="no-referrer-when-downgrade"
          ></iframe>

          <div className="backdrop-blur-sm text-white p-6 rounded-lg">
            <div className="mb-6">
              <h2 className="flex items-center text-lg font-bold">
                 <MapPinIcon className="w-6 h-6 text-purple-400 mr-2" />
                Address
              </h2>
              <p>
                NH 66, CTO Colony, Pappanamcode, Thiruvananthapuram, Kerala
                695018
              </p>
            </div>
            <div className="mb-6">
              <h2 className="flex items-center text-lg font-bold">
                <EnvelopeIcon className="w-6 h-6 text-purple-400 mr-2" />
                Email
              </h2>
              <a
                href="mailto:mailtoieeesctsb@gmail.com"
                target="_blank"
                className="text-white hover:underline"
              >
                mailtoieeesctsb@gmail.com
              </a>
            </div>
            <div>
              <h2 className="flex items-center text-lg font-bold">
                 <PhoneIcon className="w-6 h-6 text-purple-400 mr-2" />
                Call
              </h2>
              <p className="pt-2">Alfy Joseph Kunjumon</p>
              <a href="tel:+91 9567694707" target="_blank"> +91 9567694707</a>
              <p className="pt-2">Sneha Bijee</p>
              <a href="tel:+918590499957" target="_blank"> +91 8590499957</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Venue;
