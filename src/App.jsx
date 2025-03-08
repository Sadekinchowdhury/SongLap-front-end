import router from "./routes/Router";
import AuthProvider from "./context/AuthProvider";
import { RouterProvider } from "react-router-dom";
import ReceiveCall from "./features/receiveCall/receiveCall";

function App() {
   return (
      <AuthProvider>
         <RouterProvider router={router} />
         <ReceiveCall />
      </AuthProvider>
   );
}

export default App;
