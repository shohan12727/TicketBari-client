import { Link, useNavigate } from "react-router";
import { use, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { AuthContext } from "../../Contexts/AuthContext";

const Register = () => {
  const { createUser, setUser, signInWithGoogle, userUpdate } = use(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    // createUser hosche eikhane

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 6 characters long and include both uppercase and lowercase letters."
      );
      return;
    }

    createUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        userUpdate({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            toast.success("Account created successfully!");
            e.target.reset();
            navigate("/");
          })
          .catch((error) => {
            toast.error(error.message);
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  const handleSignInWithGoogle = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success(`Welcome ${user.displayName || "User"}!`);
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(`Google sign-in failed: ${errorMessage}`);
      });
  };

  return (
    <>
      <div className="hero bg-base-200 py-2">
        <div className="card w-full max-w-md mx-auto  p-2">
          <h2 className="text-2xl font-bold text-center">Register Now</h2>
          <div className="card-body">
            <form onSubmit={handleRegister}>
              <fieldset className="space-y-4">
                <div>
                  {/* Name  */}
                  <label className="label mb-1">Name</label>
                  <input
                    name="name"
                    type="text"
                    className="input w-full"
                    placeholder="Name"
                    required
                  />
                </div>
                <div>
                  {/* Photo-URL  */}
                  <label className="label mb-1">Photo-URL</label>
                  <input
                    name="photo"
                    type="text"
                    className="input w-full"
                    placeholder="Photo-URL"
                    required
                  />
                </div>
                <div>
                  {/* email  */}
                  <label className="label mb-1">Email</label>
                  <input
                    name="email"
                    type="email"
                    className="input w-full"
                    placeholder="Email"
                    required
                  />
                </div>
                {/* password */}
                <div className="relative">
                  <label className="label mb-1">Password</label>
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="input w-full focus:outline-none focus:ring-0"
                    placeholder="Password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-[38px]"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? (
                      <EyeOffIcon size={20}></EyeOffIcon>
                    ) : (
                      <EyeIcon size={20}></EyeIcon>
                    )}
                  </button>
                </div>
                <button type="submit" className="btn btn-neutral w-full">
                  Register
                </button>
              </fieldset>
            </form>
            {/* or here  */}
            <div className="flex items-center my-4">
              <hr className="grow border-t border-gray-300" />
              <span className="px-2 text-gray-500 font-bold">OR</span>
              <hr className="grow border-t border-gray-300" />
            </div>

            <button
              onClick={handleSignInWithGoogle}
              className="btn bg-white text-black border-[#e5e5e5] w-full"
            >
              <svg
                aria-label="Google logo"
                width="25"
                height="25"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              <span className="ml-2">Login with Google</span>
            </button>

            <p className="text-center font-bold mt-4">
              Already Have An Account?{" "}
              <Link to={`/login`} className="text-primary underline">
                Login
              </Link>
            </p>
          </div>
        </div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </>
  );
};

export default Register;
