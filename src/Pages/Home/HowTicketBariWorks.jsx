import React from "react";
import {
  FaSearch,
  FaTicketAlt,
  FaCheckCircle,
  FaCreditCard,
} from "react-icons/fa";

const steps = [
  {
    id: 1,
    icon: <FaSearch />,
    title: "Search Your Route",
    description:
      "Choose your departure and destination to find available tickets instantly.",
  },
  {
    id: 2,
    icon: <FaTicketAlt />,
    title: "Select a Ticket",
    description:
      "Browse tickets by transport type, price, and schedule that fit your needs.",
  },
  {
    id: 3,
    icon: <FaCheckCircle />,
    title: "Book & Get Approved",
    description:
      "Confirm your booking request. Vendors review and approve your request.",
  },
  {
    id: 4,
    icon: <FaCreditCard />,
    title: "Pay & Travel",
    description:
      "Complete secure payment after approval and enjoy a smooth journey.",
  },
];

const HowTicketBariWorks = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 bg-base-100 text-base-content">
      {/* Section Header */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          How <span className="text-primary">TicketBari</span> Works
        </h2>
        <p className="max-w-2xl mx-auto text-base-content/70">
          Booking tickets with TicketBari is fast, simple, and secure.
          Follow these easy steps to start your journey.
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step) => (
          <div
            key={step.id}
            className="h-full rounded-2xl p-6 bg-base-200 shadow-md hover:shadow-lg transition duration-300 text-center"
          >
            {/* Icon */}
            <div className="flex justify-center mb-5 text-4xl text-primary">
              {step.icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold mb-3">
              {step.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-base-content/70 leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowTicketBariWorks;
