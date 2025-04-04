import { Bell, Heart, Star } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthProvider";

const Profile = ({ handleShowProfile }) => {
   const { currentConv, setCurrentConv, user } = useContext(AuthContext);
   const [isFavourite, setIsFavourite] = useState(false);

   const handleFavourite = () => {
      setIsFavourite(!isFavourite);
      toggleFavourite();
   };

   // Function to toggle favourite status
   const toggleFavourite = async () => {
      try {
         const response = await fetch(`http://localhost:3000/inbox/conversation/${currentConv?.id}`, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               isFavourite: !isFavourite,
               creatorId: user?._id,
               name: currentConv.user.name,
               avatar: currentConv.user.avatar,
            }),
            credentials: "include",
         });

         const result = await response.json();

         setCurrentConv((prev) => ({
            ...prev,
            conversation: {
               ...prev.conversation,
               favourite: {
                  ...prev.conversation?.favourite, // Ensure existing favourite fields are not lost
                  isFavourite: result?.conversation?.favourite.isFavourite,
               },
            },
         }));
      } catch (error) {
         console.error("Error:", error);
      }
   };

   return (
      <div className=''>
         <div className='relative z-20'>
            <button onClick={handleShowProfile} className='text-2xl font-bold text-[var(--text-color)]'>
               X
            </button>
            <div className='flex justify-center items-center text-center p-10 border-b-0 border-gray-100'>
               <div>
                  <img
                     src={`http://localhost:3000/uploads/avatar/${currentConv?.user.avatar}`}
                     className='w-72 h-72 rounded-full border border-gray-300 object-cover'
                     alt='Profile Image'
                  />
                  <h4 className='pt-7 pb-2 text-xl leading-10 text-[var(--text-color)]'>{currentConv?.user.name}</h4>
                  <p className='text-[16px] font-normal leading-1.5 text-[var(--text-color)]'>Welcome to my home</p>
               </div>
            </div>
            <div>
               <div className='flex items-center justify-between py-4 mt-5 border-b border-t border border-gray-300 px-4 rounded-sm shadow-md'>
                  <div className='flex items-center gap-x-5'>
                     <Star className='fill-current w-4 h-4 text-[var(--text-color)]' />
                     <span className='text-[17px] leading-4 text-[var(--text-color)]'>Add Favourite</span>
                  </div>
                  <Heart
                     className={`cursor-pointer ${
                        currentConv?.conversation.favourite.isFavourite ? "text-red-500 fill-red-500" : "text-[var(--text-color)]"
                     }`}
                     onClick={handleFavourite}
                  />
               </div>
               <div className='flex items-center justify-between py-4 mt-5 border-b border-t border border-gray-300 px-4 rounded-sm shadow-2xl'>
                  <div className='flex items-center gap-x-5'>
                     <Bell className='fill-current w-4 h-4 text-[var(--text-color)]' />
                     <span className='text-[17px] leading-4 text-[var(--text-color)]'>Mute Your Friend</span>
                  </div>
                  <Bell className='cursor-pointer text-[var(--text-color)]' />
               </div>
            </div>
         </div>
         <img
            className='absolute top-0 left-0 w-full h-full object-cover opacity-10 z-10'
            src={`http://localhost:3000/uploads/avatar/${currentConv?.user.avatar}`}
            alt=''
         />
      </div>
   );
};

export default Profile;
