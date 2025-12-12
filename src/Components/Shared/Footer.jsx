import React from "react";
import { Mail, Phone, Facebook } from "lucide-react";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-base-200 text-base-content transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Logo & Description */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">TicketBari</h2>
            <p className="text-sm text-left opacity-80">
              Discover and book Bus, Train, Launch, and Plane tickets quickly
              and conveniently. Enjoy seamless booking, instant confirmations,
              and easy access to all travel options.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/all-tickets" className="text-sm hover:text-primary">
                  All Tickets
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-primary">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>

            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <Mail size={16} className="text-primary" />
                <a
                  href="mailto:aishohan001@gmail.com"
                  className="hover:text-primary transition-colors"
                >
                  aishohan001@gmail.com
                </a>
              </li>

              <li className="flex items-center gap-2 text-sm">
                <Phone size={16} className="text-primary" />
                <a
                  href="tel:+8801887104758"
                  className="hover:text-primary transition-colors"
                >
                  +8801887104758
                </a>
              </li>

              <li className="flex items-center gap-2 text-sm">
                <Facebook size={16} className="text-primary" />
                <a
                  href="https://www.facebook.com/ashraful.islam.shohan.467732"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Facebook Link
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Payment Methods */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Payment Methods</h3>

            <div className="flex items-center gap-3 flex-wrap">
              {["Stripe", "SSLCommerz", "bKash", "Nagad"].map((pm) => (
                <div
                  key={pm}
                  className="bg-primary text-primary-content rounded px-3 py-1.5 font-semibold"
                >
                  {pm}
                </div>
              ))}
            </div>

            <p className="text-xs opacity-70">Secure payment processing</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-base-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-sm text-center opacity-60">
            © 2025 TicketBari. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
