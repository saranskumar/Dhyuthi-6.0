import React from "react";
import Image from "next/image";
import logo from "../assets/images/logo.png";
import { FaLinkedin, FaGithub, FaEnvelope, FaInstagram } from "react-icons/fa";

export const Fotter = () => {
  return (
    <footer className="rounded-lg shadow  m-4 bg-transparent">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="#"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <Image
              src={logo}
              alt=""
              loading="lazy"
              width="45"
              height="45"
              decoding="async"
              data-nimg="1"
              className=" object-contain rounded-md"
            />

            <button className="text-2xl font-semibold leading-6 bg-gradient-to-r from-[#cc0777] via-[#ef9a06] to-[#f11da3] bg-clip-text text-transparent">
              Dhyuthi 6.0
            </button>
          </a>
          <div className="mt-16 text-left">
            <h3 className="text-lg font-semibold text-white">
              Connect with us
            </h3>
            <div className="mt-4 flex justify-left space-x-6">
              <a
                href="https://ieeesctsb.org/"
                className="text-white hover:text-gray-300"
              >
                IEEE SCTSB
              </a>
              <a
                href="https://www.instagram.com/ieeesctsb/"
                className="text-white hover:text-gray-300"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://in.linkedin.com/company/ieeesctsb"
                className="text-white hover:text-gray-300"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="mailto:ieeectsctsb@gmail.com"
                className="text-white hover:text-gray-300"
              >
                <FaEnvelope size={24} />
              </a>
              <a
                href="https://github.com/amithbiju/dhyuthi_5.0"
                className="text-white hover:text-gray-300"
              >
                <FaGithub size={24} />
              </a>
            </div>
          </div>
          {/* <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0text-gray-400">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul> */}
        </div>
        <hr className="my-6 sm:mx-auto border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Dhyuthi 6.0
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};
