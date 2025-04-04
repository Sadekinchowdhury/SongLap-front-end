// import { PhoneCall, PhoneOff, User } from "lucide-react";
// import { useContext, useEffect, useState } from "react";

// import useSocket from "../../hooks/useSocket";
// import { AuthContext } from "../../context/AuthProvider";

// const CallControl = () => {
//    const { user } = useContext(AuthContext);
//    const socket = useSocket();
//    const [receiverId, setReceiverId] = useState(null); // Fixed typo: reciverId -> receiverId
//    const [callerId, setCallerId] = useState(null);
//    const [callType, setCallType] = useState(null);
//    const [callWindow, setCallWindow] = useState(null);

//    // useEffect(() => {
//    //    if (!socket) {
//    //       console.error("Socket is not connected!");
//    //       return;
//    //    }

//    //    console.log("Socket Connected", socket);

//    //    const handleIncomingCall = ({ senderId, recipientId, callType }) => {
//    //       console.log("Incoming call from:", senderId, recipientId);
//    //       if (recipientId == user?._id) {
//    //          setCallerId(senderId);
//    //          setCallType(callType);
//    //          setReceiverId(recipientId);
//    //       }
//    //    };

//    //    socket.on("incoming-call", handleIncomingCall);

//    //    return () => {
//    //       socket.off("incoming-call", handleIncomingCall); // Cleanup correctly
//    //    };
//    // }, [socket]); // Re-run effect if `socket` changes
//    useEffect(() => {
//       const responseTimeout = setTimeout(() => {
//          console.log("❌ No response from receiver. Ending call...");
//          socket?.emit("endCall");
//       }, 5000); // 30 seconds timeout

//       if (!socket || !socket.connected) {
//          console.error("Socket is not connected!");
//          return;
//       }

//       const handleIncomingCall = ({ senderId, recipientId, callType }) => {
//          console.log("Incoming call from:", senderId, recipientId);
//          if (recipientId === user?._id) {
//             setCallerId(senderId);
//             setCallType(callType);
//             setReceiverId(recipientId);
//          }
//       };

//       socket.on("incoming-call", handleIncomingCall);

//       return () => {
//          socket.off("incoming-call", handleIncomingCall);
//       };
//    }, [socket, socket?.connected]); // Depend only on `socket.connected`

//    const handleAccept = () => {
//       window.open(`/call/${callerId}?type=${callType}`, "_blank", "");
//       setCallerId(null);
//       setReceiverId(null);
//    };

//    const handleReject = () => {
//       setCallerId(null);
//    };

//    return (
//       <div>
//          {receiverId !== user?._id ? (
//             <></>
//          ) : (
//             <div className='fixed bottom-10 right-10 flex flex-col gap-3 z-50'>
//                <button
//                   onClick={handleAccept}
//                   className='flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition duration-300'>
//                   <PhoneCall className='custom-pulse-animation' size={20} /> Accept
//                </button>

//                <button
//                   onClick={handleReject}
//                   className='flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition duration-300'>
//                   <PhoneOff size={20} /> Reject
//                </button>
//             </div>
//          )}
//          <style>
//             {`
//             @keyframes customPulse {
//                0% { transform: scale(1); fill:white; }
//                50% { transform: scale(1.2);}
//                100% { transform: scale(1); fill:black; }
//             }

//             .custom-pulse-animation {
//                animation: customPulse 3s ease-in-out infinite;
//             }
//          `}
//          </style>
//       </div>
//    );
// };

// export default CallControl;

import { PhoneCall, PhoneOff } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import useSocket from "../../hooks/useSocket";
import { AuthContext } from "../../context/AuthProvider";

const CallControl = () => {
   const { user } = useContext(AuthContext);
   const socket = useSocket();
   const [callerId, setCallerId] = useState(null);
   const [callType, setCallType] = useState(null);
   const [incomingCall, setIncomingCall] = useState(false);
   const [callTimeout, setCallTimeout] = useState(null);

   useEffect(() => {
      if (!socket || !socket.connected) {
         console.error("Socket is not connected!");
         return;
      }

      const handleIncomingCall = ({ senderId, recipientId, callType }) => {
         if (recipientId === user?._id) {
            console.log("Incoming call from:", senderId);
            setCallerId(senderId);
            setCallType(callType);
            setIncomingCall(true);

            // Auto-reject call if no response in 30 seconds
            const timeout = setTimeout(() => {
               console.log("❌ Call timed out. Auto-rejecting...");
               handleReject();
               socket.emit("call-missed", { senderId, recipientId });
            }, 6000);

            setCallTimeout(timeout);
         }
      };

      socket.on("incoming-call", handleIncomingCall);

      return () => {
         socket.off("incoming-call", handleIncomingCall);
         if (callTimeout) clearTimeout(callTimeout); // Cleanup timeout on unmount
      };
   }, [socket, socket?.connected]);

   const handleAccept = () => {
      if (callTimeout) clearTimeout(callTimeout); // Clear timeout since user responded
      window.open(`/call/${callerId}?type=${callType}`, "_blank", "");
      setIncomingCall(false);
      socket.emit("call-accepted", { callerId, receiverId: user?._id });
   };

   const handleReject = () => {
      if (callTimeout) clearTimeout(callTimeout);
      setIncomingCall(false);
      socket.emit("call-rejected", { callerId, receiverId: user?._id });
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
