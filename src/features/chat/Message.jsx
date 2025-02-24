import SideMenue from "./SideMenue";
import ChatBoxTop from "./chatBox/ChatBoxTop";
import InputMessage from "./chatBox/InputMessage";
import Chat from "./chatBox/Chat";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { PlusCircleIcon } from "lucide-react";

const Message = () => {
   const { currentConversationId, showSideBar, handleModal } = useContext(AuthContext);

   return (
      <div className={`${showSideBar ? "md:grid md:grid-cols-12" : ""} gap-0`}>
         {/* Sidebar (1 column) */}
         <div className={`${showSideBar ? "block" : "hidden opacity-0"} transition duration-300 md:col-span-1 opacity-100`}>
            <SideMenue />
         </div>

         <div className={`md:col-span-11 md:grid md:grid-cols-12`}>
            <>
               <div
                  className={`${
                     showSideBar ? "md:col-span-3" : "md:col-span-4"
                  } border-none md:border-r border-indigo-100 bg-[var(--background-color)] overflow-y-auto h-screen conversation-scrollbar transition duration-200`}>
                  <Outlet />
               </div>

               <div
                  className={`${
                     showSideBar ? "md:col-span-9" : "md:col-span-8"
                  } p-5 md:p-[45px] bg-[var(--surface-color)] h-screen flex flex-col transition duration-200 relative`}>
                  {currentConversationId ? (
                     <>
                        {/* Chat Header */}
                        <div className='mb-2'>
                           <ChatBoxTop />
                        </div>

                        {/* Chat Messages */}
                        <div className='flex-1 overflow-y-auto overflow-x-hidden flex flex-col-reverse chatbox-scrollbar'>
                           <Chat />
                        </div>

                        {/* Message Input */}
                        <div className='mt-2'>
                           <InputMessage />
                        </div>
                     </>
                  ) : (
                     <>
                        <div className='flex justify-center items-center h-full'>
                           <PlusCircleIcon onClick={handleModal} className='w-10 h-10 text-black cursor-pointer relative z-20' />

                           <img
                              src='https://img.freepik.com/free-photo/young-women-showing-wechat-icon_53876-63460.jpg?t=st=1740417476~exp=1740421076~hmac=91cb980a4567a086171849d4a8c1fa9e7fa471b9eea3f7f4d1dfa481435081d2&w=996'
                              className='absolute top-0 left-0 w-full h-full object-cover z-0'
                              alt='Background'
                           />
                           <div
                              style={{
                                 background:
                                    "radial-gradient(circle, rgba(161,221,255,0.9) 20%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,1) 100%)",
                              }}
                              className='absolute left-0 top-0 w-full h-full z-10 '></div>
                        </div>
                     </>
                  )}
               </div>
            </>
         </div>
      </div>
   );
};

export default Message;
