import SideMenue from "./SideMenue";
import ChatBoxTop from "./chatBox/ChatBoxTop";
import InputMessage from "./chatBox/InputMessage";
import Chat from "./chatBox/Chat";
import { Outlet } from "react-router-dom";

const Message = () => {
   return (
      <div className='md:grid md:grid-cols-12 gap-0'>
         {/* Sidebar (1 column) */}
         <div className='md:col-span-1'>
            <SideMenue />
         </div>

         <div className={`md:col-span-11 md:grid md:grid-cols-12`}>
            <>
               <div className='md:col-span-3 border-none md:border-r border-indigo-100 bg-[var(--background-color)] overflow-y-auto h-screen conversation-scrollbar'>
                  <Outlet />
               </div>

               <div className='md:col-span-9 p-5 md:p-[45px] bg-[var(--surface-color)] h-screen flex flex-col'>
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
               </div>
            </>
         </div>
      </div>
   );
};

export default Message;
