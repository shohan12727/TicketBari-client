import { use, useState } from "react";
import { Menu, X, Ticket } from "lucide-react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Contexts/AuthContext";
import toast from "react-hot-toast";
import ThemeToggle from "../ThemeToggle";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logOut } = use(AuthContext);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    logOut()
      .then(() => toast.success("Logged out successfully"))
      .catch(() => toast.error("Logout failed. Please try again."));
  };

  return (
    <nav className="bg-base-100 shadow-md border-b border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Ticket className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-base-content">
              Ticket<span className="text-secondary">Bari</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className="nav-link">Home</NavLink>
            {user && <NavLink to="/all-tickets" className="nav-link">All Tickets</NavLink>}
            <NavLink to="/contact" className="nav-link">Contact Us</NavLink>
            <NavLink to="/about" className="nav-link">About</NavLink>
            {user && <NavLink to="/dashboard/user-profile" className="nav-link">Dashboard</NavLink>}
          </div>

          {/* Mobile & Desktop Right Section */}
          <div className="flex items-center space-x-4">
            {/* Desktop Right Section */}
            <div className="hidden md:flex items-center space-x-4">
              <ThemeToggle />

              {user && (
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="w-10 h-10 rounded-full overflow-hidden shadow border border-base-300"
                  >
                    <img
                      src={user.photoURL}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-base-100 border border-base-300 rounded-xl shadow-lg py-2 z-50">
                      <Link
                        to="/dashboard/user-profile"
                        className="dropdown-link"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        My Profile
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {user ? (
                <button
                  onClick={handleLogout}
                  className="btn btn-outline btn-primary font-bold"
                >
                  Logout
                </button>
              ) : (
                <Link to="/login">
                  <button className="btn btn-outline btn-primary font-bold">
                    Login
                  </button>
                </Link>
              )}

              <Link to="/register">
                <button className="btn btn-primary text-white font-bold">
                  Sign Up
                </button>
              </Link>
            </div>

            {/* Mobile ThemeToggle + Hamburger */}
            <div className="flex md:hidden items-center space-x-2">
              <ThemeToggle />
              <button onClick={toggleMenu} className="text-base-content">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-base-100 border-t border-base-300">
          <div className="px-4 pt-2 pb-4 space-y-2">

            <Link to="/" onClick={closeMenu} className="mobile-link">
              Home
            </Link>

            {user && (
              <Link to="/all-tickets" onClick={closeMenu} className="mobile-link">
                All Tickets
              </Link>
            )}

            {user && (
              <Link to="/dashboard/user-profile" onClick={closeMenu} className="mobile-link">
                Dashboard
              </Link>
            )}

            <Link to="/contact" onClick={closeMenu} className="mobile-link">
              Contact Us
            </Link>

            <Link to="/about" onClick={closeMenu} className="mobile-link">
              About
            </Link>

            <Link to="/register" onClick={closeMenu} className="mobile-link">
              Register
            </Link>

            {user && (
              <Link to="/dashboard/user-profile" onClick={closeMenu} className="mobile-link">
                My Profile
              </Link>
            )}

            {user ? (
              <button
                onClick={handleLogout}
                className="mobile-link"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="block">
                <button className="mobile-link">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
