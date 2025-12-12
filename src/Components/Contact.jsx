import React from "react";

const Contact = () => {
  return (
    <div className="grid-bg flex items-center justify-center px-4 py-20">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-lg w-full border-t-4 border-primary transition-all duration-300 hover:shadow-2xl">
        {/* Page Title */}
        <h2 className="text-3xl font-bold text-ieee-darkblue mb-4 tracking-tight">
          Contact Us
        </h2>

        <p className="text-gray-600 mb-8 text-sm leading-relaxed">
          Have questions or need assistance? Our team is here to help. Feel free
          to reach out anytime — we’ll respond as soon as possible.
        </p>

        {/* Email */}
        <div className="flex items-center gap-4 mb-6 group">
          <svg
            className="w-7 h-7 text-ieee-orange mt-1 group-hover:text-ieee-darkblue transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>

          <a
            href="mailto:info@example.com"
            className="text-gray-700 hover:text-ieee-blue transition-colors text-sm break-all font-medium"
          >
            aishohan001@gmail.com
          </a>
        </div>

        {/* Divider */}
        <hr className="border-gray-200 my-6" />

        {/* Extra Contact Info */}
        <div className="text-sm text-gray-600 space-y-3">
          <p>
            <span className="font-semibold text-ieee-darkblue">
              Office Hours:
            </span>{" "}
            Sunday–Thursday, 9 AM – 5 PM
          </p>
          <p>
            <span className="font-semibold text-ieee-darkblue">Location:</span>{" "}
            Basundahra, Block C, Road- 5/A,18/B
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
