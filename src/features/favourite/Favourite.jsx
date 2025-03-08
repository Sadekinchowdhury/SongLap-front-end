import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Heart } from "lucide-react";

const Favourite = () => {
   const { user } = useContext(AuthContext);
   const [favouriteUser, setFavouriteUser] = useState(null); // Initialize as null to avoid mapping on undefined
   const [conversation, setConversation] = useState([]);

   const [isFavourite, setIsFavourite] = useState(false);

   const handleFavourite = async (currentId, participant) => {
      await toggleFavourite(currentId, participant);
   };

   // Function to toggle favourite status
   const toggleFavourite = async (currentId, participant) => {
      try {
         // Find the conversation in state to get the latest isFavourite value
         const conversationToUpdate = conversation.find((conv) => conv._id === currentId);
         if (!conversationToUpdate) return;

         const updatedFavouriteStatus = !conversationToUpdate.favourite?.isFavourite;

         const response = await fetch(`http://localhost:3000/inbox/conversation/${currentId}`, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               isFavourite: updatedFavouriteStatus,
               creatorId: user?._id,
               name: participant?.name,
               avatar: participant?.avatar,
            }),
            credentials: "include",
         });

         const result = await response.json();

         // Update state based on API response
         setConversation((prev) =>
            prev.map((conv) =>
               conv._id === currentId
                  ? { ...conv, favourite: { ...conv.favourite, isFavourite: result.conversation.favourite.isFavourite } }
                  : conv
            )
         );
      } catch (error) {
         console.error("Error:", error);
      }
   };

   const getFavouriteConversation = async () => {
      try {
         const response = await fetch("http://localhost:3000/inbox/conversation/favourite", {
            method: "GET",
            credentials: "include",
         });

         const result = await response.json();
         setConversation(result);
         setFavouriteUser(result);
      } catch (err) {
         console.error("Error fetching favorite conversations:", err);
      }
   };

   useEffect(() => {
      getFavouriteConversation();
   }, []);

   if (!favouriteUser) return <p>Loading...</p>; // Prevents mapping on undefined data

   return (
      <div>
         {/* Search Input */}
         <div className='py-7 px-3 border-b border-gray-200'>
            <input
               type='text'
               placeholder='Your favourite user...'
               className='p-3 h-9 px-3 outline-none
                bg-[var(--background-color)] shadow-sm rounded-sm w-full'
            />
         </div>

         {/* Render All Conversations */}
         {conversation.length > 0 && (
            <div className='py-6 px-3 border-b border-gray-200'>
               {conversation
                  ?.filter((item) => item.favourite.isFavourite === false) // Keep only non-favourite items
                  .filter((item) => item.creator.id === user._id || item.participant.id === user._id) // Ensure user is part of the conversation
                  .map((item) => {
                     const chatUser = item.creator.id === user._id ? item.participant : item.creator; // Get the other user

                     return (
                        <div key={item?._id} className='flex items-center justify-between my-4  transition-all duration-300'>
                           <div className='flex items-center gap-x-4'>
                              <img
                                 src={`http://localhost:3000/uploads/avatar/${chatUser?.avatar || ""}`}
                                 className='w-12 h-12 object-cover'
                                 alt='User Avatar'
                              />
                              <div>
                                 <h4 className='text-xl leading-7 text-[var(--text-color)]'>{chatUser?.name}</h4>
                                 <p className='text-[12px] text-[var(--text-color)]'>United States</p>
                              </div>
                           </div>
                           <div>
                              <Heart onClick={() => handleFavourite(item._id, item)} className='text-gray-500 cursor-pointer' />
                           </div>
                        </div>
                     );
                  })}
            </div>
         )}

         {/* Render Favourite Conversations */}
         <div className='py-6 px-3'>
            {conversation
               .filter((item) => item.favourite.isFavourite === true)
               .map((item) => {
                  const favoriteUser = item.creator.id === user._id ? item.participant : item.creator;

                  return (
                     // ✅ Ensure the component is returned
                     <div key={item._id} className='flex items-center justify-between my-4 transition-all duration-300'>
                        <div className='flex items-center gap-x-4'>
                           <img
                              src={`http://localhost:3000/uploads/avatar/${favoriteUser?.avatar || ""}`}
                              className='w-12 h-12 object-cover'
                              alt='Favourite User Avatar'
                           />
                           <div>
                              <h4 className='text-xl leading-7 text-[var(--text-color)]'>{favoriteUser.name}</h4>
                              <p className='text-[12px] text-[var(--text-color)]'>United States</p>
                           </div>
                        </div>
                        <div>
                           <Heart
                              onClick={() => handleFavourite(item._id, item)}
                              className={
                                 item.favourite?.isFavourite
                                    ? "text-red-500 fill-red-500 cursor-pointer"
                                    : "text-gray-500 cursor-pointer"
                              }
                           />
                        </div>
                     </div>
                  );
               })}
         </div>
      </div>
   );
};

export default Favourite;
