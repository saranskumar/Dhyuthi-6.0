"use client";

import React, { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Timer = () => {
  const calculateTimeLeft = (): TimeLeft => {
    const eventDate: Date = new Date("2025-10-10T16:30:00"); // Replace with your event date
    const now: Date = new Date();
    const difference: number = eventDate.getTime() - now.getTime(); // Use getTime() to get the timestamp in milliseconds

    let timeLeft: TimeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!timeLeft) {
    // Render nothing until the client has mounted
    return null;
  }

  return (
      
    <div className="h-screen flex flex-col items-center justify-center  text-white font-mono p-4">
       <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none  md:text-5xl lg:text-6xl text-white">
          Dhyuthi 6.0
        </h1>
        <a className="inline-flex justify-between items-center mt-8 py-1 px-1 pr-4 mb-7 text-sm  rounded-full text-white bg-gradient-to-r from-[#cc0777] via-[#ef9a06] to-[#f11da3]">
          <span className="text-xl font-medium">
           Coming Soon!!
          </span>
        </a>
        
    
      </div>
      <p className="text-base sm:text-lg mb-4 italic text-center">
        THE MUCH AWAITED EVENT WILL START IN
      </p>

      <div className="flex flex-wrap justify-center space-x-2 sm:space-x-4 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold">
        <div className="flex flex-col items-center">
          <span>{timeLeft.days || "0"}</span>
          <span className="text-xs sm:text-sm md:text-base mt-1 sm:mt-2">
            Days
          </span>
        </div>
        <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl">-</span>
        <div className="flex flex-col items-center">
          <span>{timeLeft.hours || "0"}</span>
          <span className="text-xs sm:text-sm md:text-base mt-1 sm:mt-2">
            Hours
          </span>
        </div>
        <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl">-</span>
        <div className="flex flex-col items-center">
          <span>{timeLeft.minutes || "0"}</span>
          <span className="text-xs sm:text-sm md:text-base mt-1 sm:mt-2">
            Minutes
          </span>
        </div>
        <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl">-</span>
        <div className="flex flex-col items-center">
          <span>{timeLeft.seconds || "0"}</span>
          <span className="text-xs sm:text-sm md:text-base mt-1 sm:mt-2">
            Seconds
          </span>
        </div>
      </div>

      <div className="mt-8 text-center">
        {/*<p className="uppercase text-xs sm:text-sm md:text-base">Venue:</p>*/}
        <p className="text-sm sm:text-base bg-gradient-to-r from-[#f292b8] via-[#ce487e] to-[#e70a62] bg-clip-text text-transparent md:text-lg lg:text-xl">
          Fostering collaboration - innovation - diverse activities
        </p>
      </div>
    </div>
  );
};
