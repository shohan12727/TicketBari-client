import { NavLink } from "react-router";
import { FaUser, FaTicketAlt, FaHistory } from "react-icons/fa";

const UserMenu = () => {
  return (
    <div className="flex flex-col space-y-2">
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

      {/* My Booked Tickets */}
      <NavLink
        to="/dashboard/my-tickets"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 transition-colors duration-300 transform rounded-lg ${
            isActive
              ? "bg-secondary text-white"
              : "text-white  hover:bg-secondary"
          }`
        }
      >
        <FaTicketAlt className="w-5 h-5" />
        <span className="mx-4 font-medium">My Booked Tickets</span>
      </NavLink>

      {/* Transaction History */}
      <NavLink
        to="/dashboard/transaction-history"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 transition-colors duration-300 transform rounded-lg ${
            isActive
              ? "bg-secondary text-white"
              : "text-white  hover:bg-secondary"
          }`
        }
      >
        <FaHistory className="w-5 h-5" />
        <span className="mx-4 font-medium">Transaction History</span>
      </NavLink>
    </div>
  );
};

export default UserMenu;
