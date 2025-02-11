import SideMenue from "./SideMenue";
import Conversation from "./conversation/Conversation";
import ChatBoxTop from "./chatBox/ChatBoxTop";
import InputMessage from "./chatBox/InputMessage";
import Chat from "./chatBox/Chat";

const Message = () => {
   return (
      <div className=''>
         <div className='md:grid md:grid-cols-12 gap-0'>
            {/* Sidebar (1 column) */}
            <div className='md:col-span-1'>
               <SideMenue />
            </div>
            <div className='md:col-span-3 px-4 border-none md:border-r border-indigo-100 bg-[var(--background-color)] overflow-y-auto h-screen'>
               <Conversation />
            </div>
            {/* Chat Area (3 columns) */}
            <div className='md:col-span-8 p-5 md:p-[45px] overflow-y-auto bg-[var(--surface-color)]'>
               <ChatBoxTop />
               <Chat />
               <InputMessage />
            </div>
         </div>
      </div>
   );
};

export default Message;
