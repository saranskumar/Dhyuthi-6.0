"use client";

import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import Image from "next/image";

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

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = 200;
      setScrollProgress(Math.min(scrollTop / maxScroll, 1));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate background color opacity for glass effect
  const glassOpacity = 0.1 + scrollProgress * 0.4; // 0.1 → 0.5

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 backdrop-blur-md`}
      style={{
        backgroundColor: `rgba(30,30,30,${glassOpacity})`, // dark frosted glass
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between h-16 sm:h-20 px-6 lg:px-8">
        {/* Logo container */}
        <div
          className={`flex-shrink-0 transition-all duration-500 ease-in-out`}
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
            {/* <span className="ml-2 text-lg font-bold text-white sm:text-2xl whitespace-nowrap"> DHYUTHI 6.0 </span>*/}
          </Link>
        </div>

        {/* Nav buttons always visible */}
        <div className="hidden lg:flex space-x-2 xl:space-x-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              className="px-3 sm:px-4 py-2 sm:py-3 rounded-md text-sm font-medium text-white hover:text-[#9348fc] hover:bg-[#9348fc]/20 cursor-pointer uppercase transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};
