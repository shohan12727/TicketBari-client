import { use, useState, useRef } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { AuthContext } from "../../Contexts/AuthContext";
import { useForm } from "react-hook-form";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { saveOrUpdateUser } from "../../Utilities/imagebb";

const Login = () => {
  const { signIn, setUser, signInWithGoogle } = use(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const emailRef = useRef(null);

  const handleLogin = async (data) => {
    const { email, password } = data;
    setLoading(true);
    try {
      const userCredential = await signIn(email, password);
      const user = userCredential.user;

      await saveOrUpdateUser({ name: user?.displayName, email: user?.email, image: user?.photoURL });

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

        saveOrUpdateUser({
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
        });

        setUser(user);
        toast.success(`Welcome ${user.displayName || "User"}!`);
        navigate("/");
      })
      .catch((error) => toast.error(error.message));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="grid-bg py-12 min-h-screen flex items-center justify-center">
      <div className="card w-full max-w-md mx-auto bg-base-200 shadow-xl rounded-lg transition-colors">
        <h2 className="text-3xl font-bold text-center text-primary mt-4">
          Login Now
        </h2>

        <div className="card-body">
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="label mb-1 text-base-content font-medium">Email</label>
              <input
                ref={emailRef}
                className="input input-bordered w-full bg-base-100 text-base-content focus:ring-primary focus:ring-2"
                type="email"
                placeholder="Email"
                {...register("email", { required: "Email is required." })}
              />
              {errors.email && (
                <p className="text-error text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <label className="label mb-1 text-base-content font-medium">Password</label>
              <input
                className="input input-bordered w-full bg-base-100 text-base-content focus:ring-primary focus:ring-2"
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
                className="absolute right-3 top-[38px] text-base-content"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-error text-sm mt-1">{errors.password.message}</p>
            )}

            <div className="text-right">
              <button type="button" className="link link-hover text-primary">
                Forgot password?
              </button>
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </form>

          {/* OR Section */}
          <div className="flex items-center my-4">
            <hr className="grow border-base-content opacity-40" />
            <span className="px-2 text-base-content opacity-60 font-bold">OR</span>
            <hr className="grow border-base-content opacity-40" />
          </div>

          {/* Google Sign-In */}
          <button
            onClick={handleSignInWithGoogle}
            className="btn w-full bg-white text-black hover:bg-gray-100 border border-base-content flex items-center justify-center"
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
            <span className="ml-2">Continue with Google</span>
          </button>

          <p className="text-center font-bold mt-4 text-base-content">
            Don't Have An Account?{" "}
            <Link to="/register" className="text-primary underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
