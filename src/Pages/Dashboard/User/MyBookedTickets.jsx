import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import useAuth from "../../../Hooks/useAuth";

const MyBookedTickets = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: bookedTickets = [],
    isLoading,
    refetch, // paid status === 'paid' refetch hobe
  } = useQuery({
    queryKey: ["booked-tickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/booking-tickets");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="md:p-4">
      <h2 className="text-3xl font-semibold mb-4">My Booked Tickets</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookedTickets.map((ticket) => (
          <TicketCard key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

// -----------------------------------------

const TicketCard = ({ ticket }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

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

const handlePayment = async (id) => {
  try {
    const paymentInfo = {
      id,
      paymentTitle: ticketTitle,
      paymentPrice: Number(price),
      paymentQuantity: Number(bookingQuantity),
      userName: user?.displayName,
      userEmail: user?.email,
    };

    const response = await axiosSecure.post(
      "/create-checkout-session",
      paymentInfo
    );

    // Stripe API returns { url: "https://checkout.stripe.com/..." }
    const checkoutUrl = response?.data?.url;

    if (checkoutUrl) {
      // Redirect user to Stripe Checkout
      window.location.href = checkoutUrl;
    } else {
      alert("Unable to start payment. Please try again.");
    }

  } catch (error) {
    console.error("Payment error:", error);
    alert("Payment initialization failed.");
  }
};


  // Parse the ISO datetime string
  const departure = new Date(departureDateTime);
  const now = new Date();
  const isExpired = departure < now;

  const [countdown, setCountdown] = useState("");

  // PURE JS COUNTDOWN TIMER
  useEffect(() => {
    if (status === "Reject" || isExpired) return;

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
            ? "bg-green-600"
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
         bg-green-600 hover:bg-green-800"
          onClick={() => handlePayment(ticket._id)}
        >
          Pay Now
        </button>
      )}
    </div>
  );
};

export default MyBookedTickets;
