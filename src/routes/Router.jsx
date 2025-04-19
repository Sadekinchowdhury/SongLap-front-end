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
import PrivateRoute from "./PrivateRoute";
import Conversation from "../features/chat/conversation/Conversation";
import Settings from "../features/settings/Settings";
import Favourite from "../features/favourite/Favourite";
import CallWindow from "../features/callPage/CallWindow";
import MobileChat from "../features/chat/mobileChat/MobileChat";


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
   {
      path: "/message",
      element: (
         <PrivateRoute>
            <Message />
         </PrivateRoute>
      ),
      children: [
         {
            path: "",
            element: <Conversation />,
            children:[
               {
                  path: ":id",
                  element:  <MobileChat/>
               }
            ]
         
         },
         {
            path: "settings",
            element: <Settings />,
         },
         {
            path: "favourite",
            element: <Favourite />,
         },

      ],
   },
   {
      path: "/call/:userId",
      element: (
         <PrivateRoute>
            <CallWindow />
         </PrivateRoute>
      ),
   },
]);

export default router;
