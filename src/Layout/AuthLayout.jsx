import React from "react";
import Navbar from "../Components/Shared/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/Shared/Footer";
import TopScroll from "../Components/TopScroll";
import ScrollToTopButton from "../Components/ScrollToTopButton";

const AuthLayout = () => {
  return (
    <div className="grid-bg">
      <TopScroll />
      <ScrollToTopButton />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AuthLayout;
