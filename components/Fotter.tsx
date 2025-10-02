import React from "react";
import Image from "next/image";
import { FaLinkedin, FaGithub, FaEnvelope, FaInstagram, FaWhatsapp } from "react-icons/fa";

export const Fotter = () => {
  return (
    <footer className="rounded-lg shadow  m-4 bg-transparent">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="#"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            
             <button className="text-2xl font-semibold leading-6 text-[#5E2B99]">
                   <Image alt='logo' src='/logo2.png' width={100} height={80}></Image>
            </button>
          </a>
          <div className="mt-16 text-left">
            <h3 className="text-lg font-semibold text-white">
              Connect with us
            </h3>
            <div className="mt-4 flex justify-left space-x-6">
              <a
                href="https://ieeesctsb.org/"
                target="_blank"
                className="text-white hover:text-[#9348fc] transition-colors duration-300"
              >
                IEEE SCT SB
              </a>
              <a
                href="https://www.instagram.com/ieeesctsb/"
                target="_blank"
                className="text-white hover:text-[#9348fc] transition-colors duration-300"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://in.linkedin.com/company/ieeesctsb"
                target="_blank"
               className="text-white hover:text-[#9348fc] transition-colors duration-300"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="mailto:mailtoieeesctsb@gmail.com"
                target="_blank"
                className="text-white hover:text-[#9348fc] transition-colors duration-300"
              >
                <FaEnvelope size={24} />
              </a>
                <a
                href="https://whatsapp.com/channel/0029Vakj3LDKLaHsJxbxMG0K"
                target="_blank"
                className="text-white hover:text-[#9348fc] transition-colors duration-300"
              >
                <FaWhatsapp size={24} />
              </a>
              <a
                href="#"
                target="_blank"
                className="text-white hover:text-[#9348fc] transition-colors duration-300"
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
          © 2025{" "}
          <a href="#" className="hover:underline">
            Dhyuthi 6.0
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};
