import { MdEmail, MdAccessTime, MdLocationOn } from "react-icons/md";

const Contact = () => {
  return (
    <div className="grid-bg flex items-center justify-center px-4 md:py-16 py-10">
      <div className="max-w-2xl w-full">
        {/* Main Card */}
        <div
          className="
          bg-white dark:bg-base-100
          rounded-3xl shadow-2xl overflow-hidden
          border border-gray-100 dark:border-gray-800
          transition-all duration-300 hover:shadow-3xl
        "
        >
          {/* Header Section with Gradient */}
          <div className="relative bg-gradient-to-br from-primary to-secondary p-8 pb-12">
            <div className="absolute inset-0 bg-black opacity-0 dark:opacity-10"></div>
            <h2 className="relative text-4xl font-bold text-white mb-3 tracking-tight">
              Contact Us
            </h2>
            <p className="relative text-white/90 text-base leading-relaxed max-w-xl">
              Have questions or need assistance? Our team is here to help. Feel free
              to reach out anytime — we'll respond as soon as possible.
            </p>
          </div>

          {/* Content Section */}
          <div className="p-8 -mt-6 relative">
            {/* Email Card */}
            <div
              className="
              bg-gray-50 dark:bg-base-200
              rounded-2xl p-6 mb-6
              border border-gray-200 dark:border-gray-700
              hover:border-primary dark:hover:border-primary
              transition-all duration-300 hover:shadow-lg
              group
            "
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <MdEmail className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                    Email Address
                  </h3>
                  <a
                    href="mailto:aishohan001@gmail.com"
                    className="
                      text-lg font-medium text-gray-800 dark:text-neutral
                      hover:text-primary dark:hover:text-primary
                      transition-colors break-all
                    "
                  >
                    aishohan001@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Office Hours Card */}
              <div
                className="
                bg-gray-50 dark:bg-base-200
                rounded-2xl p-6
                border border-gray-200 dark:border-gray-700
                hover:border-primary dark:hover:border-primary
                transition-all duration-300 hover:shadow-lg
                group
              "
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-secondary/10 dark:bg-secondary/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MdAccessTime className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                      Office Hours
                    </h3>
                    <p className="text-sm font-medium text-gray-700 dark:text-neutral leading-relaxed">
                      Sunday–Thursday<br />9 AM – 5 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div
                className="
                bg-gray-50 dark:bg-base-200
                rounded-2xl p-6
                border border-gray-200 dark:border-gray-700
                hover:border-primary dark:hover:border-primary
                transition-all duration-300 hover:shadow-lg
                group
              "
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-secondary/10 dark:bg-secondary/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MdLocationOn className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                      Location
                    </h3>
                    <p className="text-sm font-medium text-gray-700 dark:text-neutral leading-relaxed">
                      Basundahra, Block C<br />Road-5/A, 18/B
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;