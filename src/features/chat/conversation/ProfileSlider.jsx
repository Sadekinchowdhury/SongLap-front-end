import Slider from "react-slick";
/*React Slick Slider css*/
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthProvider";

function ProfileSlider() {
   const { user } = useContext(AuthContext);
   const [users, setUsers] = useState([]);
   const settings = {
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
   };

   const getUsers = async () => {
      try {
         const respone = await fetch("http://localhost:3000/users", {
            method: "GET",
            credentials: "include",
         });
         const result = await respone.json();
         setUsers(result);
      } catch (err) {
         toast.error(err);
      }
   };

   useEffect(() => {
      getUsers();
   }, []);

   return (
      <div className='slider-container'>
         <Slider ref={(slider) => slider} {...settings}>
            {users
               ?.filter((item) => item._id !== user._id)
               .map((user) => {
                  return (
                     <div key={user._id} className='relative min-h-[100px]'>
                        <img
                           className='w-full max-h-[100px] h-full rounded-2xl object-cover absolute left-0 top-0 z-0'
                           src={
                              user.avatar
                                 ? `http://localhost:3000/uploads/avatar/${user?.avatar}`
                                 : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPl2SXEAHNjNUHu3W3m_LtVRChqnPK19A5_g&s"
                           }
                           alt=''
                        />
                        <div className='absolute bottom-[15px] right-[15px] w-[6px] h-[6px] rounded-[50%] bg-green-600'></div>
                        <p className='text-[10px] text-white absolute bottom-[10px] font-medium left-[5px]'>{user.name}</p>
                     </div>
                  );
               })}
         </Slider>
      </div>
   );
}
export default ProfileSlider;
