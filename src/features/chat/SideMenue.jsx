import { useContext } from "react";
import ThemeToggle from "../theme/ToglleThem";
import { SideBarIcon } from "/src/features/chat/SideBarIcon.jsx";
import { AuthContext } from "../../context/AuthProvider";

import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";

const SideMenue = () => {
   const { user, handleLogOut } = useContext(AuthContext);
   return (
      <div
         className={` border-none md:border-r md:border-[#eff1f2] min-h-[100vh] max-h-[100vh] overflow-x-hidden overflow-y-scroll scrollbar-thin bg-[var(--background-color)] py-5 flex justify-between flex-col gap-y-4 `}>
         <div className=''>
            <div className='flex justify-center items-center border-b border-[#eff1f2] py-10'>
               <img
                  className='w-[50px] h-[50px] rounded-[50%] border-4 border-[var(--primary-color)]'
                  src={`http://localhost:3000/uploads/avatar/${user?.avatar}`}
                  alt=''
               />
            </div>
            <ul className='text-center'>
               {SideBarIcon.map((item) => {
                  return (
                     <>
                        <li className='mt-10'>
                           <Link to={item.path} key={item.name} className=''>
                              {item.icon}
                           </Link>
                        </li>
                     </>
                  );
               })}
            </ul>
         </div>
         <ul className='text-center'>
            <li className='cursor-pointer mt-10'>
               <ThemeToggle />
            </li>
            <li className='cursor-pointer mt-10'>
               <LogOut
                  onClick={handleLogOut}
                  className='w-10 h-10 inline-block p-3 bg-[#eff1f2] rounded-full transition duration-300 hover:bg-[#d3d8db]'
               />
            </li>
         </ul>
      </div>
   );
};

export default SideMenue;
