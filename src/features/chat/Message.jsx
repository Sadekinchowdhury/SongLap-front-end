import SideMenue from "./SideMenue";
import Conversation from "./conversation/Conversation";
import ChatBoxTop from "./chatBox/ChatBoxTop";
import InputMessage from "./chatBox/InputMessage";
import Chat from "./chatBox/Chat";

const Message = () => {
   return (
      <div className='md:grid md:grid-cols-12 gap-0'>
         {/* Sidebar (1 column) */}
         <div className='md:col-span-1'>
            <SideMenue />
         </div>
         <div className='md:col-span-3 px-4 border-none md:border-r border-indigo-100 bg-[var(--background-color)] overflow-y-auto h-screen conversation-scrollbar'>
            <Conversation />
         </div>

         <div className='md:col-span-8 p-5 md:p-[45px] bg-[var(--surface-color)] h-screen flex flex-col'>
            {/* Chat Header - Stays at the top */}
            <div className='mb-2'>
               <ChatBoxTop />
            </div>

            {/* Chat Messages - Takes remaining space and is scrollable */}
            <div className='flex-1 overflow-y-auto overflow-x-hidden flex flex-col-reverse chatbox-scrollbar'>
               <Chat />
            </div>

            {/* Message Input - Stays at the bottom */}
            <div className='mt-2'>
               <InputMessage />
            </div>
         </div>
      </div>
   );
};

export default Message;
