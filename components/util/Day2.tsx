import React from "react";

const Day2 = () => {
  const item = [
    {
      id: 1,
      time: "8:30 am - 9:15 am",
      event: "Registration",
      description: "Attendees will check in and register for the workshop.",
    },
    {
      id: 2,
      time: "9:30 am - 12:30 pm",
      event: "Workshop Session 1",
      description:
        "The first session of the workshop, covering initial topics.",
    },
    {
      id: 3,
      time: "12:30 pm - 1:30 pm",
      event: "Lunch",
      description: "Lunch break for all attendees.",
    },
    {
      id: 4,
      time: "1:30 pm - 3:30 pm",
      event: "Workshop Session 2",
      description:
        "The second session of the workshop, covering advanced topics.",
    },
    {
      id: 5,
      time: "3:30 pm - 4:30 pm",
      event: "Game",
      description: "Fun and engaging activities for attendees.",
    },
    {
      id: 6,
      time: "4:30 pm - 7:30 pm",
      event: "Culturals and Dinner",
      description: "Cultural performances followed by dinner.",
    },
  ];

  return (
    <div>
      <div>
        <ol className="relative border-s border-gray-700">
          {item.map((list, index) => (
            <li className="mb-10 ms-6" key={index}>
              <span className="absolute flex items-center justify-center w-6 h-6  rounded-full -start-3 ring-8 ring-gray-900 bg-[#ef9a06]">
                <svg
                  className="w-2.5 h-2.5 text-[#ffffff]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </span>
              <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                {list.event}
                {/* <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3">
                  Latest
                </span> */}
              </h3>
              <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {list.time}
              </time>
              <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                {list.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Day2;
