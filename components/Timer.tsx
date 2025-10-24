"use client";

import React, { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Timer = () => {
  const eventDate = new Date("2025-10-24T16:30:00"); // Set your event date/time

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
      <div className="flex flex-col items-center justify-center text-white font-mono p-20 text-center">
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent animate-pulse">
          DHYUTHI&nbsp;6.0&nbsp;IS&nbsp;LIVE&nbsp;NOW!! 🎉
        </h1>
        <p className="text-lg sm:text-xl mt-6 text-purple-300 italic">
          Let the innovation ignite ✨
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center text-white font-mono p-8 sm:p-12 md:p-20 lg:p-40 pt-40">
      <p className="text-base sm:text-lg mb-6 sm:mb-8 italic text-center">
        THE MUCH AWAITED EVENT WILL START IN
      </p>

      <div className="flex flex-row items-center justify-center gap-2 sm:gap-4 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold">
        <div className="flex flex-col items-center">
          <span>{format(timeLeft.days)}</span>
          <span className="text-xs sm:text-sm md:text-base mt-1 sm:mt-2">
            Days
          </span>
        </div>
        <span>:</span>
        <div className="flex flex-col items-center">
          <span>{format(timeLeft.hours)}</span>
          <span className="text-xs sm:text-sm md:text-base mt-1 sm:mt-2">
            Hours
          </span>
        </div>
        <span>:</span>
        <div className="flex flex-col items-center">
          <span>{format(timeLeft.minutes)}</span>
          <span className="text-xs sm:text-sm md:text-base mt-1 sm:mt-2">
            Minutes
          </span>
        </div>
        <span>:</span>
        <div className="flex flex-col items-center">
          <span>{format(timeLeft.seconds)}</span>
          <span className="text-xs sm:text-sm md:text-base mt-1 sm:mt-2">
            Seconds
          </span>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm sm:text-base bg-[#9348fc] bg-clip-text text-transparent md:text-lg lg:text-xl">
          Fostering collaboration • innovation • diverse activities
        </p>
      </div>
    </div>
  );
};
