import React from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxios";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const AdvertiseTicket = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: advertiseTickets = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["advertise-tickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets/approved");
      return res.data;
    },
  });

  // Count how many tickets are currently advertised
  const advertisedCount = advertiseTickets.filter(
    (ticket) => ticket.isAdvertise
  ).length;

  // Toggle advertise / unadvertise
  const handleToggleAdvertise = async (ticket) => {
    // Prevent advertising more than 6 tickets
    if (!ticket.isAdvertise && advertisedCount >= 6) {
      toast.error("You cannot advertise more than 6 tickets");
      return;
    }

    try {
      const res = await axiosSecure.patch(
        `/tickets/advertise/${ticket._id}`,
        { isAdvertise: !ticket.isAdvertise }
      );

      if (res.data.modifiedCount > 0) {
        toast.success(
          ticket.isAdvertise
            ? "Ticket unadvertised successfully"
            : "Ticket advertised successfully"
        );
        refetch();
      }
    } catch {
      toast.error("Failed to update advertise status");
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">
        Approved Tickets ({advertiseTickets.length})
      </h2>

      <p className="mb-4 text-sm text-gray-500">
        Currently Advertised: {advertisedCount} / 6
      </p>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>SL</th>
              <th>Title</th>
              <th>Route</th>
              <th>Transport</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Advertise</th>
            </tr>
          </thead>

          <tbody>
            {advertiseTickets.map((ticket, index) => (
              <tr key={ticket._id}>
                <td>{index + 1}</td>
                <td>{ticket.ticketTitle}</td>
                <td>
                  {ticket.fromLocation} → {ticket.toLocation}
                </td>
                <td>{ticket.transportType}</td>
                <td>${ticket.price}</td>
                <td>{ticket.quantity}</td>
                <td>
                  <button
                    onClick={() => handleToggleAdvertise(ticket)}
                    className={`btn btn-sm ${
                      ticket.isAdvertise ? "btn-error" : "btn-success"
                    }`}
                  >
                    {ticket.isAdvertise ? "Unadvertise" : "Advertise"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdvertiseTicket;
