import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxios";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { Link } from "react-router";

const LatestTicket = () => {
  const axiosSecure = useAxiosSecure();

  const { data: approvedLatestTicket = [], isLoading } = useQuery({
    queryKey: ["approved-tickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets/approved");
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const latestSixTickets = [...approvedLatestTicket]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Title Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
          Latest Tickets
        </h1>
        <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
          Discover our newest travel experiences and secure your spot today
        </p>
        <div className="w-24 h-1 bg-primary mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Tickets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestSixTickets.map((ticket) => (
        <div
          key={ticket._id}
          className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300  overflow-hidden group"
        >
          {/* Image with overlay effect */}
          <figure className="relative overflow-hidden">
            <img
              src={ticket.imageURL}
              alt={ticket.ticketTitle}
              className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Price badge on image */}
            <div className="absolute top-3 right-3 bg-primary text-white px-4 py-2 rounded-full font-bold shadow-lg">
              ${ticket.price}
            </div>
          </figure>

          <div className="card-body">
            {/* Ticket Title */}
            <h2 className="card-title text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
              {ticket.ticketTitle}
            </h2>

            {/* Info Grid */}
            <div className="space-y-3 mb-4">
              {/* Quantity and Transport in a row */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span className="font-semibold text-base-content/70">Quantity:</span>
                  <span className="font-bold text-primary">{ticket.quantity}</span>
                </div>
                <div className="badge badge-outline badge-secondary">
                  {ticket.transportType}
                </div>
              </div>

              {/* Perks Section */}
              <div className="bg-base-200 rounded-lg p-3">
                <span className="font-semibold text-sm text-base-content/70 mb-2 block">
                  What's Included:
                </span>
                <ul className="space-y-1">
                  {ticket.perks.slice(0, 3).map((perk, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-primary mt-0.5">✓</span>
                      <span className="line-clamp-1">{perk}</span>
                    </li>
                  ))}
                  {ticket.perks.length > 3 && (
                    <li className="text-xs text-base-content/60 italic">
                      +{ticket.perks.length - 3} more perks
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* See Details Button */}
            <div className="card-actions">
                <Link to={`/all-tickets-details/${ticket._id}`}>
              <button className="btn btn-primary w-full group/btn">
                <span>See Details</span>
                <svg 
                  className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default LatestTicket;