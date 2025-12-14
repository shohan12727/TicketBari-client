import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

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

 const handleAdvertise = async (id) => {
  try {
    const ticketToAdvertise = advertiseTickets.find(ticket => ticket._id === id);
    if (!ticketToAdvertise) {
      toast.error("Ticket not found");
      return;
    }
    const response = await axiosSecure.post("/advertiseTickets", ticketToAdvertise);
    if (response.data.insertedId) {
      Swal.fire({
        title: "Added to Advertise List",
        icon: "success",
        draggable: true,
      });
      refetch();
    } else {
      toast.error("Failed to advertise ticket.");
    }
  } catch (err) {
    toast.error("Something went wrong. Please try again.", err);
  }
};


  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">
        Approved Tickets ({advertiseTickets.length})
      </h2>

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
                  <button onClick={() => handleAdvertise(ticket._id)}>
                    Advertise
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
