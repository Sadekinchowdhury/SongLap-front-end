import router from "./routes/Router";
import AuthProvider from "./context/AuthProvider";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
