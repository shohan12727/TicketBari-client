import errorImg from "../assets/Banner/errorImg.png";
import { Link } from "react-router";
import Navbar from "./Shared/Navbar";
import Footer from "./Shared/Footer";

const ErrorPage = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Navbar></Navbar>
      <div className="flex-1 w-full flex flex-col items-center justify-center px-4 py-4">
        <img
          src={errorImg}
          alt="Error 404"
          className="max-w-full max-h-[60vh] object-contain"
        />
        <h1 className="text-4xl mt-4 text-center font-bold">
          Oops, page not found!
        </h1>
        <p className="text-center mt-2 text-[#627382]">
          The page you are looking for is not available.
        </p>
        <div className="flex justify-center items-center my-5">
          <Link to="/" className="btn text-white bg-primary">
            Go Back!
          </Link>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ErrorPage;
