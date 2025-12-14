import React from "react";
import {
  FaBus,
  FaShieldAlt,
  FaClock,
  FaWallet,
  FaUserCheck,
  FaHeadset,
} from "react-icons/fa";

const features = [
  {
    id: 1,
    icon: <FaBus />,
    title: "Multiple Transport Options",
    description:
      "Book bus, train, launch, and flight tickets from a single platform with verified vendors.",
  },
  {
    id: 2,
    icon: <FaShieldAlt />,
    title: "Secure & Trusted Payments",
    description:
      "All payments are processed securely through Stripe with full transaction transparency.",
  },
  {
    id: 3,
    icon: <FaClock />,
    title: "Real-Time Availability",
    description:
      "Get up-to-date ticket availability, live countdowns, and instant booking confirmations.",
  },
  {
    id: 4,
    icon: <FaWallet />,
    title: "Affordable Pricing",
    description:
      "Compare prices easily and choose the best option that fits your budget.",
  },
  {
    id: 5,
    icon: <FaUserCheck />,
    title: "Verified Vendors",
    description:
      "Every ticket is reviewed and approved by our admin to ensure authenticity.",
  },
  {
    id: 6,
    icon: <FaHeadset />,
    title: "24/7 Customer Support",
    description:
      "Our support team is always ready to assist you before and after booking.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 bg-base-100 text-base-content">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Why Choose <span className="text-primary">TicketBari</span>?
        </h2>
        <p className="max-w-2xl mx-auto text-base-content/70">
          We make ticket booking simple, secure, and reliable so you can travel
          with confidence.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="h-full rounded-2xl p-6 bg-base-200 shadow-md hover:shadow-lg transition duration-300 text-center"
          >
            <div className="text-4xl text-primary mb-4 flex justify-center">
              {feature.icon}
            </div>

            <h3 className="text-xl font-semibold mb-3">
              {feature.title}
            </h3>

            <p className="text-sm leading-relaxed text-base-content/70">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
