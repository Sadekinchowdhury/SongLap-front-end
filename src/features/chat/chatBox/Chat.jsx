import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import useSocket from "../../../hooks/useSocket";

const Chat = () => {
   const socket = useSocket();
   const { user, currentConversationId } = useContext(AuthContext);

   const [messages, setMessages] = useState([]);

   useEffect(() => {
      if (!socket || !currentConversationId) return;

      // Join Conversation
      socket.emit("joinConversation", currentConversationId);

      // Listen for Messages
      socket.on("message", (msg) => {
         setMessages((prev) => [...prev, msg.data]);
      });
      socket.on("messageDeleted", (msgId) => {
         setMessages((prevMessages) => prevMessages.filter((msg) => msg._id !== msgId.msgId));
      });

      // Fetch Message History
      getMessages();

      // Cleanup Socket Listener
      return () => {
         socket.off("message");
         socket.off("messageDeleted");
      };
   }, [socket, currentConversationId]);

   const getMessages = async () => {
      try {
         if (currentConversationId) {
            let response = await fetch(`http://localhost:3000/inbox/message/${currentConversationId}`, {
               method: "GET",
               credentials: "include",
            });
            let result = await response.json();

            // Ensure messages is always an array
            setMessages(result.data || []);
            console.log(result.data, "api data");
         }
      } catch (err) {
         console.log("Error fetching messages:", err);
         setMessages([]);
      }
   };

   const deleteMessage = async (msgConversationId, msgId) => {
      try {
         const response = await fetch(
            `http://localhost:3000/inbox/message/delete?msgConversationId=${msgConversationId}&msgId=${msgId}`,
            {
               method: "DELETE",
               credentials: "include",
               headers: {
                  "Content-Type": "application/json",
               },
            }
         );

         const result = await response.json();
      } catch (error) {
         console.error("Error during deletion:", error);
      }
   };

   return (
      <div className='py-10'>
         {user?._id && messages?.length > 0 ? (
            messages
               .filter((msg) => msg.conversation_id === currentConversationId)
               .map((msg, index) =>
                  currentConversationId === msg.conversation_id ? (
                     <div
                        key={index}
                        className={`flex gap-4  mb-3 ${
                           user._id === msg.sender.id ? "justify-end items-end text-right" : "justify-start items-start text-left"
                        }`}>
                        <div className={`max-w-[70%] relative group`}>
                           <div className={`${msg.sender.id === user._id ? "text-left" : "text-right flex"}`}>
                              {" "}
                              {msg.sender.id !== user._id && (
                                 <img
                                    src={`http://localhost:3000/uploads/avatar/${msg.sender?.avatar}`}
                                    className='w-10 h-10 mr-2 rounded-full border border-blue-700'
                                    alt='User Avatar'
                                 />
                              )}
                              {msg.text ? (
                                 <div
                                    className={`px-4 py-2 my-2 rounded-lg text-[16px]  text-gray-800 ${
                                       msg.sender.id === user._id
                                          ? "bg-blue-500 text-white rounded-br-[20px] rounded-tl-[20px] self-end text-right"
                                          : "bg-yellow-500 text-gray-900 rounded-bl-[20px] rounded-tr-[20px] self-start text-left"
                                    }`}>
                                    <h5 className={`font-semibold text-[16px] leading-[28px]`}>{msg.sender.name}</h5>
                                    <p className={`text-[13px] leading-[16px]`}>{msg?.text}</p>
                                    <h6 className='text-[13px] leading-[26px] font-semibold'>
                                       {`${
                                          msg.updatedAt
                                             ? (new Date(msg?.updatedAt).getHours() % 12 || 12).toString().padStart(2, "0")
                                             : "00"
                                       }:${
                                          msg.updatedAt ? new Date(msg.updatedAt).getMinutes().toString().padStart(2, "0") : "00"
                                       } ${msg.updatedAt ? (new Date(msg.updatedAt).getHours() >= 12 ? "PM" : "AM") : ""}`}
                                    </h6>
                                 </div>
                              ) : (
                                 <></>
                              )}
                           </div>
                           <div className='w-full'>
                              {msg.attachment && (
                                 <img
                                    src={`http://localhost:3000${msg.attachment}`}
                                    className='max-w-[250px] h-[200px] object-cover rounded-lg shadow-md'
                                    alt='Attachment'
                                 />
                              )}
                           </div>
                           {user?._id == msg.sender.id ? (
                              <div className='absolute bottom-0 right-2 hidden group-hover:flex flex-col items-center'>
                                 <button
                                    onClick={() => deleteMessage(currentConversationId, msg._id)}
                                    className='p-1 bg-gray-200 rounded-full hover:bg-red-500 hover:text-white transition relative group'>
                                    delete &#x22EE;
                                 </button>
                              </div>
                           ) : (
                              <></>
                           )}
                        </div>
                     </div>
                  ) : (
                     <></>
                  )
               )
         ) : (
            <></>
         )}
      </div>
   );
};

export default Chat;
