// import useAxiosSecure from "../../Hooks/useAxios";
// import { useQuery } from "@tanstack/react-query";
// import LoadingSpinner from "../../Components/LoadingSpinner";
// import { Link } from "react-router";

// const AllTickets = () => {
//   const axiosSecure = useAxiosSecure();

//   const { data: approvedTickets = [], isLoading } = useQuery({
//     queryKey: ["approved-tickets"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/tickets/approved");
//       return res.data;
//     },
//   });

//   if (isLoading) {
//     return <LoadingSpinner />;
//   }

//   return (
//     <div className="min-h-screen bg-base-200 py-6 px-4">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold text-base-content mb-6">
//           Available Tickets
//         </h1>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {approvedTickets.map((ticket) => (
//             <div
//               key={ticket._id}
//               className="bg-base-300 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
//             >
//               {/* Image */}
//               <div className="relative h-[250px] overflow-hidden">
//                 <img
//                   src={ticket.imageURL}
//                   alt={ticket.ticketTitle}
//                   className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//                 />
//                 <div className="absolute top-2 right-2 bg-primary px-2 py-0.5 rounded-full text-xs font-semibold shadow-md text-white">
//                   {ticket.transportType}
//                 </div>
//               </div>

//               {/* Content */}
//               <div className="p-3">
//                 {/* Title */}
//                 <h2 className="text-lg font-bold text-base-content mb-2 line-clamp-2">
//                   {ticket.ticketTitle}
//                 </h2>

//                 {/* Route */}
//                 <div className="flex items-center gap-2 mb-3 text-base-content/80">
//                   <span className="font-semibold text-sm">{ticket.fromLocation}</span>
//                   <svg
//                     className="w-4 h-4 text-gray-400"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M17 8l4 4m0 0l-4 4m4-4H3"
//                     />
//                   </svg>
//                   <span className="font-semibold text-sm">{ticket.toLocation}</span>
//                 </div>

//                 {/* Price & Quantity */}
//                 <div className="flex justify-between items-center mb-3 pb-2 border-b border-base-400">
//                   <div>
//                     <p className="text-xl font-bold text-[#e30b13]">${ticket.price}</p>
//                     <p className="text-xs text-gray-400">per ticket</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-base font-semibold text-base-content">
//                       {ticket.quantity}
//                     </p>
//                     <p className="text-xs text-gray-400">available</p>
//                   </div>
//                 </div>

//                 {/* Perks */}
//                 {ticket.perks && ticket.perks.length > 0 && (
//                   <div className="mb-2">
//                     <p className="text-xs font-semibold text-base-content mb-1">Perks:</p>
//                     <div className="flex flex-wrap gap-1">
//                       {ticket.perks.slice(0, 3).map((perk, index) => (
//                         <span
//                           key={index}
//                           className="text-xs bg-base-200 text-base-content px-2 py-0.5 rounded-full"
//                         >
//                           {perk}
//                         </span>
//                       ))}
//                       {ticket.perks.length > 3 && (
//                         <span className="text-xs text-gray-400 px-2 py-0.5">
//                           +{ticket.perks.length - 3} more
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {/* Departure Date & Time */}
//                 <div className="mb-3">
//                   <p className="text-xs text-gray-400 mb-0.5">Departure:</p>
//                   <p className="font-semibold text-sm text-base-content">
//                     {new Date(ticket.departureDateTime).toLocaleString("en-US", {
//                       dateStyle: "medium",
//                       timeStyle: "short",
//                     })}
//                   </p>
//                 </div>

//                 {/* See Details Button */}
//                 <Link to={`/all-tickets-details/${ticket._id}`}>
//                   <button className="w-full py-2 rounded-lg font-semibold text-sm text-white bg-[#e30b13] hover:bg-[#A3070C] transition-all duration-300 hover:shadow-lg">
//                     See Details
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>

//         {approvedTickets.length === 0 && (
//           <div className="text-center py-12">
//             <p className="text-gray-400 text-lg">
//               No tickets available at the moment.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllTickets;



import { useMemo, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { Link } from "react-router";

const ITEMS_PER_PAGE = 6;
const TRANSPORT_TYPES = ["All", "Bus", "Plane", "Train", "Ship"];

const AllTickets = () => {
  const axiosSecure = useAxiosSecure();

  // UI state
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [transport, setTransport] = useState("All");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: approvedTickets = [], isLoading } = useQuery({
    queryKey: ["approved-tickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets/approved");
      return res.data;
    },
  });

  // 🔍 Search + Filter + Sort
  const processedTickets = useMemo(() => {
    let data = [...approvedTickets];

    // Search by from & to
    if (from || to) {
      data = data.filter(
        (t) =>
          t.fromLocation.toLowerCase().includes(from.toLowerCase()) &&
          t.toLocation.toLowerCase().includes(to.toLowerCase())
      );
    }

    // Filter by transport
    if (transport !== "All") {
      data = data.filter((t) => t.transportType === transport);
    }

    // Sort by price
    if (sortOrder === "low") {
      data.sort((a, b) => a.price - b.price);
    }
    if (sortOrder === "high") {
      data.sort((a, b) => b.price - a.price);
    }

    return data;
  }, [approvedTickets, from, to, transport, sortOrder]);

  // 📄 Pagination
  const totalPages = Math.ceil(processedTickets.length / ITEMS_PER_PAGE);
  const paginatedTickets = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return processedTickets.slice(start, start + ITEMS_PER_PAGE);
  }, [processedTickets, currentPage]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-base-200 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Available Tickets</h1>

        {/* 🔎 Controls */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
          <input
            type="text"
            placeholder="Search (by From Location)"
            className="input input-bordered"
            value={from}
            onChange={(e) => {
              setFrom(e.target.value);
              setCurrentPage(1);
            }}
          />
          <input
            type="text"
            placeholder="Search (by To Location)"
            className="input input-bordered"
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
              setCurrentPage(1);
            }}
          />
          <select
            className="select select-bordered"
            value={transport}
            onChange={(e) => {
              setTransport(e.target.value);
              setCurrentPage(1);
            }}
          >
            {TRANSPORT_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>

          <select
            className="select select-bordered"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Sort by Price</option>
            <option value="low">Low → High</option>
            <option value="high">High → Low</option>
          </select>
        </div>

        {/* 🎟 Tickets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedTickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-base-300 rounded-lg shadow-md overflow-hidden"
            >
              <div className="h-[220px] overflow-hidden relative">
                <img
                  src={ticket.imageURL}
                  alt={ticket.ticketTitle}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                  {ticket.transportType}
                </span>
              </div>

              <div className="p-3">
                <h2 className="font-bold text-lg">{ticket.ticketTitle}</h2>

                <p className="text-sm mt-1">
                  {ticket.fromLocation} → {ticket.toLocation}
                </p>

                <p className="text-xl font-bold text-[#e30b13] mt-2">
                  ${ticket.price}
                </p>

                <Link to={`/all-tickets-details/${ticket._id}`}>
                  <button className="w-full mt-3 btn btn-primary">
                    See Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination  */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            {[...Array(totalPages).keys()].map((i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`btn btn-sm ${
                  currentPage === i + 1 ? "btn-primary" : "btn-outline"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        {processedTickets.length === 0 && (
          <p className="text-center text-gray-400 mt-10">
            No tickets found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllTickets;

