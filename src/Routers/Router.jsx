import { createBrowserRouter } from "react-router";
import Root from "../RootLayout/Root";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
  },
]);
