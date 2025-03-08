import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null); // Login user load
   const [loading, setLoading] = useState(true); // loading
   const [error, setError] = useState(null); // Error handling
   const [currentConversationId, setCurrentConversationId] = useState(null); // Find conversation by id
   const [singleConversation, setSingleConversation] = useState(null); // Pich of conversation data

   const [currentConv, setCurrentConv] = useState(null);

   const [conv, setConv] = useState(false); // This state use for instantly conversation user add

   const [showSideBar, setShowSideBar] = useState(true);

   // search conversation modal
   const [isModalOpen, setIsModalOpen] = useState(false);

   const [open, setOpen] = useState(false);

   const [rcvData, setRcvData] = useState(null);

   // Search conversation modal

   const handleModal = () => {
      setIsModalOpen(!isModalOpen);
   };

   // Logout
   const handleLogOut = async () => {
      try {
         setUser(null);

         const logout = await fetch("http://localhost:3000/auth/logout", {
            method: "DELETE",
            credentials: "include",
         });

         const result = await logout.json();
         if (!result.success) {
            console.error("Logout failed:", result.message);
         }
      } catch (err) {
         console.error("Logout error:", err);
      }
   };

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
      // Wrap by provider for using global data
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
            handleLogOut,
            setCurrentConv,
            currentConv,
            showSideBar,
            setShowSideBar,
            handleModal,
            isModalOpen,
            open,
            setOpen,
            rcvData,
            setRcvData,
         }}>
         {children}
      </AuthContext.Provider>
   );
};

export default AuthProvider;
