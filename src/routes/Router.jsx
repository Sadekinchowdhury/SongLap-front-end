import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import MainLayout from "../layouts/main/MainLayout";
import Blog from "../pages/Blog";
import About from "../pages/About";
import Support from "../pages/Support";
import NotFoundRoute from "../components/NotFoundRoute";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,children:[
        {
            path:"/",
            element:<Home/>
        },
        {
            path:"/blog",
            element:<Blog/>
        },
        {
            path:"/about",
            element: <About/>
        },
        {
            path:"/support",
            element: <Support/>
        },
      ] 
    },
    {
      path:"*",
      element: <NotFoundRoute/>
    }
  ]);
  export default router;