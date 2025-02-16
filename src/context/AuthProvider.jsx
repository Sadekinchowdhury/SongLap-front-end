import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [currentConversationId, setCurrentConversationId] = useState(null);
   const [singleConversation, setSingleConversation] = useState(null);
   const [conv, setConv] = useState(true);

   // Fetch logged-in user data
   useEffect(() => {
      async function getUser() {
         try {
            const response = await fetch("http://localhost:3000/users/user", {
               method: "GET",
               credentials: "include",
            });

            if (!response.ok) {
               throw new Error("Failed to fetch user data");
            }

            const result = await response.json();
            setUser(result?.user);
         } catch (err) {
            setError(err.message);
         } finally {
            setLoading(false);
         }
      }

      getUser();
   }, []);

   // Fetch single conversation when `conversationid` changes
   useEffect(() => {
      const getSingleConversation = async () => {
         if (!currentConversationId) return;

         try {
            let response = await fetch(`http://localhost:3000/inbox/conversation/${currentConversationId}`, {
               method: "GET",
               credentials: "include",
            });

            if (!response.ok) {
               throw new Error(`Failed to fetch conversation: ${response.status}`);
            }

            let result = await response.json();
            setSingleConversation(result.data);
         } catch (err) {
            console.error("Error fetching conversation:", err);
         }
      };

      getSingleConversation();
   }, [currentConversationId]);

   return (
      <AuthContext.Provider
         value={{
            user,
            loading,
            error,
            setUser,
            setLoading,
            setCurrentConversationId,
            currentConversationId,
            singleConversation,
            conv,
            setConv,
         }}>
         {children}
      </AuthContext.Provider>
   );
};

export default AuthProvider;
