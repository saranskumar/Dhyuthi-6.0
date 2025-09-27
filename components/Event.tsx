"use client";

import React from "react";
import Timeline from "./ui/timeline";

type EventEntry = {
  time: string;
  event: string;
  description: string;
  color?: string;
};

const Event: React.FC = () => {
  const events: EventEntry[] = [
    // Day 1
    {
      time: "",
      event: "DAY 1",
      description: "",
      color: "#9333EA", // Deeper purple
    },
    {
      time: "5:00 pm - 6:00 pm",
      event: "Inaugural Ceremony",
      description: "Opening ceremony and welcome.",
      color: "#9333EA",
    },

    // Day 2
    {
      time: "",
      event: "DAY 2",
      description: "",
      color: "#3B82F6", // Brighter blue
    },
    {
      time: "8:30 am - 9:15 am",
      event: "Registration",
      description: "Attendees check in and register.",
      color: "#3B82F6",
    },
    {
      time: "9:30 am - 12:30 pm",
      event: "Workshop Session 1",
      description: "First workshop covering initial topics.",
      color: "#3B82F6",
    },
    {
      time: "12:30 pm - 1:30 pm",
      event: "Lunch",
      description: "Lunch break for all attendees.",
      color: "#3B82F6",
    },
    {
      time: "1:30 pm - 3:30 pm",
      event: "Workshop Session 2",
      description: "Second workshop covering advanced topics.",
      color: "#3B82F6",
    },
    {
      time: "3:30 pm - 4:30 pm",
      event: "Game",
      description: "Fun activities for attendees.",
      color: "#3B82F6",
    },
    {
      time: "4:30 pm - 7:30 pm",
      event: "Culturals and Dinner",
      description: "Cultural performances and dinner.",
      color: "#3B82F6",
    },

    // Day 3
    {
      time: "",
      event: "DAY 3",
      description: "",
      color: "#059669", // Richer green
    },
    {
      time: "9:00 am - 10:00 am",
      event: "Networking Session",
      description: "Networking and interactions.",
      color: "#059669",
    },
    {
      time: "10:00 am - 10:30 am",
      event: "Break",
      description: "Short refreshments break.",
      color: "#059669",
    },
    {
      time: "10:30 am - 12:30 pm",
      event: "Workshop & Competitions",
      description: "Workshops and competitions.",
      color: "#059669",
    },
    {
      time: "12:30 pm - 1:30 pm",
      event: "Lunch",
      description: "Lunch break.",
      color: "#059669",
    },
    {
      time: "1:30 pm - 2:30 pm",
      event: "Influencer Talk Session",
      description: "Talk session with influencers.",
      color: "#059669",
    },
    {
      time: "2:30 pm - 5:30 pm",
      event: "Game",
      description: "Games and activities.",
      color: "#059669",
    },
    {
      time: "5:30 pm - 6:30 pm",
      event: "Prize Distribution and Closing Ceremony",
      description: "Prizes and closing ceremony.",
      color: "#059669",
    },
  ];

  return (
    <section id="page4" className="px-4 md:px-10 lg:px-24 py-10">
      <h2 className="m-10 md:ml-48 font-palanquin text-4xl mb-10 font-bold lg:max-w-lg lg:text-start">
        Schedule
      </h2>

      <div className="mx-auto max-w-6xl">
        <Timeline data={events} />
      </div>
    </section>
  );
};

export default Event;
