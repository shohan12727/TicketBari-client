import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import AllTickets from "../Pages/AllTickets/AllTickets";
import DashBoard from "../Pages/Dashboard/DashBoard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: '/all-tickets',
        Component: AllTickets
      }
    ],
  },
  {
    path: '/dashboard',
    Component: DashBoard
  }
]);
