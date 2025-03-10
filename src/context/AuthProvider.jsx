import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null); // Login user load
   const [loading, setLoading] = useState(true); // loading
   const [error, setError] = useState(null); // Error handling
   const [currentConversationId, setCurrentConversationId] = useState(null);
   const [singleConversation, setSingleConversation] = useState(null);
   const [currentConv, setCurrentConv] = useState(null);

   const [conv, setConv] = useState(false);
   const [showSideBar, setShowSideBar] = useState(true);
   const [showConversationList, setShowConversationList] = useState(false);

   // search conversation modal
   const [isModalOpen, setIsModalOpen] = useState(false);

   const [open, setOpen] = useState(false);

   const [rcvData, setRcvData] = useState(null);
   const [conversationList, setConversationList] = useState([]);

   // Conversation search modal
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

   // Get user conversation data
   useEffect(() => {
      const getConversation = async () => {
         try {
            const response = await fetch("http://localhost:3000/inbox/conversation", {
               method: "GET",
               headers: { "Content-Type": "application/json" },
               credentials: "include",
            });

            const result = await response.json();
            setConversationList(result.data);
         } catch (error) {
            console.error("Error fetching data:", error);
         }
      };
      getConversation();
   }, [currentConversationId, conv, showConversationList]);

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
            conversationList,
            setShowConversationList,
            showConversationList,
         }}>
         {children}
      </AuthContext.Provider>
   );
};

export default AuthProvider;
