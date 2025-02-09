import { createContext, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (formData) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      setUser(result.user);
    } catch (err) {
      console.error("Error during login:", err);
    } finally {
      setLoading(false);
    }
  };

  return <AuthContext.Provider value={{ user, loading, login }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
