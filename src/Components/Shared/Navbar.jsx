import React, { useState } from "react";
import { Menu, X, Ticket, User } from "lucide-react";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

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
            <NavLink
              to="/all-tickets"
              className="text-white hover:underline font-bold"
            >
              All Tickets
            </NavLink>
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
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-primary "
              >
                <User className="w-6 h-6" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded font-bold text-primary shadow-2xl py-2 z-50">
                  <a href="#" className="block px-4 py-2 ">
                    My Profile
                  </a>
                </div>
              )}
            </div>

            {/* Login & Sign Up Buttons */}
            <button className="px-4 py-2 text-white border-2 border-white rounded-lg hover:bg-white hover:text-primary transition-all duration-200 font-bold">
              Login
            </button>
            <button className="px-4 py-2 bg-white text-primary rounded-lg hover:scale-105 transition  font-bold shadow-md">
              Sign Up
            </button>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-indigo-200 transition-colors duration-200"
            >
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
              to="/all-tickets"
              className="block px-3 py-2  text-white hover:bg-[#A3070C] font-bold"
            >
              All Tickets
            </Link>
            <Link
              to="/dashboard"
              className="block px-3 py-2 text-white hover:bg-[#A3070C] font-bold"
            >
              Dashboard
            </Link>
            <a
              href="#"
              className="block px-3 py-2 rounded-lg text-white hover:bg-[#A3070C]  transition-colors duration-200 font-medium"
            >
              Login
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded-lg text-white hover:bg-[#A3070C] transition-colors duration-200 font-medium"
            >
              Register
            </a>
            <a
              href="#"
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
