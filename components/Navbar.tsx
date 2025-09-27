"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-scroll";
import Image from 'next/image';

const navLinks = [
  { to: "page0", label: "Home" },
  { to: "page1", label: "About" },
  { to: "page2", label: "Tracks" },
  { to: "page4", label: "Schedule" },
  { to: "page8", label: "Gallery" },
  { to: "page6", label: "FAQs" },
  { to: "page5", label: "Contact" },
];

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-black/30 backdrop-blur-xl fixed w-full z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between h-16 sm:h-20 px-6 lg:px-8">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link
            to="page0"
            spy={true}
            smooth={true}
            offset={-80}
            duration={500}
            className="flex items-center cursor-pointer"
          >
            <Image alt="YESS Logo" src="/logo2.png" width={50} height={50} className="h-8 w-auto sm:h-10 transition-all" />
            
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-2 xl:space-x-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              activeClass="active-nav"
              to={link.to}
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              className="px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-white hover:text-purple-400 hover:bg-purple-900/20 cursor-pointer"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="relative z-50 inline-flex items-center justify-center p-2 text-white transition-colors duration-200 rounded-md sm:p-3 hover:text-purple-400 hover:bg-purple-900/20 focus:outline-none"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dialog */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-40 bg-black/50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-300"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/20">
              <div className="space-y-2 py-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    spy={true}
                    smooth={true}
                    offset={-80}
                    duration={500}
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-200 hover:bg-gray-800 cursor-pointer"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};
