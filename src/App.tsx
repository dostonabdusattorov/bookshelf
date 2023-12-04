import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Home,
  homeLoader,
  SignInRoute,
  SignUpRoute,
  signUpLoader,
  signInLoader,
} from "./routes";
import { NotFound } from "./components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: homeLoader,
  },
  {
    path: "/sign-up",
    element: <SignUpRoute />,
    loader: signUpLoader,
  },
  {
    path: "/sign-in",
    element: <SignInRoute />,
    loader: signInLoader,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default () => <RouterProvider router={router} />;
