import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AuthProvider from "./context/AuthProvider";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Router.jsx";
import { ToastContainer } from "react-toastify";
import CallControl from "./features/callPage/callControl.jsx";

createRoot(document.getElementById("root")).render(
   <StrictMode>
      <AuthProvider>
         <RouterProvider router={router} />
         <ToastContainer position='top-right' autoClose={3000} />
         <CallControl />
      </AuthProvider>
   </StrictMode>
);
