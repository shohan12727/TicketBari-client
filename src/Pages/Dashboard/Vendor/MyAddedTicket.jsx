// import React from "react";
// import useAuth from "../../../Hooks/useAuth";
// import useAxiosSecure from "../../../Hooks/useAxios";
// import { useQuery } from "@tanstack/react-query";
// import LoadingSpinner from "../../../Components/LoadingSpinner";

// const MyAddedTicket = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const {
//     data: allManageTickets = [],
//     refetch,
//     isLoading,
//   } = useQuery({
//     queryKey: ["all-manage-tickets", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/tickets/vendor?email=${user.email}`);
//       return res.data;
//     },
//   });

//   console.log(allManageTickets)

//   if (isLoading) {
//     return <LoadingSpinner />;
//   }

//   return <div>my added ticket {allManageTickets.length}</div>;
// };

// export default MyAddedTicket;

import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const MyAddedTicket = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: tickets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["vendor-tickets", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tickets/vendor?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="md:p-6 p-0">
      <h2 className="text-2xl font-semibold mb-6">
        My Added Tickets ({tickets.length})
      </h2>

      {/* 3-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => (
          <div
            key={ticket._id}
            className="border rounded-lg shadow-sm overflow-hidden bg-white"
          >
            {/* Image */}
            <img
              src={ticket.imageURL}
              alt={ticket.ticketTitle}
              className="h-48 w-full object-cover"
            />

            {/* Content */}
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold">{ticket.ticketTitle}</h3>

              <p className="text-sm text-gray-600">
                {ticket.transportType} | {ticket.fromLocation} →{" "}
                {ticket.toLocation}
              </p>

              <p className="text-sm">
                <span className="font-medium">Departure:</span>{" "}
                {new Date(ticket.departureDateTime).toLocaleString()}
              </p>

              <p className="text-sm">
                <span className="font-medium">Price:</span> ${ticket.price}
              </p>

              <p className="text-sm">
                <span className="font-medium">Quantity:</span> {ticket.quantity}
              </p>

              {/* Verification Status */}
              <p className="text-sm">
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={`capitalize font-semibold ${
                    ticket.status === "approved"
                      ? "text-green-600"
                      : ticket.status === "rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {ticket.status || "pending"}
                </span>
              </p>

              {/* Buttons */}
              <div className="flex gap-3 pt-3">
                <button
                  disabled={ticket.status === "rejected"}
                  className={`px-4 py-2 rounded text-white text-sm ${
                    ticket.status === "rejected"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  Update
                </button>

                <button
                  disabled={ticket.status === "rejected"}
                  className={`px-4 py-2 rounded text-white text-sm ${
                    ticket.status === "rejected"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAddedTicket;
