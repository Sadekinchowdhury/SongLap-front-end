import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const PrivateRoute = ({ children }) => {
   const { user, loading } = useContext(AuthContext);
   const location = useLocation(); // ✅ Correct way to get the current location

   if (loading) {
      return <div>Loading...</div>;
   }
   if (!user) {
      return <Navigate to='/login' state={{ from: location }} replace />;
   }
   return children ? children : <Outlet />;
};

export default PrivateRoute;
