import { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import { EllipsisIcon } from "lucide-react";
import CallButton from "../../callPage/CallButton";
import { Link } from "react-router-dom";

const ChatBoxTop = ({ handleShowProfile }) => {
   const { currentConv } = useContext(AuthContext);

   // const handleCall = (callDetails) => {
   //    if (!callDetails?.callId) return;

   //    // Emit socket event
   //    if (socket) {
   //       socket.emit("startCall", {
   //          conversationId: currentConv?.id,
   //          id: callDetails?._id,
   //          callUid: callDetails.callId,
   //          receiverId: currentConv?.user.id,
   //          callType: callType,
   //       });
   //    }

   //    // Open call window
   //    window.open(`http://localhost:5173/call/${callDetails.callId}`, "_blank");
   // };

   // useEffect(() => {
   //    if (!callType) return; // Prevent running on mount

   //    const startNewCall = async () => {
   //       try {
   //          const callData = {
   //             conversationId: currentConv?.id,
   //             sender: {
   //                name: user.name,
   //                id: user?._id,
   //                avatar: user?.avatar,
   //             },
   //             receiver: {
   //                name: currentConv?.user.name,
   //                id: currentConv?.user?.id,
   //                avatar: currentConv?.user?.avatar,
   //             },
   //             callType,
   //             startTime: new Date().toISOString(),
   //          };

   //          const response = await fetch(`http://localhost:3000/call/${currentConv?.user.id}`, {
   //             method: "POST",
   //             credentials: "include",
   //             headers: { "Content-Type": "application/json" },
   //             body: JSON.stringify(callData),
   //          });

   //          const result = await response.json();

   //          if (response.ok) {
   //             handleCall(result.callDetails);
   //          } else {
   //             toast.error(result.error || "Failed to start call.");
   //          }
   //       } catch (err) {
   //          toast.error("An error occurred while starting the call.", err);
   //       }
   //    };

   //    startNewCall();
   // }, [isCall]);

   return (
      <div className='sticky top-2 grid grid-cols-2 bg-[var(--background-color)] rounded-2xl p-3'>
         <div onClick={() => handleShowProfile(currentConv)} className='flex py-4 items-center gap-x-3 cursor-pointer'>
            <div>
               <img
                  src={`http://localhost:3000/uploads/avatar/${currentConv?.user.avatar}`}
                  className='w-14 h-14 rounded-[50%] border-2 border-pink-500 object-cover'
                  alt=''
               />
            </div>
            <div>
               <h6 className='text-[18px] font-bold text-[var(--text-color)] leading-[18px] mb-1.5'>{currentConv?.user.name}</h6>
               <p className='text-[13px] font-medium text-[var(--text-color)] leading-[12px]'>Active</p>
            </div>
         </div>
         <div className='justify-self-end flex items-center 0'>
            <CallButton />
            <Link>
               <EllipsisIcon className='fill-white text-[var--(text-color)] ml-3 transform rotate-90 outline-none hover:fill-blue-600' />
            </Link>
         </div>
      </div>
   );
};

export default ChatBoxTop;
