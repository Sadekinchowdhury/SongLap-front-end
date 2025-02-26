import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Heart } from "lucide-react";

const Favourite = () => {
   const { user } = useContext(AuthContext);
   const [favouriteUser, setFavouriteUser] = useState();
   const getFavouriteConversation = async () => {
      try {
         const response = await fetch("http://localhost:3000/inbox/conversation/favourite", {
            method: "GET",
            credentials: "include",
         });

         const result = await response.json();

         setFavouriteUser(result);
      } catch (err) {
         console.log(err);
      }
   };

   useEffect(() => {
      getFavouriteConversation();
   }, []);
   console.log(favouriteUser);
   return (
      <div>
         <div className='py-10 px-3'>
            {favouriteUser?.map((fav) => {
               return (
                  <div key={fav?._id} className='flex items-center justify-between my-4 '>
                     <div className='flex items-center gap-x-4'>
                        <img
                           src={`http://localhost:3000/uploads/avatar/${fav?.favourite.avatar || ""}`}
                           className='w-12 h-12 object-cover'
                           alt=''
                        />
                        <div>
                           <h4 className='text-xl leading-7'>{fav?.favourite.name}</h4>
                           <p className='text-[12px]'>United State</p>
                        </div>
                     </div>
                     <div>
                        <Heart className={`${fav?.favourite.isFavourite ? "text-red-500 fill-red-500" : "text-gray-500"}`} />
                     </div>
                  </div>
               );
            })}
         </div>
      </div>
   );
};

export default Favourite;
