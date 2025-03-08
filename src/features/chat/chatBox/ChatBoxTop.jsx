import { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import { Phone, VideoIcon, EllipsisIcon } from "lucide-react";
import useSocket from "../../../hooks/useSocket";

const ChatBoxTop = ({ handleShowProfile }) => {
   const { currentConv } = useContext(AuthContext);
   const socket = useSocket();

   const handleCall = async () => {
      if (socket) {
         socket.emit("converSationId", currentConv?.user.id);
      }
   };

   return (
      <div className='sticky top-2 grid grid-cols-2 bg-[var(--background-color)] rounded-2xl p-3'>
         <div onClick={() => handleShowProfile(currentConv)} className='flex py-4 items-center gap-x-3 cursor-pointer'>
            <div>
               <img
                  src={`http://localhost:3000/uploads/avatar/${currentConv?.user.avatar}`}
                  className='w-14 h-14 rounded-[50%] border-2 border-pink-500'
                  alt=''
               />
            </div>
            <div>
               <h6 className='text-[18px] font-bold text-[var(--text-color)] leading-[18px] mb-1.5'>{currentConv?.user.name}</h6>
               <p className='text-[13px] font-medium text-[var(--text-color)] leading-[12px]'>Active</p>
            </div>
         </div>
         <div className='justify-self-end flex items-center gap-4'>
            <a onClick={handleCall} href={`/call/${currentConv?.user.id}`} target='_blank' rel='noopener noreferrer'>
               <Phone className='fill-[var(--text-color)] w-5 h-5 outline-none ' />
            </a>
            <a
               onClick={handleCall}
               href={`/call/${currentConv?.user.id}`}
               className='text-white'
               target='_blank'
               rel='noopener noreferrer'>
               <VideoIcon className='fill-[var(--text-color)] w-5 h-5' />
            </a>
            <a>
               <EllipsisIcon className='fill-white text-white transform rotate-90' />
            </a>
         </div>
      </div>
   );
};

export default ChatBoxTop;
