import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthProvider";

const Chat = () => {
   const { user, conversationid } = useContext(AuthContext);
   const [messages, setMessages] = useState();

   const getMessages = async () => {
      try {
         if (conversationid) {
            let response = await fetch(`http://localhost:3000/inbox/message/${conversationid}`, {
               method: "GET",
               credentials: "include",
            });
            let result = await response.json();

            // Ensure messages is always an array
            setMessages(result?.data || []);
            console.log(result.data);
         }
      } catch (err) {
         console.log("Error fetching messages:", err);
         setMessages([]);
      }
   };

   useEffect(() => {
      getMessages();
   }, [conversationid]);

   return (
      <div className='py-10 px-5'>
         {messages?.length > 0 ? (
            messages.map((msg, index) => (
               <div
                  key={index}
                  className={`flex  gap-4 mb-3 ${
                     msg?.sender?.id === user?.userid ? "justify-end items-end text-right" : "justify-start items-start text-left"
                  }`}>
                  <div className={`max-w-[70%]`}>
                     <div className={`${msg?.sender?.id === user?.userid ? "text-left" : "text-right flex"}`}>
                        {" "}
                        {msg?.sender?.id !== user?.userid && (
                           <img
                              src={`http://localhost:3000/uploads/avatar/${msg.sender.avatar}`}
                              className='w-10 h-10 mr-2 rounded-full border border-blue-700'
                              alt='User Avatar'
                           />
                        )}
                        <div
                           className={`px-4 py-2 my-2 rounded-lg text-[16px] text-gray-800 ${
                              msg?.sender?.id === user?.userid
                                 ? "bg-blue-500 text-white rounded-br-[20px] rounded-tl-[20px] self-end text-right"
                                 : "bg-yellow-500 text-gray-900 rounded-bl-[20px] rounded-tr-[20px] self-start text-left"
                           }`}>
                           <h5 className={`font-semibold text-[16px] leading-[28px]`}>{msg?.sender?.name || "Unknown"}</h5>
                           <p className={`text-[13px] leading-[16px]`}>{msg?.text || "No message content"}</p>
                           <h6 className='text-[13px] leading-[26px] font-semibold'>{msg?.time || "Unknown time"}</h6>
                        </div>
                     </div>
                     <div className='w-full'>
                        {msg?.attachment && (
                           <img
                              src={`http://localhost:3000${msg.attachment}`}
                              className='max-w-[250px] h-[200px] object-cover rounded-lg shadow-md'
                              alt='Attachment'
                           />
                        )}
                     </div>
                  </div>
               </div>
            ))
         ) : (
            <p className='text-center text-gray-500'>No messages yet.</p>
         )}
      </div>
   );
};

export default Chat;
