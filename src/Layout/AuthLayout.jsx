import React from "react";
import Navbar from "../Components/Shared/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/Shared/Footer";

const AuthLayout = () => {
  return (
    <div className="grid-bg">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AuthLayout;
