"use client";

import { useState } from "react";
import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-scroll";
import Image from 'next/image';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header className="  backdrop-blur-xl fixed w-full z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <span className="sr-only">Your Company</span>
          <Link
            activeClass="active"
            to="page0"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
          >
            <button className="text-2xl font-semibold leading-6 text-[#5E2B99]">
              <Image alt='logo' src='/logo2.png' width={100} height={80}></Image>
            </button>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-300"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Link
            activeClass="active"
            to="page1"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
          >
            <button className="text-sm font-semibold leading-6 text-gray-100">
              About
            </button>
          </Link>
          <Link
            activeClass="active"
            to="page2"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
          >
            <button className="text-sm font-semibold leading-6 text-gray-100">
              Tracks
            </button>
          </Link>
          {/* <Link
            activeClass="active"
            to="page3"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
          >
            <button className="text-sm font-semibold leading-6 text-gray-100">
              Events
            </button>
          </Link> */}
          <Link
            activeClass="active"
            to="page4"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
          >
            <button className="text-sm font-semibold leading-6 text-gray-100">
              Schedule
            </button>
          </Link>
          <Link
            activeClass="active"
            to="page8"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
          >
            <button className="text-sm font-semibold leading-6 text-gray-100">
              Gallery
            </button>
          </Link>
          <Link
            activeClass="active"
            to="page6"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
          >
            <button className="text-sm font-semibold leading-6 text-gray-100">
              FAQs
            </button>
          </Link>
          <Link
            activeClass="active"
            to="page5"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
          >
            <button className="text-sm font-semibold leading-6 text-gray-100">
              Contact
            </button>
          </Link>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a
            href="/track"
            className="text-sm font-semibold leading-6 text-gray-100"
          >
            Register Now<span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <span className="sr-only">Your Company</span>
            <Link
              activeClass="active"
              to="page0"
              spy={true}
              smooth={true}
              offset={0}
              duration={500}
              onClick={() => {
                setMobileMenuOpen(false);
              }}
            >
              <button className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-100 hover:bg-gray-700">
              <Image alt='logo' src='/logo2.png' width={100} height={80}></Image>
            
              </button>
            </Link>
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
            <div className="-my-6 divide-y divide-gray-700">
              <div className="space-y-2 py-6">
                <Link
                  activeClass="active"
                  to="page1"
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={500}
                  onClick={() => {
                    setMobileMenuOpen(false);
                  }}
                >
                  <button className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-100 hover:bg-gray-700">
                    About
                  </button>
                </Link>
                <Link
                  activeClass="active"
                  to="page2"
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={500}
                  onClick={() => {
                    setMobileMenuOpen(false);
                  }}
                >
                  <button className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-100 hover:bg-gray-700">
                    Tracks
                  </button>
                </Link>
                {/* <Link
                  activeClass="active"
                  to="page3"
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={500}
                  onClick={() => {
                    setMobileMenuOpen(false);
                  }}
                >
                  <button className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-100 hover:bg-gray-700">
                    Events
                  </button>
                </Link> */}
                <Link
                  activeClass="active"
                  to="page4"
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={500}
                  onClick={() => {
                    setMobileMenuOpen(false);
                  }}
                >
                  <button className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-100 hover:bg-gray-700">
                    Schedule
                  </button>
                </Link>
                <Link
                  activeClass="active"
                  to="page8"
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={500}
                  onClick={() => {
                    setMobileMenuOpen(false);
                  }}
                >
                  <button className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-100 hover:bg-gray-700">
                    Gallery
                  </button>
                </Link>
                <Link
                  activeClass="active"
                  to="page6"
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={500}
                  onClick={() => {
                    setMobileMenuOpen(false);
                  }}
                >
                  <button className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-100 hover:bg-gray-700">
                    FAQs
                  </button>
                </Link>
                <Link
                  activeClass="active"
                  to="page5"
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={500}
                  onClick={() => {
                    setMobileMenuOpen(false);
                  }}
                >
                  <button className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-100 hover:bg-gray-700">
                    Contact
                  </button>
                </Link>
              </div>
              
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};
