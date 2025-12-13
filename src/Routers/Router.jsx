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
        element: (
          <PrivateRoute>
            <AllTicketsDetails />
          </PrivateRoute>
        ),
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
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/my-tickets",
        element: (
          <PrivateRoute>
            <MyBookedTickets />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/user-profile",
        element: (
          <PrivateRoute>
            <UserProfile></UserProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/transaction-history",
        element: (
          <PrivateRoute>
            <TransactionHistory />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/vendor-profile",
        element: (
          <PrivateRoute>
            <VendorProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/add-ticket",
        element: (
          <PrivateRoute>
            <AddTicket />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-added-tickets",
        element: (
          <PrivateRoute>
            <MyAddedTicket />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/requested-bookings",
        element: (
          <PrivateRoute>
            <RequestBooking />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/revenue-overview",
        element: (
          <PrivateRoute>
            <RevenueOverView />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/admin-profile",
        element: (
          <PrivateRoute>
            <AdminProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/manage-tickets",
        element: (
          <PrivateRoute>
            <ManageTicket />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/manage-users",
        element: (
          <PrivateRoute>
            <ManageUser />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/advertise-tickets",
        element: (
          <PrivateRoute>
            <AdvertiseTicket />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/success-payment",
        element: (
          <PrivateRoute>
            <SuccessUrl />
          </PrivateRoute>
        ),
      },
      {
        patch: "/dashboard/cancel-payment",
        element: (
          <PrivateRoute>
            <CancelUrl />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
