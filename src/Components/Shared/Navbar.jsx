import { use, useState } from "react";
import { Menu, X, Ticket, User } from "lucide-react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Contexts/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logOut } = use(AuthContext);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully");
      })
      .catch(() => {
        toast.error("Logout failed. Please try again.");
      });
  };

  return (
    <nav className="bg-primary shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Left Side */}
          <Link to="/">
            <div className="flex items-center space-x-2">
              <Ticket className="w-8 h-8 text-white" />
              <span className="text-white text-2xl font-bold">
                Ticket<span className="text-[#FFD700]">Bari</span>{" "}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Center */}

          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className="text-white hover:underline font-bold">
              Home
            </NavLink>
            {user && (
              <NavLink
                to="/all-tickets"
                className="text-white hover:underline font-bold"
              >
                All Tickets
              </NavLink>
            )}
            <NavLink
              to="/dashboard"
              className="text-white hover:underline font-bold"
            >
              Dashboard
            </NavLink>
          </div>

          {/* Desktop Right Side - Avatar & Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Avatar with Dropdown */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-primary focus:outline-none"
              >
                <img
                  src={user?.photoURL}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-200">
                  <Link
                    to="/dashboard/user-profile"
                    className="block px-4 py-2 text-primary font-bold hover:bg-gray-100 transition"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    My Profile
                  </Link>
                </div>
              )}
            </div>

            {/* Login & Sign Up Buttons */}
            {user ? (
              <Link onClick={handleLogout}>
                <button className="px-4 py-2 text-white border-2 border-white rounded-lg hover:bg-white hover:text-primary transition-all duration-200 font-bold">
                  LogOut
                </button>
              </Link>
            ) : (
              <Link to="/login">
                <button className="px-4 py-2 text-white border-2 border-white rounded-lg hover:bg-white hover:text-primary transition-all duration-200 font-bold">
                  Login
                </button>
              </Link>
            )}

            <Link to="/register">
              <button className="px-4 py-2 bg-white text-primary rounded-lg hover:scale-105 transition  font-bold shadow-md">
                Sign Up
              </button>
            </Link>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white">
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link
              to="/"
              className="block px-3 py-2  text-white hover:bg-[#A3070C] font-bold"
              onClick={closeMenu}
            >
              Home
            </Link>

            {user && (
              <Link
                to="/all-tickets"
                onClick={closeMenu}
                className="block px-3 py-2  text-white hover:bg-[#A3070C] font-bold"
              >
                All Tickets
              </Link>
            )}

            <Link
              to="/dashboard"
              onClick={closeMenu}
              className="block px-3 py-2 text-white hover:bg-[#A3070C] font-bold"
            >
              Dashboard
            </Link>
            
            {user ? (
              <Link onClick={handleLogout}>
                <button className="px-4 py-2 text-white   hover:bg-white hover:text-primary transition-all duration-200 font-bold">
                  LogOut
                </button>
              </Link>
            ) : (
              <Link to="/login">
                <button className="px-4 py-2 text-white   hover:bg-white hover:text-primary transition-all duration-200 font-bold">
                  Login
                </button>
              </Link>
            )}

            <Link
              to="register"
              onClick={closeMenu}
              className="block px-3 py-2 rounded-lg text-white hover:bg-[#A3070C] transition-colors duration-200 font-medium"
            >
              Register
            </Link>
            <a
              href="#"
              onClick={closeMenu}
              className="block px-3 py-2 rounded-lg text-white hover:bg-[#A3070C] transition-colors duration-200 font-medium"
            >
              My Profile
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
