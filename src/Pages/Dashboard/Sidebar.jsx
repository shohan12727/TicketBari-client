import { useState } from "react";
import { Link } from "react-router";
import { GrLogout } from "react-icons/gr";
import { AiOutlineBars, AiOutlineClose } from "react-icons/ai";
import UserMenu from "./UserMenu";
import VendorMenu from "./VendorMenu";
import AdminMenu from "./AdminMenu";
import useAuth from "../../Hooks/useAuth";
import { Ticket } from "lucide-react";
import toast from "react-hot-toast";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [isActive, setActive] = useState(true);

  const handleToggle = () => {
    setActive((prev) => !prev);
  };
  const handleLogout = () => {
    logOut()
      .then(() => toast.success("Logged out successfully"))
      .catch(() => toast.error("Logout failed. Please try again."));
  };

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-primary text-neutral flex items-center justify-between px-4 py-3 md:hidden">
        {/* Logo */}
        <div className="cursor-pointer font-bold">
          <Link to="/">
            <div className="flex items-center space-x-2">
              <Ticket className="w-7 h-7 text-neutral" />
              <span className="text-neutral text-xl font-bold whitespace-nowrap">
                Ticket<span className="text-secondary">Bari</span>
              </span>
            </div>
          </Link>
        </div>

        {/* Hamburger */}
        <button
          onClick={handleToggle}
          className="p-2 focus:outline-none focus:bg-primary/80 rounded-md"
        >
          {isActive ? (
            <AiOutlineBars className="h-6 w-6 text-neutral" />
          ) : (
            <AiOutlineClose className="h-6 w-6 text-neutral" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-primary text-neutral w-64 space-y-6 px-2 py-4 fixed inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        } md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          {/* Top Logo */}
          <div className="w-full hidden md:flex px-4 justify-start items-center">
            <Link to="/">
              <div className="flex items-center">
                <Ticket className="w-8 h-8 text-neutral" />
                <span className="text-neutral text-2xl font-bold">
                  Ticket<span className="text-secondary">Bari</span>
                </span>
              </div>
            </Link>
          </div>

          {/* Menus */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>
              <UserMenu />
              <VendorMenu />
              <AdminMenu />
            </nav>
          </div>

          {/* Logout */}
          <div>
            <button
              onClick={handleLogout}
              className="flex cursor-pointer w-full items-center px-4 py-2 mt-5 text-white hover:bg-secondary hover:text-white transition-colors duration-300 transform"
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
