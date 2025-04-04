import { Phone, VideoIcon } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import useSocket from "../../hooks/useSocket";

const CallButton = () => {
   const socket = useSocket();
   const { user, currentConv } = useContext(AuthContext);
   const userId = currentConv.user.id;

   const handleCall = (callType) => {
      if (socket) {
         socket.emit("call-request", { senderId: user?._id, recipientId: userId, callType });
      }
      const url = `/call/${userId}?type=${callType}`;

      const callWindow = window.open(url, "_blank", "");

      if (!callWindow) {
         console.error("Popup blocked!");
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
