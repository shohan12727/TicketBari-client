import { Outlet } from "react-router";
import Sidebar from "../Pages/Dashboard/Sidebar";
import TopScroll from "../Components/TopScroll";
import ScrollToTopButton from "../Components/ScrollToTopButton";

const DashboardLayout = () => {
  return (
    <>
      <TopScroll />
      <ScrollToTopButton/>
      <div className=" min-h-screen md:flex ">
        {/* Left Side: Sidebar Component */}
        <Sidebar />
        {/* Right Side: Dashboard Dynamic Content */}
        <div className="flex-1  md:ml-64">
          <div className="p-5">
            {/* Outlet for dynamic contents */}
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
