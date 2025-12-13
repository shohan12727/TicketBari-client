import { NavLink } from "react-router";
import {
  FaPlus,
  FaTicketAlt,
  FaClipboardList,
  FaChartLine,
  FaUser,
} from "react-icons/fa";

const VendorMenu = () => {
  return (
    <div className="flex flex-col space-y-2 mt-2">
      {/* User Profile */}
      <NavLink
        to="/dashboard/user-profile"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 transition-colors duration-300 transform rounded-lg ${
            isActive
              ? "bg-secondary text-white"
              : "text-white hover:bg-secondary"
          }`
        }
      >
        <FaUser className="w-5 h-5" />
        <span className="mx-4 font-medium">Profile</span>
      </NavLink>

      {/* Add Ticket */}
      <NavLink
        to="/dashboard/add-ticket"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 transition-colors duration-300 transform rounded-lg ${
            isActive
              ? "bg-secondary text-white"
              : "text-white hover:bg-secondary"
          }`
        }
      >
        <FaPlus className="w-5 h-5" />
        <span className="mx-4 font-medium">Add Ticket</span>
      </NavLink>

      {/* My Added Tickets */}
      <NavLink
        to="/dashboard/my-added-tickets"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 transition-colors duration-300 transform rounded-lg ${
            isActive
              ? "bg-secondary text-white"
              : "text-white hover:bg-secondary"
          }`
        }
      >
        <FaTicketAlt className="w-5 h-5" />
        <span className="mx-4 font-medium">My Added Tickets</span>
      </NavLink>

      {/* Requested Bookings */}
      <NavLink
        to="/dashboard/requested-bookings"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 transition-colors duration-300 transform rounded-lg ${
            isActive
              ? "bg-secondary text-white"
              : "text-white hover:bg-secondary"
          }`
        }
      >
        <FaClipboardList className="w-5 h-5" />
        <span className="mx-4 font-medium">Requested Bookings</span>
      </NavLink>

      {/* Revenue Overview */}
      <NavLink
        to="/dashboard/revenue-overview"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 transition-colors duration-300 transform rounded-lg ${
            isActive
              ? "bg-secondary text-white"
              : "text-white hover:bg-secondary"
          }`
        }
      >
        <FaChartLine className="w-5 h-5" />
        <span className="mx-4 font-medium">Revenue Overview</span>
      </NavLink>
    </div>
  );
};

export default VendorMenu;
