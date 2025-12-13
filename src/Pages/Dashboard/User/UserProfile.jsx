import LoadingSpinner from "../../../Components/LoadingSpinner";
import useAuth from "../../../Hooks/useAuth";
import useRole from "../../../Hooks/useRole";

const UserProfile = () => {
  const [role, isRoleLoading] = useRole();
  const { user } = useAuth();

  const name = user?.displayName;
  const email = user?.email;
  const photo = user?.photoURL;

  if (isRoleLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen py-8 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Card */}
        <div className="bg-base-100 rounded-2xl shadow-xl overflow-hidden">
          {/* Header Banner */}
          <div className="h-32 sm:h-40 bg-gradient-to-r from-primary to-secondary" />

          {/* Profile Content */}
          <div className="relative px-6 sm:px-8 pb-8">
            {/* Profile Photo */}
            <div className="flex flex-col items-center sm:flex-row sm:items-end -mt-16 sm:-mt-20">
              <div className="relative">
                <img
                  src={photo}
                  alt={name || "User"}
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-base-100 shadow-lg object-cover"
                />
                <div className="absolute bottom-2 right-2 w-4 h-4 bg-success rounded-full border-2 border-base-100" />
              </div>

              {/* Name and Role (Desktop) */}
              <div className="hidden sm:block sm:ml-6  sm:mb-4">
                <h1 className="text-3xl mt-3 font-bold text-base-content">
                  {name || "Anonymous User"}
                </h1>
                <p className="text-lg text-base-content/70 mt-1">
                  {role || "User"}
                </p>
              </div>
            </div>

            {/* Name and Role (Mobile) */}
            <div className="sm:hidden text-center mt-4">
              <h1 className="text-2xl font-bold text-base-content">
                {name || "Anonymous User"}
              </h1>
              <p className="text-base text-base-content/70 mt-1">
                {role || "User"}
              </p>
            </div>

            {/* Profile Details */}
            <div className="mt-8 space-y-6">
              <div className="border-t border-base-300 pt-6">
                <h2 className="text-xl font-semibold text-base-content mb-4">
                  Profile Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="bg-base-200 rounded-lg p-4">
                    <p className="text-sm text-base-content/60">
                      Email Address
                    </p>
                    <p className="text-base text-base-content break-all mt-1">
                      {email || "No email provided"}
                    </p>
                  </div>

                  {/* Role */}
                  <div className="bg-base-200 rounded-lg p-4">
                    <p className="text-sm text-base-content/60">Role</p>
                    <span className="inline-block mt-1 px-3 py-1 text-sm font-semibold text-primary-content bg-primary rounded-full">
                      {role || "User"}
                    </span>
                  </div>

                  {/* Name */}
                  <div className="bg-base-200 rounded-lg p-4">
                    <p className="text-sm text-base-content/60">Full Name</p>
                    <p className="text-base text-base-content mt-1">
                      {name || "Anonymous User"}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="bg-base-200 rounded-lg p-4">
                    <p className="text-sm text-base-content/60">
                      Account Status
                    </p>
                    <p className="text-base text-success font-medium mt-1">
                      Active
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

export default UserProfile;
