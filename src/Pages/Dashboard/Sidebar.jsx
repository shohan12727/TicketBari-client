import { useState } from "react";
import { Link } from "react-router";
// Icons
import { GrLogout } from "react-icons/gr";
import { AiOutlineBars } from "react-icons/ai";
import UserMenu from "./UserMenu";
import VendorMenu from "./VendorMenu";
import AdminMenu from "./AdminMenu";
import useAuth from "../../Hooks/useAuth";
import { Ticket } from "lucide-react";

// User Menu

const Sidebar = () => {
  const { logOut } = useAuth();
  const [isActive, setActive] = useState(false);

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <>
      {/* Small Screen Navbar, only visible till md breakpoint */}
      <div className="bg-primary text-white flex items-center justify-between px-4 py-3 md:hidden">
        <div>
          <div className="cursor-pointer font-bold">
            <Link to="/">
              {/* logo  */}
              <div className="flex items-center space-x-2">
                <Ticket className="w-7 h-7 text-white" />
                <span className="text-white text-xl font-bold whitespace-nowrap">
                  Ticket<span className="text-[#FFD700]">Bari</span>
                </span>
              </div>
            </Link>
          </div>
        </div>
        <button
          onClick={handleToggle}
          className="p-2 focus:outline-none focus:bg-[#c10a11] rounded-md"
        >
          <AiOutlineBars className="h-6 w-6 text-white" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-primary text-white w-64 space-y-6 px-2 py-4 fixed inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          {/* Top Content */}
          <div>
            {/* Logo */}
            <div className="w-full hidden md:flex px-4  justify-start items-center">
              <Link to="/">
                <div className="flex items-center">
                  <Ticket className="w-8 h-8 space-x-2 text-white" />
                  <span className="text-white text-2xl font-bold">
                    Ticket<span className="text-[#FFD700]">Bari</span>{" "}
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* Middle Content */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            {/*  Menu Items */}
            <nav>
              {/* Role-Based Menu */}
              <UserMenu />
              <VendorMenu />
              <AdminMenu />
            </nav>
          </div>

          {/* Bottom Content */}
          <div>
            <button
              onClick={logOut}
              className="flex cursor-pointer w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
            >
              <GrLogout className="w-5 h-5" />

              <span className="mx-4 font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
