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
    ],
  },
]);
