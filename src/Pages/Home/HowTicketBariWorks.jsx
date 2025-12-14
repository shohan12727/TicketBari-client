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
    <section className="max-w-6xl mx-auto px-4 py-16 bg-base-100 text-base-content">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          How <span className="text-primary">TicketBari</span> Works
        </h2>
        <p className="max-w-2xl mx-auto text-base-content/70">
          Booking tickets with TicketBari is fast, simple, and secure. Follow these easy steps.
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative flex flex-col md:flex-row md:justify-between items-center md:items-start">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="flex flex-col items-center md:items-center text-center md:text-center mb-12 md:mb-0 relative"
          >
            {/* Connector Line */}
            {index !== steps.length - 1 && (
              <div className="hidden md:block absolute top-8 right-[-50%] w-[100%] h-1 bg-primary z-0"></div>
            )}

            {/* Icon */}
            <div className="z-10 bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl mb-4">
              {step.icon}
            </div>

            {/* Step Title */}
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>

            {/* Description */}
            <p className="text-base-content/70 text-sm leading-relaxed max-w-xs">
              {step.description}
            </p>

            {/* Mobile Connector */}
            {index !== steps.length - 1 && (
              <div className="block md:hidden w-1 h-12 bg-primary mt-6"></div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowTicketBariWorks;
