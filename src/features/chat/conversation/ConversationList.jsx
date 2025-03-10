import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import { MessageCircle, Phone, User } from "lucide-react";

const ConversationList = () => {
   const { setCurrentConversationId, currentConversationId, setCurrentConv, conversationList } = useContext(AuthContext);

   const [countIndex, setcountIndex] = useState(1);

   // active chat,call,contact button when clikedffor toggle
   const handleActive = (index) => {
      setcountIndex(() => index);
   };

   return (
      <div>
         {/* Chat,Call and Contact button here */}
         <div className='py-5 flex items-center gap-x-1 px-4'>
            <Link
               onClick={() => handleActive(1)}
               className={`flex items-center gap-1 transition duration-150 border-transparent border text-[12px] rounded-[50px] py-1 px-6 font-bold ${
                  countIndex === 1 ? "bg-blue-600 text-white" : "bg-[#d7dddd] text-black"
               }`}>
               <MessageCircle className='w-4 h-4 fill-current ' />
               Chat
            </Link>
            <Link
               onClick={() => handleActive(2)}
               className={`flex items-center gap-1 transition duration-150 border-transparent border text-[12px] rounded-[50px] py-1 px-6 font-bold ${
                  countIndex === 2 ? "bg-blue-600 text-white" : "bg-[#d7dddd] text-black"
               }`}>
               <Phone className='w-4 h-4 fill-current ' />
               Call
            </Link>
            <Link
               onClick={() => handleActive(3)}
               className={`flex items-center gap-1 transition duration-150 border-transparent border text-[12px] rounded-[50px] py-1 px-6 font-bold ${
                  countIndex === 3 ? "bg-blue-600 text-white" : "bg-[#d7dddd] text-black"
               }`}>
               <User className='w-4 h-4 fill-current ' />
               Contact
            </Link>
         </div>
         <div className='px-4'>
            {/*Conversation list*/}
            {conversationList?.length > 0 &&
               conversationList.map((item) => {
                  return (
                     <div
                        onClick={() => {
                           setCurrentConversationId(item.id);
                           setCurrentConv(item);
                        }}
                        key={item.id}
                        className={`flex justify-between py-3 my-2 px-4 items-center cursor-pointer transition duration-300 ${
                           item.id === currentConversationId ? "bg-blue-500 rounded-[4px]" : ""
                        }`}>
                        <div className='flex items-center'>
                           <img
                              src={`http://localhost:3000/uploads/avatar/${item.user?.avatar}`}
                              className='w-12 h-12 rounded-[50%] border-2 border-pink-500 inline mr-2'
                              alt=''
                           />

                           <div>
                              {" "}
                              <h6 className='text-[14px] font-bold text-[var(--text-color)] leading-[12px] mb-1'>
                                 {item.user?.name}
                              </h6>
                              <p className='text-[11px] text-[var(--text-color)]'>Can you here me..</p>
                           </div>
                        </div>

                        <div>
                           <h6 className='text-[12px] font-semibold text-[var(--text-color)] leading-[14px] mb-1.5 text-end'>
                              {new Date(item.last_updated).toLocaleDateString("en-US")}
                           </h6>
                           <p className='text-[12px] font-medium text-green-600 leading-[15px] text-end'>Recent</p>
                        </div>
                     </div>
                  );
               })}
         </div>
      </div>
   );
};

export default ConversationList;
