import { use, useState, useRef } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { AuthContext } from "../../Contexts/AuthContext";
import { useForm } from "react-hook-form";
import LoadingSpinner from "../../Components/LoadingSpinner";

const Login = () => {
  const { signIn, setUser, signInWithGoogle } = use(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const emailRef = useRef(null);
  
  const handleLogin = async (data) => {
    const { email, password } = data;
    setLoading(true);
    try {
      const userCredential = await signIn(email, password);
      const user = userCredential.user;
      setUser(user);
      toast.success("Login successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignInWithGoogle = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success(`Welcome ${user.displayName || "User"}!`);
        navigate("/");
      })
      .catch((error) => toast.error(error.message));
  };

  // const handleForgotPassword = () => {
  //   const email = emailRef.current?.value || "";
  //   navigate("/password-reset", { state: { email } });
  // };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="grid-bg py-8">
        <div className="card w-full max-w-md mx-auto bg-base-200 p-2">
          <h2 className="text-2xl font-bold text-center">Login Now</h2>

          <div className="card-body">
            <form onSubmit={handleSubmit(handleLogin)}>
              <fieldset className="space-y-4">
                {/* email  */}
                <div>
                  <label className="label mb-1">Email</label>
                  <input
                    ref={emailRef}
                    className="input w-full"
                    type="email"
                    placeholder="Email"
                    {...register("email", {
                      required: "Email is required.",
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* password */}
                <div className="relative">
                  <label className="label mb-1">Password</label>
                  <input
                    className="input w-full focus:outline-none focus:ring-0"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required.",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long.",
                      },
                    })}
                  />

                  <button
                    type="button"
                    className="absolute right-3 top-[38px]"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon size={20} />
                    ) : (
                      <EyeIcon size={20} />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}

                <div className="text-right">
                  <button type="button" className="link link-hover">
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary text-white w-full"
                >
                  Login
                </button>
              </fieldset>
            </form>

            {/* OR section */}
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
                width="20"
                height="20"
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
              Don't Have An Account?{" "}
              <Link to="/register" className="text-primary underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
