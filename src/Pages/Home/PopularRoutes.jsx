import React from "react";
import { FaBus, FaTrain, FaPlane, FaShip } from "react-icons/fa";

const routes = [
  {
    id: 1,
    from: "Dhaka",
    to: "Chattogram",
    transports: [<FaBus />, <FaTrain />, <FaPlane />],
  },
  {
    id: 2,
    from: "Dhaka",
    to: "Cox’s Bazar",
    transports: [<FaBus />, <FaPlane />],
  },
  {
    id: 3,
    from: "Rajshahi",
    to: "Sylhet",
    transports: [<FaBus />, <FaTrain />, <FaPlane />],
  },
  {
    id: 4,
    from: "Sylhet",
    to: "Rajshahi",
    transports: [<FaBus />, <FaTrain />],
  },
  {
    id: 5,
    from: "Dhaka",
    to: "Khulna",
    transports: [<FaBus />, <FaTrain />],
  },
  {
    id: 6,
    from: "Chattogram",
    to: "Barishal",
    transports: [<FaBus />, <FaShip />],
  },
];

const PopularRoutes = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 bg-base-100 text-base-content">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Popular <span className="text-primary">Routes</span>
        </h2>
        <p className="max-w-2xl mx-auto text-base-content/70">
          Explore the most traveled routes starting from Dhaka with reliable and
          comfortable transport options.
        </p>
      </div>

      {/* Routes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {routes.map((route) => (
          <div
            key={route.id}
            className="h-full rounded-2xl p-6 bg-base-200 shadow-md hover:shadow-lg transition duration-300 text-center"
          >
            <h3 className="text-xl font-semibold mb-3">
              {route.from} → {route.to}
            </h3>

            <div className="flex justify-center gap-4 text-primary text-2xl mb-4">
              {route.transports.map((icon, index) => (
                <span key={index}>{icon}</span>
              ))}
            </div>

            <p className="text-sm text-base-content/70">
              Multiple transport choices available for a smooth journey.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularRoutes;
