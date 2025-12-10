// Updated component with Tailwind fully applied and Vendor Name & Vendor Email removed
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxios";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { X, Calendar, MapPin, Package, DollarSign, Clock } from "lucide-react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const AllTicketsDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isPastDeparture, setIsPastDeparture] = useState(false);

  const { data: approvedTicketsDetails = [], isLoading } = useQuery({
    queryKey: ["approved-tickets", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tickets/approved/${id}`);
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({ defaultValues: { bookingQuantity: 1 } });

  const {
    transportType,
    toLocation,
    fromLocation,
    ticketTitle,
    quantity,
    price,
    perks,
    departureDateTime,
    imageURL,
  } = approvedTicketsDetails;

  const bookingQuantity = watch("bookingQuantity");

  useEffect(() => {
    if (!departureDateTime) return;

    const updateCountdown = () => {
      const now = new Date().getTime();
      const departure = new Date(departureDateTime).getTime();
      const difference = departure - now;

      if (difference <= 0) {
        setIsPastDeparture(true);
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setIsPastDeparture(false);
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [departureDateTime]);

  const onSubmit = async (data) => {
    const bookingQuantity = data.bookingQuantity;
    try {
      const bookingData = {
        ticketTitle,
        imageURL,
        price,
        bookingQuantity,
        toLocation,
        fromLocation,
        departureDateTime,
      };
      const response = await axiosSecure.post("/booking-tickets", bookingData);

      //  console.log(response.data);

      if (response?.data?.acknowledged) {
        Swal.fire({
          title: "Ticket Booked Successfully",
          icon: "success",
          draggable: true,
        });
        reset();
        setIsModalOpen(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    } catch (err) {
      toast.error(err?.message || "Something went wrong");
    }
  };

  const isBookingDisabled = isPastDeparture || quantity === 0;

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative h-64 sm:h-80 md:h-96 w-full">
            <img
              src={imageURL || "https://via.placeholder.com/800x400"}
              alt={ticketTitle}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-5 py-2 rounded-2xl shadow-lg border border-red-100">
              <span className="text-3xl font-extrabold text-primary">
                ${price}
              </span>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {ticketTitle}
                </h1>
                <span className="bg-red-100 text-primary px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                  {transportType}
                </span>
              </div>

              <div className="flex items-center gap-2 text-lg text-gray-700">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="font-semibold">{fromLocation}</span>
                <span className="text-gray-400">→</span>
                <span className="font-semibold">{toLocation}</span>
              </div>
            </div>

            {!isPastDeparture ? (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl shadow-sm">
                <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  Time Until Departure
                </h3>
                <div className="grid grid-cols-4 gap-4 text-center">
                  {["days", "hours", "minutes", "seconds"].map((unit) => (
                    <div key={unit}>
                      <div className="text-3xl font-extrabold text-primary">
                        {timeRemaining[unit]}
                      </div>
                      <div className="text-xs text-gray-600 capitalize">
                        {unit}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-xl shadow-md">
                <p className="text-red-700 font-semibold">
                  This ticket has already departed
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">
                      Departure Date & Time
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {new Date(departureDateTime).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-gray-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Available Tickets</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {quantity}{" "}
                      {quantity === 0 && (
                        <span className="text-red-600 text-sm">(Sold Out)</span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-gray-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Price per Ticket</p>
                    <p className="text-lg font-semibold text-gray-900">
                      ${price}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {Array.isArray(perks) && perks.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Perks & Benefits
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {perks.map((perk, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 bg-red-50 border border-red-100 p-3 rounded-xl shadow-sm"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-gray-800">{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => setIsModalOpen(true)}
              disabled={isBookingDisabled}
              className={`w-full py-4 rounded-xl font-semibold text-lg shadow-md transition-all ${
                isBookingDisabled
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-primary text-white hover:bg-primary"
              }`}
            >
              {isPastDeparture
                ? "Ticket Expired"
                : quantity === 0
                ? "Sold Out"
                : "Book Now"}
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-xl">
            <button
              onClick={() => {
                setIsModalOpen(false);
                reset();
              }}
              className="absolute top-4 right-4  text-primary transition"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Book Your Ticket
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ticket Quantity
                </label>
                <input
                  type="number"
                  {...register("bookingQuantity", {
                    required: "Quantity is required",
                    min: { value: 1, message: "Minimum quantity is 1" },
                    max: {
                      value: quantity,
                      message: `Maximum quantity is ${quantity}`,
                    },
                    valueAsNumber: true,
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-text-primary focus:border-transparent"
                />
                {errors.bookingQuantity && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.bookingQuantity.message}
                  </p>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  Available: {quantity} tickets
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex justify-between mb-2 text-gray-600">
                  <span>Price per ticket:</span>
                  <span className="font-semibold">${price}</span>
                </div>
                <div className="flex justify-between mb-2 text-gray-600">
                  <span>Quantity:</span>
                  <span className="font-semibold">{bookingQuantity || 0}</span>
                </div>
                <div className="border-t pt-2 flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">
                    Total:
                  </span>
                  <span className="text-lg font-bold text-primary">
                    ${((bookingQuantity || 0) * price).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-xl font-semibold shadow-md hover:bg-primary transition"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTicketsDetails;
