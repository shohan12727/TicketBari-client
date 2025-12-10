import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const MyBookedTickets = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: bookedTickets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["booked-tickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/booking-tickets");
      return res.data;
    },
  });

  console.log(bookedTickets);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-4">
      <h2 className="text-3xl font-semibold mb-4">My Booked Tickets</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookedTickets.map((ticket) => (
          <TicketCard key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default MyBookedTickets;

// --------------------------------------------------
// SEPARATE COMPONENT → Fixes hook order error
// --------------------------------------------------
const TicketCard = ({ ticket }) => {
  const {
    ticketTitle,
    imageURL,
    bookingQuantity,
    price,
    fromLocation,
    toLocation,
    departureDateTime,
    status,
  } = ticket;

  // Parse the ISO datetime string
  const departure = new Date(departureDateTime);
  const now = new Date();
  const isExpired = departure < now;

  const [countdown, setCountdown] = useState("");

  // PURE JS COUNTDOWN TIMER
  useEffect(() => {
    if (status === "rejected" || isExpired) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = departure - now;

      if (diff <= 0) {
        setCountdown("Expired");
        clearInterval(interval);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [departure, status, isExpired]);

  // Format the departure date and time for display
  const formattedDate = departure.toLocaleDateString();
  const formattedTime = departure.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const totalPrice = Number(price) * Number(bookingQuantity);

  return (
    <div className="rounded-lg shadow p-4 border bg-white">
      <img
        src={imageURL}
        alt={ticketTitle}
        className="w-full h-40 object-cover rounded-lg"
      />

      <h3 className="text-xl font-semibold mt-3">{ticketTitle}</h3>

      <p className="text-gray-600 mt-1">
        <strong>From:</strong> {fromLocation} → <strong>To:</strong>{" "}
        {toLocation}
      </p>

      <p className="text-gray-600">
        <strong>Quantity:</strong> {bookingQuantity}
      </p>

      <p className="font-semibold">
        Total Price:
        <span className="text-green-600"> ${totalPrice.toFixed(2)}</span>
      </p>

      <p className="text-gray-500">
        Departure: {formattedDate} | {formattedTime}
      </p>

      {/* STATUS BADGE */}
      <span
        className={`inline-block px-3 py-1 rounded-full text-white text-sm mt-2 ${
          status === "pending"
            ? "bg-yellow-500"
            : status === "accepted"
            ? "bg-[#e30b13]" // primary
            : status === "paid"
            ? "bg-green-600"
            : "bg-red-600"
        }`}
      >
        {status.toUpperCase()}
      </span>

      {/* COUNTDOWN */}
      {status !== "rejected" && !isExpired && (
        <p className="mt-2 font-bold ">
          Countdown: <span className="text-[#e30b13]">{countdown}</span>
        </p>
      )}

      {/* EXPIRED MSG */}
      {isExpired && (
        <p className="mt-2 text-red-600 font-semibold">Departure Passed</p>
      )}

      {/* PAY NOW BUTTON */}
      {status === "accepted" && !isExpired && (
        <button
          class="w-full mt-3 text-white py-2 rounded-lg transition 
         bg-primary hover:bg-secondary"
        >
          Pay Now
        </button>
      )}
    </div>
  );
};
