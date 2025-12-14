import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxios";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { Link } from "react-router";

const Advertisement = () => {
  const axiosSecure = useAxiosSecure();

  const { data: advertiseTicketsAtHome = [], isLoading } = useQuery({
    queryKey: ["advertise-tickets-at-home"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets/approved");
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const advertisedTickets = advertiseTicketsAtHome.filter(
    (ticket) => ticket.isAdvertise === true
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Featured Tickets
        </h2>
        <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
          Discover our handpicked selection of premium travel experiences
          (advertise tickets)
        </p>
      </div>

      {advertisedTickets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-24 h-24 mb-6 rounded-full bg-base-200 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-base-content/40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <p className="text-base-content/60 text-lg font-medium">
            No advertised tickets available at the moment
          </p>
          <p className="text-base-content/40 text-sm mt-2">
            Check back soon for exciting travel opportunities
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advertisedTickets.map((ticket) => (
            <div
              key={ticket._id}
              className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 border border-base-300 hover:border-primary/30 group overflow-hidden"
            >
              {/* Image with overlay effect */}
              <figure className="relative overflow-hidden h-48">
                <img
                  src={ticket.imageURL}
                  alt={ticket.ticketTitle}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-3 right-3 badge badge-primary badge-sm font-semibold shadow-lg">
                  Featured
                </div>
              </figure>

              <div className="card-body p-5">
                <h3 className="card-title text-lg font-bold mb-3 line-clamp-1 group-hover:text-primary transition-colors">
                  {ticket.ticketTitle}
                </h3>

                <div className="flex items-center justify-between text-sm mb-3">
                  <div className="flex items-center gap-1.5">
                    <svg
                      className="w-4 h-4 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                      />
                    </svg>
                    <span className="font-medium">{ticket.transportType}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-success">
                      ${ticket.price}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-base-content/70 mb-3">
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                    <span>{ticket.quantity} available</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{ticket.perks.length} perks</span>
                  </div>
                </div>
                <Link to={`/all-tickets-details/${ticket._id}`}>
                  <button className="btn btn-primary btn-sm w-full">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Advertisement;
