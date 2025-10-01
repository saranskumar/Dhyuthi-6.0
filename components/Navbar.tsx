"use client";

import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import Image from "next/image";
import { Dialog, DialogPanel } from "@headlessui/react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";

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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = 200;
      setScrollProgress(Math.min(scrollTop / maxScroll, 1));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const glassOpacity = 0.1 + scrollProgress * 0.4; // 0.1 → 0.5

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300`}
      style={{
        background: `linear-gradient(to bottom, rgba(30,30,30,${glassOpacity}), rgba(30,30,30,${glassOpacity * 0.8}))`,
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: scrollProgress > 0.5 ? `1px solid rgba(255,255,255,${scrollProgress * 0.08})` : '1px solid rgba(255,255,255,0)',
      }}
    >
      <nav className="flex items-center justify-between h-16 sm:h-20 px-6 lg:px-8 w-full">
        {/* Logo container */}
        <div
          className={`flex-shrink-0 transition-all duration-500 ease-in-out lg:block hidden`}
          style={{
            opacity: scrollProgress,
            transform: `translateY(${(1 - scrollProgress) * -20}px)`,
          }}
        >
          <Link
            to="page0"
            spy={true}
            smooth={true}
            offset={-80}
            duration={500}
            className="flex items-center cursor-pointer"
          >
            <Image
              alt="Logo"
              src="/logo2.png"
              width={50}
              height={50}
              className="h-8 w-auto sm:h-12"
            />
          </Link>
        </div>

        {/* Mobile logo (no animation) */}
        <div className="flex-shrink-0 lg:hidden">
          <Link
            to="page0"
            spy={true}
            smooth={true}
            offset={-80}
            duration={500}
            className="flex items-center cursor-pointer"
          >
            <Image
              alt="Logo"
              src="/logo2.png"
              width={50}
              height={50}
              className="h-8 w-auto sm:h-12"
            />
          </Link>
        </div>

        {/* Desktop nav */}
        <div className="hidden lg:flex flex-1 justify-end space-x-2 xl:space-x-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              className="px-3 sm:px-4 py-2 sm:py-3 rounded-2xl text-sm font-medium text-white hover:text-[#9348fc] cursor-pointer uppercase transition-all duration-300 ease-in-out hover:shadow-lg"
              style={{
                background: 'linear-gradient(135deg, rgba(147,72,252,0.1), rgba(147,72,252,0.05))',
                backdropFilter: 'blur(10px)',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="relative z-50 inline-flex items-center justify-center p-2 text-white transition-all duration-300 ease-in-out rounded-2xl sm:p-3 hover:text-purple-400 focus:outline-none"
            style={{
              background: 'linear-gradient(135deg, rgba(147,72,252,0.15), rgba(147,72,252,0.05))',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" />
        <DialogPanel 
          className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto px-6 py-6 sm:max-w-sm rounded-l-3xl"
          style={{
            background: 'linear-gradient(to left, rgba(20,20,20,0.95), rgba(30,30,30,0.9))',
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            borderLeft: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-2xl p-2.5 text-gray-300 transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(147,72,252,0.1), rgba(147,72,252,0.05))',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
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
                    className="-mx-3 block rounded-2xl px-3 py-2.5 text-base font-semibold leading-7 text-gray-200 cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-800/50"
                    style={{
                      background: 'linear-gradient(135deg, rgba(147,72,252,0.08), rgba(147,72,252,0.02))',
                    }}
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