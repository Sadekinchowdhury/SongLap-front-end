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
         setMessages([]); // Fallback to empty array if API call fails
      }
   };

   useEffect(() => {
      getMessages();
   }, [conversationid]); // Run effect when conversationid changes

   return (
      <div className='py-10 px-5'>
         {messages?.length > 0 ? (
            messages.map((msg, index) => (
               <div
                  key={index}
                  className={`flex items-start gap-4 mb-3 ${msg?.sender?.id === user?.userid ? "justify-end" : "justify-start"}`}>
                  {/* Show Avatar Only for Other Participants */}
                  {msg?.sender?.id !== user?.userid && (
                     <img
                        src={msg?.sender?.avatar || "/default-avatar.png"} // Fallback if avatar is missing
                        className='w-10 h-10 rounded-full border border-blue-700'
                        alt='User Avatar'
                     />
                  )}

                  {/* Message Bubble */}
                  <div
                     className={`max-w-[60%] px-4 py-2 rounded-lg text-[16px] text-gray-800 ${
                        msg?.sender?.id === user?.userid
                           ? "bg-blue-500 text-white rounded-br-[20px] rounded-tl-[20px]"
                           : "bg-yellow-400 text-gray-900 rounded-bl-[20px] rounded-tr-[20px]"
                     }`}>
                     <h5 className='font-semibold text-[14px]'>{msg?.sender?.name || "Unknown User"}</h5>

                     <p className='mt-1'>{msg?.text || "No message content"}</p>
                     <h6 className='text-[12px] text-gray-600 mt-1 text-right'>{msg?.time || "Unknown time"}</h6>
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
