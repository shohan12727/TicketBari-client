import React from "react";
import useAxiosSecure from "../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const ManageTicket = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: allTickets = [],
    refetch,
    isLoading,
  } = useQuery({
    // refetch and loading use korbo
    queryKey: ["all-tickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets");
      return res.data;
    },
  });

  const handleApproved = async (id, status) => {
    try {
      const res = await axiosSecure.patch(`/tickets/status/${id}`, { status });

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: `${status} successfully`,
          icon: "success",
          draggable: true,
        });
        refetch();
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response?.data?.message || "Something went wrong!",
      });
    }
  };

  const handleReject = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Reject it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axiosSecure.delete(`/tickets/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Rejected!",
              text: "Ticket rejected successfully.",
              icon: "success",
            });
            refetch();
          }
        }
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response?.data?.message || "Something went wrong!",
      });
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  //   /text
  return (
    <div className="md:p-6 p-0">
      <h2 className="text-2xl font-semibold mb-6">
        Manage Tickets ({allTickets.length})
      </h2>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="table w-full">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th>Sl</th>
              <th>Ticket Title</th>
              <th>Vendor</th>
              <th>Destination</th>
              <th>Departure</th>
              <th>Price</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {allTickets.map((ticket, idx) => (
              <tr key={ticket._id} className="border-b">
                <td>{idx + 1}</td>

                <td className="font-medium">{ticket.ticketTitle}</td>

                <td>
                  <p className="font-medium">{ticket.vendorName}</p>
                  <p className="text-xs text-gray-500">{ticket.vendorEmail}</p>
                </td>

                <td>{ticket.toLocation}</td>

                <td>
                  <span className="text-sm text-gray-600">
                    {new Date(ticket.departureDateTime).toLocaleString()}
                  </span>
                </td>

                <td>${ticket.price}</td>

                <td className="text-center">
                  <span
                    className={`px-2 py-1 text-xs rounded-full capitalize inline-block ${
                      ticket.status === "approved"
                        ? "bg-green-100 text-green-600"
                        : ticket.status === "rejected"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {ticket.status}
                  </span>
                </td>

                <td className="text-center">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => handleApproved(ticket._id, "approved")}
                      disabled={ticket.status === "approved"}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => handleReject(ticket._id)}
                      disabled={ticket.status === "rejected"}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-400"
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTicket;
