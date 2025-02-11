import { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";

const Chat = () => {
   const { user } = useContext(AuthContext);
   const getMessage = async (conversation_id) => {
      try {
         let response = await fetch(`http://localhost:3000/inbox/message/${conversation_id}`, {
            method: "GET",
            credentials: "include",
         });
         let result = await response.json();
         console.log(result?.data);
      } catch (err) {
         console.log(err);
      }
   };
   return (
      <>
         <div className='py-10'>
            <div className='flex gap-x-4'>
               <img src={user.avatar} className='w-10 h-10 rounded-full border border-blue-700' alt='' />
               <div>
                  <h5 className='inline-block pr-5 font-semibold text-[16px] leading-[16px] text-[var(--text-color)]'>
                     {user.name}
                  </h5>
                  <h6 className='inline-block text-[12px] text-[var(--text-color)] font-normal'>01:55 pm</h6>
                  <ul className='mt-4'>
                     <li className='bg-yellow-400 text-[16px] text-gray-800 py-2 px-3 rounded-bl-[20px] rounded-tr-[20px] my-2'>
                        my name is sadekin
                     </li>
                     <li className='bg-yellow-400 text-[16px] text-gray-800 py-2 px-3 rounded-bl-[20px] rounded-tr-[20px] my-2'>
                        my name is sadekin chowhdury
                     </li>
                     <li className='bg-yellow-400 text-[16px] text-gray-800 py-2 px-3 rounded-bl-[20px] rounded-tr-[20px] my-2'>
                        The imagin of the nation
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </>
   );
};

export default Chat;
