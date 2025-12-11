import React from "react";
import useAxiosSecure from "../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import Swal from "sweetalert2";

const RequestBooking = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: requestBookedTickets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["request-booked-tickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/booking-tickets");
      return res.data;
    },
  });

  // Accept Booking Handler

  const handleAccept = async (id) => {
    try {
      await axiosSecure.patch(`/booking-tickets/accept/${id}`);
      refetch(); // refresh table
      Swal.fire({
        title: "Ticket Accepted",
        icon: "success",
        draggable: true,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || "Something went wrong!",
      });
    }
  };

  // Reject Booking Handler

  const handleReject = async (id) => {
    try {
      await axiosSecure.patch(`/booking-tickets/reject/${id}`);
      refetch();
      Swal.fire({
        title: "Ticket Rejected",
        icon: "success",
        draggable: true,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || "Something went wrong!",
      });
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="md:p-6">
      <h2 className="text-2xl font-semibold mb-4">Requested Bookings</h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">User Name</th>
              <th className="border p-2">User Email</th>
              <th className="border p-2">Ticket Title</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Total Price</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {requestBookedTickets.map((item) => (
              <tr key={item._id}>
                <td className="border p-2">{user?.displayName}</td>
                <td className="border p-2">{user?.email}</td>

                <td className="border p-2">{item.ticketTitle}</td>
                <td className="border p-2">{item.bookingQuantity}</td>
                <td className="border p-2">
                  ${item.price * item.bookingQuantity}
                </td>
                <td className="border p-2">{item.status}</td>

                <td className="border p-2 flex flex-col sm:flex-row gap-2">
                  {item.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleAccept(item._id)}
                        className="px-3 py-1 bg-green-600 text-white rounded"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() => handleReject(item._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {item.status !== "pending" && (
                    <span className="text-gray-500 italic">
                      Already {item.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestBooking;
