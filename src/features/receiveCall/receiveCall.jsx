import { useContext, useEffect, useState } from "react";
import { PhoneCall, PhoneOff } from "lucide-react";

import { AuthContext } from "../../context/AuthProvider";
import useSocket from "../../hooks/useSocket";

const ReceiveCall = () => {
   const socket = useSocket();
   const { user } = useContext(AuthContext);
   const [callerId, setCallerId] = useState(null);

   useEffect(() => {
      if (socket) {
         socket.on("joinconversationId", (conversationId) => {
            console.log("conversationid", conversationId);
            setCallerId(conversationId);
         });
      }
   }, [callerId, socket]);

   const handleAccept = () => {
      window.open(`/call/${callerId}`, "_blank", "");
      setCallerId(null);
   };

   const handleReject = () => {
      setCallerId(null);
   };

   return (
      <>
         {callerId === user?._id && (
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
                  50% { transform: scale(1.2);}
                  100% { transform: scale(1); fill:black; }
               }

               .custom-pulse-animation {
                  animation: customPulse 3s ease-in-out infinite;
               }
            `}
         </style>
      </>
   );
};

export default ReceiveCall;
