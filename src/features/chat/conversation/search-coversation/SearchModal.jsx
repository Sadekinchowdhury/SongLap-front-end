import { useContext, useState } from "react";
import { AuthContext } from "../../../../context/AuthProvider";

const SearchModal = ({ handleModal }) => {
   const { conv, setConv } = useContext(AuthContext);
   const [userInput, setUserInput] = useState("");
   const [typingTimout, setTypingTimeOut] = useState(null);
   const [user, setUser] = useState();
   // Handle key up event
   const handleKeyUp = () => {
      clearTimeout(typingTimout);

      let timeout = setTimeout(() => {
         handleSubmit();
      }, 2000);
      setTypingTimeOut(timeout);
   };

   // Handle input value change
   const handleInputChange = (e) => {
      setUserInput(e.target.value);
   };

   // Fetch users from search
   const handleSubmit = async () => {
      if (!userInput.trim()) return; // ✅ Prevent empty requests
      try {
         const response = await fetch("http://localhost:3000/users/search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userInput }),
            credentials: "include",
         });

         const data = await response.json();
         setUser(data.data || []);
      } catch (error) {
         console.error("Error fetching data:", error);
      }
   };

   // Add Conversation
   const addConversation = async (participant_id, name, avatar) => {
      // cheack participant id
      if (!participant_id) {
         console.error("Error: participant_id is missing!");
         return;
      }

      try {
         const response = await fetch("http://localhost:3000/inbox/add-conversation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ participant_id, name, avatar }),
            credentials: "include",
         });

         const data = await response.json();

         if (data.success) {
            setConv(!conv);
         }
      } catch (error) {
         console.error("Error fetching data:", error);
      }
   };

   return (
      <div id='modal-background' className='fixed inset-0 flex items-center justify-center bg-black/50'>
         <div className='bg-white dark:bg-gray-800 p-6 rounded-lg w-96 shadow-lg'>
            <div className='flex justify-between items-center'>
               <h2 className='text-lg font-semibold text-gray-900 dark:text-white'>Search Friends</h2>
               <button
                  onClick={handleModal}
                  className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'>
                  ✕
               </button>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
               <input
                  className='mt-3 w-full p-2 border rounded-md outline-none text-gray-900 dark:text-white dark:bg-gray-700'
                  type='text'
                  name='userInput'
                  value={userInput}
                  onChange={handleInputChange}
                  onKeyUp={handleKeyUp}
                  placeholder='Type a name...'
               />
            </form>
            <div onClick={handleModal} className='mt-4 space-y-2'>
               {user?.map((item) => {
                  return (
                     <div
                        onClick={() => addConversation(item?._id, item.name, item.avatar)}
                        key={item._id}
                        className='flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700'>
                        <img src={item?.avatar} alt={item?.name} className='w-8 h-8 rounded-full' />
                        <p className='text-gray-800 dark:text-white'>{item?.name}</p>
                     </div>
                  );
               })}
            </div>
         </div>
      </div>
   );
};

export default SearchModal;
