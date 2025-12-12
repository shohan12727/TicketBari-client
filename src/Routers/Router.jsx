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
import SuccessUrl from "../Pages/Dashboard/Payment/SuccessUrl";
import CancelUrl from "../Pages/Dashboard/Payment/CancelUrl";
import Contact from "../Components/Contact";
import About from "../Components/About";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/all-tickets",
        element: (
          <PrivateRoute>
            <AllTickets />
          </PrivateRoute>
        ),
      },
      {
        path: "/all-tickets-details/:id",
        element: <AllTicketsDetails />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
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
      {
        path: "/dashboard/success-payment",
        element: <SuccessUrl />,
      },
      {
        patch: "/dashboard/cancel-payment",
        element: <CancelUrl />,
      },
    ],
  },
]);
