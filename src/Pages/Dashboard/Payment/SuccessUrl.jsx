import { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { MdVerified } from "react-icons/md";
import useAxiosSecure from "../../../Hooks/useAxios";

const SuccessUrl = () => {
  const axiosSecure = useAxiosSecure();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  useEffect(() => {
    if (sessionId) {
      axiosSecure.post(
        `${import.meta.env.VITE_API_URL}/dashboard/payment/success`,
        { sessionId }
      );
    }
  }, [sessionId, axiosSecure]);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md w-full">
        {/* Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <MdVerified className="w-12 h-12 text-green-600" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">
          Your Payment is Confirmed
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-8 leading-relaxed">
          We’ve successfully received your payment. Your ticket details are now
          available in your dashboard.
        </p>

        {/* Button */}
        <Link
          to="/dashboard/transaction-history"
          className="inline-block bg-primary hover:bg-secondary text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow"
        >
          View Transaction History
        </Link>
      </div>
    </div>
  );
};

export default SuccessUrl;
