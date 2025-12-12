import { Outlet } from "react-router";
import Navbar from "../Components/Shared/Navbar";
import Footer from "../Components/Shared/Footer";
import TopScroll from "../Components/TopScroll";
import ScrollToTopButton from "../Components/ScrollToTopButton";

const Root = () => {
  return (
    <>
      <TopScroll />
      <ScrollToTopButton></ScrollToTopButton>
      <Navbar />
      <Outlet></Outlet>
      <Footer />
    </>
  );
};

export default Root;
