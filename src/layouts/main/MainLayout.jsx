import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

function MainLayout() {
  const location = useLocation();

  return (
    <>
      {/* Render Navbar only if not on /message, /login, or /register routes */}
      {location.pathname !== "/message" && location.pathname !== "/login" && location.pathname !== "/register" && <Navbar />}
      <Outlet />
    </>
  );
}

export default MainLayout;
