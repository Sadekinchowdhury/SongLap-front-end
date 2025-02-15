import { useEffect, useState } from "react";
import { io } from "socket.io-client";

// Define socket URL as a string, not an instance
const SOCKET_URL = "http://localhost:3000";

const useSocket = () => {
   const [socket, setSocket] = useState(null);

   useEffect(() => {
      // Initialize socket connection
      const socketConnection = io(SOCKET_URL, {
         transports: ["websocket"],
         withCredentials: true,
         reconnection: true,
         reconnectionAttempts: 5,
         reconnectionDelay: 2000,
      });

      // Set the socket instance
      setSocket(socketConnection);

      // Handle connection events
      socketConnection.on("connect", () => {
         console.log("✅ Socket connected:", socketConnection.id);
      });

      socketConnection.on("disconnect", () => {
         console.log("⚠️ Socket disconnected");
      });

      socketConnection.on("connect_error", (err) => {
         console.error("❌ Connection error:", err.message);
      });

      // Clean up on component unmount
      return () => {
         socketConnection.disconnect();
         console.log("🔌 Socket disconnected on component unmount");
      };
   }, []);

   return socket;
};

export default useSocket;
