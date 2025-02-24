import SideMenue from "./SideMenue";
import ChatBoxTop from "./chatBox/ChatBoxTop";
import InputMessage from "./chatBox/InputMessage";
import Chat from "./chatBox/Chat";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const Message = () => {
   const { currentConversationId, showSideBar } = useContext(AuthContext);

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
                  } p-5 md:p-[45px] bg-[var(--surface-color)] h-screen flex flex-col transition duration-200`}>
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
                        <div className=' flex justify-center items-center h-full'>
                           <h3 className='text-center'>Add User</h3>
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
