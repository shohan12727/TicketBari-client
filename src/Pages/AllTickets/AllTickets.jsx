import React from "react";
import useAxiosSecure from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Components/LoadingSpinner";

const AllTickets = () => {
  const axiosSecure = useAxiosSecure();

  const { data: approvedTickets = [], isLoading } = useQuery({
    queryKey: ["approved-tickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets/approved");
      return res.data;
    },
  });

  console.log(approvedTickets);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Available Tickets
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {approvedTickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative h-[250px] overflow-hidden">
                <img
                  src={ticket.imageURL}
                  alt={ticket.ticketTitle}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-white px-2 py-0.5 rounded-full text-xs font-semibold shadow-md">
                  {ticket.transportType}
                </div>
              </div>

              {/* Content */}
              <div className="p-3">
                {/* Title */}
                <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                  {ticket.ticketTitle}
                </h2>

                {/* Route */}
                <div className="flex items-center gap-2 mb-3 text-gray-700">
                  <span className="font-semibold text-sm">
                    {ticket.fromLocation}
                  </span>
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                  <span className="font-semibold text-sm">
                    {ticket.toLocation}
                  </span>
                </div>

                {/* Price & Quantity */}
                <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-200">
                  <div>
                    <p
                      className="text-xl font-bold"
                      style={{ color: "#e30b13" }}
                    >
                      ${ticket.price}
                    </p>
                    <p className="text-xs text-gray-500">per ticket</p>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-semibold text-gray-800">
                      {ticket.quantity}
                    </p>
                    <p className="text-xs text-gray-500">available</p>
                  </div>
                </div>

                {/* Perks */}
                {ticket.perks && ticket.perks.length > 0 && (
                  <div className="mb-2">
                    <p className="text-xs font-semibold text-gray-700 mb-1">
                      Perks:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {ticket.perks.slice(0, 3).map((perk, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full"
                        >
                          {perk}
                        </span>
                      ))}
                      {ticket.perks.length > 3 && (
                        <span className="text-xs text-gray-500 px-2 py-0.5">
                          +{ticket.perks.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Departure Date & Time */}
                <div className="mb-3">
                  <p className="text-xs text-gray-600 mb-0.5">Departure:</p>
                  <p className="font-semibold text-sm text-gray-800">
                    {new Date(ticket.departureDateTime).toLocaleString(
                      "en-US",
                      {
                        dateStyle: "medium",
                        timeStyle: "short",
                      }
                    )}
                  </p>
                </div>

                {/* See Details Button */}
                <button
                  className="w-full py-2 rounded-lg font-semibold text-sm text-white transition-all duration-300 hover:shadow-lg"
                  style={{
                    backgroundColor: "#e30b13",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#A3070C")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#e30b13")
                  }
                >
                  See Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {approvedTickets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No tickets available at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTickets;
