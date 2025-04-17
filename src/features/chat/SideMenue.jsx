import { useContext, useState } from "react";
import ThemeToggle from "../theme/ToglleThem";
import { SideBarIcon } from "/src/features/chat/SideBarIcon.jsx";
import { AuthContext } from "../../context/AuthProvider";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";

const SideMenue = () => {
   const { user, handleLogOut } = useContext(AuthContext);
   const [showborder, setShowBorder] = useState(1);
   return (
      <div
         className={`min-h-[100vh] max-h-[100vh] overflow-x-hidden overflow-y-scroll scrollbar-thin bg-[var(--background-color)] py-5 flex justify-between flex-col gap-y-4 `}>
         <div className=''>
            <div className='flex justify-center items-center  py-10'>
               <Link to={"/message/settings"}>
                  <img
                     className='w-[50px] h-[50px] rounded-[50%] border-4 border-[var(--primary-color)]'
                     src={`http://localhost:3000/uploads/avatar/${user?.avatar}`}
                     alt=''
                  />
               </Link>
            </div>
            <ul className='text-center'>
               {SideBarIcon.map((item) => {
                  return (
                     <li
                        key={item.id}
                        onClick={() => setShowBorder(item.id)}
                        className={`mt-10 ${showborder == item.id ? "border-r-2 border-r-blue-700" : ""}`}>
                        <Link to={item.path} key={item.name} className=''>
                           {item.icon}
                        </Link>
                     </li>
                  );
               })}
            </ul>
         </div>
         <ul className='text-center'>
            <li
               onClick={() => setShowBorder(6)}
               className={`cursor-pointer mt-10 ${showborder == 6 ? "border-r-2 border-r-blue-700" : ""}`}>
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
