import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import Swal from "sweetalert2";

const MyAddedTicket = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedTicket, setSelectedTicket] = useState(null);

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

  const handleUpdate = async (ticket) => {
    setSelectedTicket(ticket);
    document.getElementById("update_modal").showModal();
  };

  const { register, handleSubmit, reset } = useForm();

  const onSubmitUpdate = async (data) => {
    try {
      const res = await axiosSecure.patch(`/tickets/${selectedTicket._id}`, {
        fromLocation: data.fromLocation,
        toLocation: data.toLocation,
        transportType: data.transportType,
        ticketTitle: data.ticketTitle,
        quantity: Number(data.quantity),
        price: Number(data.price),
        imageURL: data.imageURL,
        departureDateTime: data.departureDateTime,
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Ticket updated successfully", "success");
        refetch();
        reset();
        document.getElementById("update_modal").close();
      }
    } catch {
      Swal.fire("Error", "Update failed", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/tickets/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Your ticket has been deleted.",
            icon: "success",
          });
          refetch();
        }
      }
    } catch {
      Swal.fire({
        title: "Error!",
        text: "Failed to delete ticket. Please try again.",
        icon: "error",
      });
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-semibold mb-6 text-base-content">
        My Added Tickets ({tickets.length})
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => (
          <div
            key={ticket._id}
            className="rounded-lg border border-base-300 bg-base-100 shadow"
          >
            {/* Image */}
            <img
              src={ticket.imageURL}
              alt={ticket.ticketTitle}
              className="h-48 w-full object-cover rounded-t-lg"
            />

            {/* Content */}
            <div className="p-4 space-y-2 text-base-content">
              <h3 className="text-lg font-semibold">{ticket.ticketTitle}</h3>

              <p className="text-sm text-base-content/70">
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

              {/* Status */}
              <p className="text-sm">
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={`capitalize font-semibold ${
                    ticket.status === "approved"
                      ? "text-success"
                      : ticket.status === "rejected"
                      ? "text-error"
                      : "text-warning"
                  }`}
                >
                  {ticket.status || "pending"}
                </span>
              </p>

              {/* Buttons */}
              <div className="flex gap-3 pt-3">
                <button
                  onClick={() => handleUpdate(ticket)}
                  disabled={ticket.status === "rejected"}
                  className="btn btn-sm btn-primary disabled:btn-disabled"
                >
                  Update
                </button>

                <button
                  onClick={() => handleDelete(ticket._id)}
                  disabled={ticket.status === "rejected"}
                  className="btn btn-sm btn-error disabled:btn-disabled"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* modal  */}
      <dialog id="update_modal" className="modal">
        <div className="modal-box max-w-2xl">
          <h3 className="font-bold text-lg mb-4">Update Ticket</h3>

          {selectedTicket && (
            <form onSubmit={handleSubmit(onSubmitUpdate)} className="space-y-3">
              <input
                defaultValue={selectedTicket.ticketTitle}
                {...register("ticketTitle")}
                className="input input-bordered w-full"
                placeholder="Ticket Title"
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  defaultValue={selectedTicket.fromLocation}
                  {...register("fromLocation")}
                  className="input input-bordered"
                  placeholder="From"
                />

                <input
                  defaultValue={selectedTicket.toLocation}
                  {...register("toLocation")}
                  className="input input-bordered"
                  placeholder="To"
                />
              </div>

              <select
                defaultValue={selectedTicket.transportType}
                {...register("transportType")}
                className="select select-bordered w-full"
              >
                <option>Bus</option>
                <option>Train</option>
                <option>Plane</option>
                <option>Ship</option>
              </select>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  defaultValue={selectedTicket.price}
                  {...register("price")}
                  className="input input-bordered"
                  placeholder="Price"
                />

                <input
                  type="number"
                  defaultValue={selectedTicket.quantity}
                  {...register("quantity")}
                  className="input input-bordered"
                  placeholder="Quantity"
                />
              </div>

              <input
                type="datetime-local"
                defaultValue={selectedTicket.departureDateTime}
                {...register("departureDateTime")}
                className="input input-bordered w-full"
              />

              <input
                defaultValue={selectedTicket.imageURL}
                {...register("imageURL")}
                className="input input-bordered w-full"
                placeholder="Image URL"
              />

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("update_modal").close()
                  }
                  className="btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default MyAddedTicket;
