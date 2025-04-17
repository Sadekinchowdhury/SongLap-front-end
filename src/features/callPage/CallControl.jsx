import { PhoneCall, PhoneOff } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import useSocket from "../../hooks/useSocket";
import { AuthContext } from "../../context/AuthProvider";
import { BroadcastChannel } from "broadcast-channel";

const CallControl = () => {
   const { user } = useContext(AuthContext);
   const socket = useSocket();
   const [callerId, setCallerId] = useState(null);
   const [callType, setCallType] = useState(null);
   const [incomingCall, setIncomingCall] = useState(false);
   const [callTimeout, setCallTimeout] = useState(null);
   const [callId, setCallId] = useState(null);
   const [message, setMessage] = useState(null);
   const channel = new BroadcastChannel("call_channel");

   const [callStatus, setCallStatus] = useState(null);

   useEffect(() => {
      const handleCallStatusChange = async () => {
         try {
            const response = await fetch(`http://localhost:3000/call/status`, {
               method: "PUT",
               headers: {
                  "Content-Type": "application/json",
               },
               credentials: "include",
               body: JSON.stringify({ callStatus, callId }),
            });

            const data = await response.json();
         } catch (error) {
            console.error("Error fetching data:", error);
         }
      };

      if (callStatus) {
         handleCallStatusChange();
      }

      return () => {
         if (callStatus) {
            handleCallStatusChange();
         }
      };
   }, [callStatus]);

   console.log(message);

   useEffect(() => {
      if (!socket || !socket.connected) {
         console.error("Socket is not connected!");
         return;
      }

      socket?.on("callInfo", (data) => {
         if (data.recipientId === user?._id) {
            setMessage(data);
         } else {
            console.log("Message not received");
         }
      });

      const handleIncomingCall = ({ senderId, recipientId, callType, callId }) => {
         if (recipientId === user?._id) {
            setCallerId(senderId);
            setCallType(callType);
            setIncomingCall(true);
            setCallId(callId);

            socket.emit("call-details", { callId, senderId, recipientId });

            // Auto-reject call if no response in 30 seconds
            const timeout = setTimeout(() => {
               setIncomingCall(false);
               socket.emit("call-missed", { senderId, recipientId });
            }, 10000);

            setCallTimeout(timeout);
         }
      };

      socket.on("incoming-call", handleIncomingCall);

      return () => {
         socket.off("incoming-call", handleIncomingCall);
         if (callTimeout) clearTimeout(callTimeout); // Cleanup timeout on unmount
      };
   }, [socket, socket?.connected]);

   console.log(message);

   const handleAccept = () => {
      if (callTimeout) clearTimeout(callTimeout); // Clear timeout since user responded
      const newWindow = window.open(`/call/${callerId}?type=${callType}`, "_blank", "");
      if (newWindow) {
         setTimeout(() => {
            channel.postMessage({
               type: "call-data",
               callId: message.callId,
               senderId: message.senderId,
               recipientId: message.recipientId,
            });
         }, 500);
      } else {
         console.error("Popup blocked!");
      }

      setIncomingCall(false);
      socket.emit("call-accepted", { callerId, receiverId: user?._id });
      setCallStatus("answered");
   };

   const handleReject = () => {
      if (callTimeout) clearTimeout(callTimeout);
      setIncomingCall(false);
      socket.emit("call-rejected", { callerId, receiverId: user?._id });
      setCallStatus("rejected");
   };

   return (
      <div>
         {incomingCall && (
            <div className='fixed bottom-10 right-10 flex flex-col gap-3 z-50'>
               <button
                  onClick={handleAccept}
                  className='flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition duration-300'>
                  <PhoneCall className='custom-pulse-animation' size={20} /> Accept
               </button>

               <button
                  onClick={handleReject}
                  className='flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition duration-300'>
                  <PhoneOff size={20} /> Reject
               </button>
            </div>
         )}
         <style>
            {`
            @keyframes customPulse {
               0% { transform: scale(1); fill:white; }
               50% { transform: scale(1.2); }
               100% { transform: scale(1); fill:black; }
            }

            .custom-pulse-animation {
               animation: customPulse 3s ease-in-out infinite;
            }
         `}
         </style>
      </div>
   );
};

export default CallControl;
