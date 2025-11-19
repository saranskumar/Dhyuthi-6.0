"use client";

import React, { useEffect, useState, useMemo } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Timer = () => {
  // EVENT WINDOWS
  const eventStart = useMemo(() => new Date("2025-10-24T16:30:00"), []);
  const eventEnd = useMemo(() => new Date("2025-10-26T18:30:00"), []);

  const getTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const diff = eventStart.getTime() - now;

    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft());
  const [status, setStatus] =
    useState<"upcoming" | "live" | "ended">("upcoming");

  useEffect(() => {
    const tick = () => {
      const now = new Date();

      if (now < eventStart) {
        setStatus("upcoming");
      } else if (now >= eventStart && now <= eventEnd) {
        setStatus("live");
      } else {
        setStatus("ended");
      }

      setTimeLeft(getTimeLeft());
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [eventStart, eventEnd]);

  const format = (n: number) => n.toString().padStart(2, "0");

  // ------------------ UI STATES -------------------

  // LIVE
  if (status === "live") {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full text-white font-mono text-center px-4 overflow-hidden">
        <h1 className="text-[8vw] sm:text-[6vw] md:text-[4vw] lg:text-[3vw] font-extrabold bg-gradient-to-r from-[#a006dd] via-[#8242dc] to-[#9348fc] bg-clip-text text-transparent animate-pulse leading-tight">
          DHYUTHI 6.0 <br /> IS LIVE NOW! 🎉
        </h1>
      </div>
    );
  }

  // ENDED
  if (status === "ended") {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full text-white font-mono text-center px-4 overflow-hidden">
        <h1 className="text-[8vw] sm:text-[6vw] md:text-[4vw] lg:text-[3vw] font-extrabold bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent leading-tight">
          DHYUTHI 6.0 <br /> EVENT ENDED 🎉
        </h1>

        <p className="mt-4 text-purple-200 text-lg sm:text-xl">
          Thank you for being part of the experience.
        </p>
      </div>
    );
  }

  // UPCOMING (DEFAULT)
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full text-white font-mono text-center px-4 overflow-hidden">
      <p className="text-[4vw] sm:text-base md:text-lg mb-4 sm:mb-6 italic text-purple-200">
        THE MUCH AWAITED EVENT WILL START IN
      </p>

      {/* TIMER */}
      <div className="flex justify-center items-center gap-2 sm:gap-4 md:gap-6 text-[9vw] sm:text-[6vw] md:text-[4.5vw] lg:text-[3.5vw] font-bold leading-none">
        {[
          { label: "Days", value: format(timeLeft.days) },
          { label: "Hours", value: format(timeLeft.hours) },
          { label: "Minutes", value: format(timeLeft.minutes) },
          { label: "Seconds", value: format(timeLeft.seconds) },
        ].map((unit, idx) => (
          <React.Fragment key={unit.label}>
            <div className="flex flex-col items-center min-w-[55px] sm:min-w-[70px]">
              <span>{unit.value}</span>
              <span className="text-[3vw] sm:text-xs md:text-base mt-1 text-purple-300">
                {unit.label}
              </span>
            </div>
            {idx !== 3 && (
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
