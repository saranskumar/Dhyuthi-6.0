"use client";

import { useState } from "react";

interface AccordionItemProps {
  title: string;
  content: string;
}
const AccordionItem: React.FC<AccordionItemProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="backdrop-blur-sm text-white rounded-lg shadow-md my-4">
      <div
        className="cursor-pointer flex justify-between items-center p-4 font-bold"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <span>{isOpen ? "-" : "+"}</span>
      </div>
      <div
        className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="p-4 border-t border-gray-500">{content}</div>
      </div>
    </div>
  );
};

const Faqs = () => {
  const items = [
    {
      title: "What can I expect from Dhyuthi 5.0?",
      content:
        "Dhyuthi promises to be an invaluable opportunity for learning, networking, and innovation through hands-on experience in three distinct tracks, along with cultural events fostering creativity, thereby ensuring a well-rounded experience for participants.",
    },
    {
      title: "Will I get certificates for participation?",
      content:
        "Yes, participants will receive a workshop certificate and a competition certificate, 30 KTU points, for the corresponding track they participate in.",
    },
    {
      title: "Are meals included for participants during the event?",
      content: "Yes, lunch and dinner will be provided for all participants.",
    },
    {
      title: "Is accommodation available for participants?",
      content:
        "Yes, we provide accommodation facilities for students coming from far. However, extra charges apply. Breakfast will be provided for all students availing this service.",
    },
  ];

  return (
    <div id="page6" className="w-full flex justify-center items-center ">
      <div className="md:w-[80%] m-3 mt-16 justify-center items-center">
        <h2 className=" font-palanquin text-4xl mb-10 font-bold ">FAQs</h2>

        {items.map((item, index) => (
          <AccordionItem
            key={index}
            title={item.title}
            content={item.content}
          />
        ))}
      </div>
    </div>
  );
};

export default Faqs;
