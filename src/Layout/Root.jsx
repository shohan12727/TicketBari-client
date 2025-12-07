import { Outlet } from "react-router";
import Navbar from "../Components/Shared/Navbar";

const Root = () => {
  return (
    <>
      <Navbar />
      <div>
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default Root;
