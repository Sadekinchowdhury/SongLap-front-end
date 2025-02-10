import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getUser() {
      try {
        const response = await fetch("http://localhost:3000/users/user", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const result = await response.json();
          setUser(result?.user);
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    getUser();
  }, []);
  console.log(user);

  return <AuthContext.Provider value={{ user, loading, error, setUser, setLoading }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
