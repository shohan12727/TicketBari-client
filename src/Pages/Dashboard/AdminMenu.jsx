import { NavLink } from "react-router";
import { FaUser, FaTicketAlt, FaUsers, FaBullhorn } from "react-icons/fa";

const AdminMenu = () => {
  return (
    <div className="flex flex-col space-y-2">
      {/* Admin Profile */}
      <NavLink
        to="/dashboard/admin-profile"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 transition-colors duration-300 transform rounded-lg ${
            isActive
              ? "bg-secondary text-white"
              : "text-white hover:bg-secondary"
          }`
        }
      >
        <FaUser className="w-5 h-5" />
        <span className="mx-4 font-medium">Admin Profile</span>
      </NavLink>

      {/* Manage Tickets */}
      <NavLink
        to="/dashboard/manage-tickets"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 transition-colors duration-300 transform rounded-lg ${
            isActive
              ? "bg-secondary text-white"
              : "text-white hover:bg-secondary"
          }`
        }
      >
        <FaTicketAlt className="w-5 h-5" />
        <span className="mx-4 font-medium">Manage Tickets</span>
      </NavLink>

      {/* Manage Users */}
      <NavLink
        to="/dashboard/manage-users"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 transition-colors duration-300 transform rounded-lg ${
            isActive
              ? "bg-secondary text-white"
              : "text-white hover:bg-secondary"
          }`
        }
      >
        <FaUsers className="w-5 h-5" />
        <span className="mx-4 font-medium">Manage Users</span>
      </NavLink>

      {/* Advertise Tickets */}
      <NavLink
        to="/dashboard/advertise-tickets"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 transition-colors duration-300 transform rounded-lg ${
            isActive
              ? "bg-secondary text-white"
              : "text-white hover:bg-secondary"
          }`
        }
      >
        <FaBullhorn className="w-5 h-5" />
        <span className="mx-4 font-medium">Advertise Tickets</span>
      </NavLink>
    </div>
  );
};

export default AdminMenu;