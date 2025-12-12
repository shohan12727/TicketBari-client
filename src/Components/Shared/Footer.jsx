import React from "react";
import { Mail, Phone, Facebook } from "lucide-react";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Logo & Description */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">TicketBari</h2>
            <p className="text-sm  text-left">
              Discover and book Bus, Train, Launch, and Plane tickets quickly
              and conveniently on our reliable online platform. Enjoy a seamless
              booking experience, instant confirmations, and easy access to all
              your travel options in one place.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/all-tickets"
                  className="text-sm hover:text-white transition-colors"
                >
                  All Tickets
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <Mail size={16} className="text-blue-400" />
                <a
                  href="mailto:info@ticketbari.com"
                  className="hover:text-white transition-colors"
                >
                  aishohan001@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone size={16} className="text-green-400" />
                <a
                  href="tel:+8801234567890"
                  className="hover:text-white transition-colors"
                >
                  +8801887104758
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Facebook size={16} className="text-blue-500" />
                <a
                  href="https://www.facebook.com/ashraful.islam.shohan.467732"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Facebook Link
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Payment Methods */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">
              Payment Methods
            </h3>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="bg-primary rounded px-3 py-1.5  font-bold text-white">
                Stripe
              </div>
              <div className="bg-primary rounded px-3 py-1.5  font-bold text-white">
                SSLCommerz
              </div>
              <div className="bg-primary rounded px-3 py-1.5  font-bold text-white">
                bKash
              </div>
              <div className="bg-primary rounded px-3 py-1.5  font-bold text-white">
                Nagad
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Secure payment processing
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-sm text-center text-gray-400">
            © 2025 TicketBari. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
