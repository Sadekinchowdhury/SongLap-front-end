import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/main/MainLayout";
import Blog from "../pages/Blog";
import About from "../pages/About";
import Support from "../pages/Support";
import NotFoundRoute from "../components/NotFoundRoute";
import Home from "../pages/home/Home";
import Message from "../features/chat/Message";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/support",
        element: <Support />,
      },
      {
        path: "/message",
        element: <Message />,
      },
      {
        path: "*",
        element: <NotFoundRoute />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
