import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import useSocket from "../../../hooks/useSocket";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const Chat = () => {
   const socket = useSocket();
   const { user, currentConversationId } = useContext(AuthContext);
   const dropdownRef = useRef();

   const [messages, setMessages] = useState([]);

   const [options, setOptions] = useState(false);

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

   useEffect(() => {
      const handleClickOutside = (event) => {
         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setOptions(false);
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

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
                                    className='w-10 h-10 mr-2 rounded-full border border-blue-700 object-cover'
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
                                 <PhotoProvider>
                                    <PhotoView src={`http://localhost:3000${msg.attachment}`}>
                                       <img
                                          src={`http://localhost:3000${msg.attachment}`}
                                          alt='Thumbnail'
                                          className='max-w-[250px] h-[200px] object-cover rounded-lg shadow-md'
                                       />
                                    </PhotoView>
                                 </PhotoProvider>
                              )}
                           </div>
                           {user?._id == msg.sender.id && (
                              <div className='absolute top-1 right-2 group' ref={dropdownRef}>
                                 <div
                                    onClick={() => setOptions(!options)}
                                    className='text-[20px] text-white rotate-90 cursor-pointer select-none hidden group-hover:block'>
                                    &#x22EE;
                                 </div>
                                 {options && (
                                    <div className='bg-white w-[250px] absolute top-6 right-0 p-2 rounded-xl shadow-xl z-50'>
                                       <ul className='space-y-1'>
                                          <li>
                                             <button
                                                onClick={() => editMessage(currentConversationId, msg._id)}
                                                className='w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-blue-100 transition text-sm text-gray-700 hover:text-blue-600'>
                                                ✏️ Edit
                                             </button>
                                          </li>
                                          <li>
                                             <button
                                                onClick={() => deleteMessage(currentConversationId, msg._id)}
                                                className='w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-red-100 transition text-sm text-gray-700 hover:text-red-600'>
                                                🗑️ Delete
                                             </button>
                                          </li>
                                          <li>
                                             <button
                                                onClick={() => forwardMessage(currentConversationId, msg._id)}
                                                className='w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-green-100 transition text-sm text-gray-700 hover:text-green-600'>
                                                📤 Forward
                                             </button>
                                          </li>
                                          <li>
                                             <button
                                                onClick={() => replyMessage(currentConversationId, msg._id)}
                                                className='w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-purple-100 transition text-sm text-gray-700 hover:text-purple-600'>
                                                💬 Reply
                                             </button>
                                          </li>
                                       </ul>
                                    </div>
                                 )}
                              </div>
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
