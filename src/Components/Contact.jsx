import { MdEmail } from "react-icons/md";

const Contact = () => {
  return (
    <div className="grid-bg flex items-center justify-center px-4 py-16">
      <div
        className="
        bg-white dark:bg-gray-900
        text-gray-800 dark:text-gray-200
        rounded-2xl shadow-xl p-10 max-w-lg w-full
        border-t-4 border-primary
        transition-all duration-300 hover:shadow-2xl
      "
      >
        {/* Page Title */}
        <h2 className="text-3xl font-bold text-primary dark:text-primary mb-4 tracking-tight">
          Contact Us
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm leading-relaxed">
          Have questions or need assistance? Our team is here to help. Feel free
          to reach out anytime — we’ll respond as soon as possible.
        </p>

        {/* Email */}
        <div className="flex items-center gap-4 mb-6 group">
          <MdEmail
            className="
            w-7 h-7 text-ieee-orange
            group-hover:text-ieee-darkblue
            dark:text-ieee-blue dark:group-hover:text-ieee-orange
            transition-colors
          "
          />

          <a
            href="mailto:aishohan001@gmail.com"
            className="
              text-gray-700 dark:text-gray-300
            dark:hover:text-orange-800
              transition-colors text-sm break-all font-medium
            "
          >
            aishohan001@gmail.com
          </a>
        </div>

        {/* Divider */}
        <hr className="border-gray-300 dark:border-gray-700 my-6" />

        {/* Extra Contact Info */}
        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-3">
          <p>
            <span className="font-semibold text-ieee-darkblue dark:text-ieee-blue">
              Office Hours:
            </span>{" "}
            Sunday–Thursday, 9 AM – 5 PM
          </p>
          <p>
            <span className="font-semibold text-ieee-darkblue dark:text-ieee-blue">
              Location:
            </span>{" "}
            Basundahra, Block C, Road-5/A, 18/B
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
