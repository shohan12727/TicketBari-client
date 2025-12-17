import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxios";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import useAuth from "../../../Hooks/useAuth";

const TransactionHistory = () => {
  const axiosSecure = useAxiosSecure();
      const { user } = useAuth(); 

  

  const {
    data: allTransactions = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["stripe-transactions",  user?.email],
      enabled: !!user?.email, 
    queryFn: async () => {
      const res = await axiosSecure.get(`/dashboard/payment/success?email=${user.email}`);
      return res.data;
    },
    staleTime: 1000 * 60, 
  });
  /**
   * Deduplicate transactions by Stripe transactionId (pi_*)
   * This is a UI-level safety net, not a backend replacement.
   */
  const uniqueTransactions = useMemo(() => {
    const map = new Map();
    allTransactions.forEach((tx) => {
      if (!map.has(tx.transactionId)) {
        map.set(tx.transactionId, tx);
      }
    });
    return Array.from(map.values());
  }, [allTransactions]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[400px] px-4">
        <div className="alert alert-error max-w-md w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-5 w-5 md:h-6 md:w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h3 className="font-bold text-sm md:text-base">
              Failed to load transactions
            </h3>
            <div className="text-xs md:text-sm opacity-80">
              {error?.message}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto md:px-4 py-4 md:p-6 lg:p-8 max-w-7xl">
      {/* Header */}
      <div className="mb-4 md:mb-6 lg:mb-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-base-content mb-1 md:mb-2">
          Transaction History
        </h2>
        <p className="text-sm md:text-base text-base-content/60">
          View all your payment transactions
        </p>
      </div>

      {uniqueTransactions.length === 0 ? (
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body items-center text-center py-12 md:py-16 px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 md:h-24 md:w-24 text-base-content/20 mb-3 md:mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="text-lg md:text-xl font-semibold text-base-content mb-1 md:mb-2">
              No transactions found
            </h3>
            <p className="text-sm md:text-base text-base-content/60 max-w-md">
              Your transaction history will appear here once you make a purchase
            </p>
          </div>
        </div>
      ) : (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-0">
            {/* Table View - All Screens */}
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr className="border-b border-base-300">
                    <th className="bg-base-200 text-base-content font-semibold text-xs md:text-sm px-2 md:px-4">
                      Transaction ID
                    </th>
                    <th className="bg-base-200 text-base-content font-semibold text-xs md:text-sm px-2 md:px-4">
                      Amount
                    </th>
                    <th className="bg-base-200 text-base-content font-semibold text-xs md:text-sm px-2 md:px-4">
                      Ticket Title
                    </th>
                    <th className="bg-base-200 text-base-content font-semibold text-xs md:text-sm px-2 md:px-4">
                      Payment Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {uniqueTransactions.map((tx) => (
                    <tr key={tx.transactionId} className="hover">
                      <td className="font-mono text-xs md:text-sm px-2 md:px-4 break-all max-w-[120px] md:max-w-none">
                        {tx.transactionId}
                      </td>
                      <td className="px-2 md:px-4">
                        <span className="badge badge-primary badge-sm md:badge-lg font-semibold text-xs md:text-sm whitespace-nowrap">
                          {tx.amount} {tx.currency?.toUpperCase()}
                        </span>
                      </td>
                      <td className="font-medium text-xs md:text-sm px-2 md:px-4 break-words max-w-[150px] md:max-w-none">
                        {tx.productTitle}
                      </td>
                      <td className="text-base-content/70 text-xs md:text-sm px-2 md:px-4 whitespace-nowrap">
                        {new Date(tx.createdAt).toLocaleString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
