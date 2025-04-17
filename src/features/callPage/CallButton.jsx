import { Phone, VideoIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { data, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import useSocket from "../../hooks/useSocket";
import { BroadcastChannel } from "broadcast-channel";

const CallButton = () => {
   const socket = useSocket();
   const { user, currentConv } = useContext(AuthContext);
   const userId = currentConv.user.id;
   const [data, setData] = useState(null);
   // Inside your handleCall function:
   const channel = new BroadcastChannel("call_channel");

   const handleCall = (callType) => {
      if (socket) {
         fetch("http://localhost:3000/call", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
               conversationId: currentConv.id,
               sender: {
                  id: user._id,
                  name: user.name,
                  avatar: user.avatar,
               },
               receiver: {
                  id: currentConv.user.id,
                  name: currentConv.user.name,
                  avatar: currentConv.user.avatar,
               },
               callDuration: "",
               callStatus: "missed",
               startTime: Date.now(),
               callType: callType,
               endTime: null,
            }),
         })
            .then((res) => res.json())
            .then((data) => {
               socket.emit("call-request", { senderId: user?._id, recipientId: userId, callType, callId: data.callDetails?._id });

               const url = `/call/${userId}?type=${callType}`;

               const callWindow = window.open(url, "_blank", "");

               if (callWindow) {
                  setTimeout(() => {
                     channel.postMessage({
                        type: "call-data",
                        callId: data.callDetails._id,
                        senderId: user._id,
                        recipientId: userId,
                     });
                  }, 500);
               } else {
                  console.error("Popup blocked!");
               }
            })
            .catch((err) => console.error("Error starting call:", err));
      }
   };

   return (
      <div className='flex items-center'>
         <Link onClick={() => handleCall("audio")} className='cursor-pointer'>
            <Phone className='fill-[var(--text-color)] w-5 h-5 outline-none hover:fill-blue-600 ' />
         </Link>

         <Link onClick={() => handleCall("video")} className='cursor-pointer'>
            <VideoIcon className='fill-[var(--text-color)] w-5 h-5 ml-3 outline-none hover:fill-blue-600 border-none' />
         </Link>
      </div>
   );
};

export default CallButton;
