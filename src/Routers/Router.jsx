import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import AllTickets from "../Pages/AllTickets/AllTickets";
import AuthLayout from "../Layout/AuthLayout";
import Register from "../Pages/Auth/Register";
import Login from "../Pages/Auth/Login";
import ErrorPage from "../Components/ErrorPage";
import DashboardLayout from "../Layout/DashBoardLayout";
import MyBookedTickets from "../Pages/Dashboard/User/MyBookedTickets";
import UserProfile from "../Pages/Dashboard/User/UserProfile";
import TransactionHistory from "../Pages/Dashboard/User/TransactionHistory";
import VendorProfile from "../Pages/Dashboard/Vendor/VendorProfile";
import AddTicket from "../Pages/Dashboard/Vendor/AddTicket";
import MyAddedTicket from "../Pages/Dashboard/Vendor/MyAddedTicket";
import RequestBooking from "../Pages/Dashboard/Vendor/RequestBooking";
import RevenueOverView from "../Pages/Dashboard/Vendor/RevenueOverView";
import AdminProfile from "../Pages/Dashboard/Admin/AdminProfile";
import ManageTicket from "../Pages/Dashboard/Admin/ManageTicket";
import ManageUser from "../Pages/Dashboard/Admin/ManageUser";
import AdvertiseTicket from "../Pages/Dashboard/Admin/AdvertiseTicket";
import AllTicketsDetails from "../Pages/AllTickets/AllTicketsDetails";
import PrivateRoute from "./PrivateRoute";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/all-tickets",
        Component: AllTickets,
      },
      {
        path: "/all-tickets-details/:id",
        element: <AllTicketsDetails />,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {
        path: "/dashboard/my-tickets",
        element: <MyBookedTickets />,
      },
      {
        path: "/dashboard/user-profile",
        element: <UserProfile></UserProfile>,
      },
      {
        path: "/dashboard/transaction-history",
        element: <TransactionHistory />,
      },
      {
        path: "/dashboard/vendor-profile",
        element: <VendorProfile />,
      },
      {
        path: "/dashboard/add-ticket",
        element: <AddTicket />,
      },
      {
        path: "/dashboard/my-added-tickets",
        element: <MyAddedTicket />,
      },
      {
        path: "/dashboard/requested-bookings",
        element: <RequestBooking />,
      },
      {
        path: "/dashboard/revenue-overview",
        element: <RevenueOverView />,
      },
      {
        path: "/dashboard/admin-profile",
        element: <AdminProfile />,
      },
      {
        path: "/dashboard/manage-tickets",
        element: <ManageTicket />,
      },
      {
        path: "/dashboard/manage-users",
        element: <ManageUser />,
      },
      {
        path: "/dashboard/advertise-tickets",
        element: <AdvertiseTicket />,
      },
    ],
  },
]);
