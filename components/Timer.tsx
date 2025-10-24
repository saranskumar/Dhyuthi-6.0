"use client";

import React, { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Timer = () => {
  const eventDate = new Date("2025-10-24T16:30:00");

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date();
    const difference = eventDate.getTime() - now.getTime();

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

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [eventStarted, setEventStarted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const tl = calculateTimeLeft();
      setTimeLeft(tl);

      if (
        tl.days <= 0 &&
        tl.hours <= 0 &&
        tl.minutes <= 0 &&
        tl.seconds <= 0
      ) {
        setEventStarted(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const format = (num: number) => num.toString().padStart(2, "0");

  if (eventStarted) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full text-white font-mono text-center px-4 overflow-hidden">
        <h1 className="text-[8vw] sm:text-[6vw] md:text-[4vw] lg:text-[3vw] font-extrabold bg-gradient-to-r from-[#6a06dd] via-[#8242dc] to-[#9348fc] bg-clip-text text-transparent animate-pulse leading-tight break-words">
          {/* FIX 1: Replaced &nbsp; with regular spaces to allow wrapping */}
          DHYUTHI&nbsp;6.0 IS LIVE NOW! 🎉
        </h1>
      
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full text-white font-mono text-center px-4 overflow-hidden">
      <p className="text-[4vw] sm:text-base md:text-lg mb-4 sm:mb-6 italic text-purple-200">
        THE MUCH AWAITED EVENT WILL START IN
      </p>

      {/* Timer Section */}
      {/* FIX 2: Removed 'flex-wrap' to force timer onto one line */}
      <div className="flex justify-center items-center gap-2 sm:gap-4 md:gap-6 text-[9vw] sm:text-[6vw] md:text-[4.5vw] lg:text-[3.5vw] font-bold leading-none">
        {[
          { label: "Days", value: format(timeLeft.days) },
          { label: "Hours", value: format(timeLeft.hours) },
          { label: "Minutes", value: format(timeLeft.minutes) },
          { label: "Seconds", value: format(timeLeft.seconds) },
        ].map((unit, index) => (
          <React.Fragment key={unit.label}>
            <div className="flex flex-col items-center min-w-[55px] sm:min-w-[70px]">
              <span>{unit.value}</span>
              <span className="text-[3vw] sm:text-xs md:text-base mt-1 text-purple-300">
                {unit.label}
              </span>
            </div>
            {index !== 3 && (
              <span className="text-[6vw] sm:text-[4vw] md:text-[3.5vw] opacity-70">
                :
              </span>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="mt-6 sm:mt-8 max-w-[90%] sm:max-w-md md:max-w-xl">
        <p className="text-[3vw] sm:text-sm md:text-base bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
          Fostering collaboration • innovation • diverse activities
        </p>
      </div>
    </div>
  );
};