import { useContext } from "react";
import ThemeToggle from "../theme/ToglleThem";
import { SideBarIcon } from "/src/features/chat/SideBarIcon.jsx";
import { AuthContext } from "../../context/AuthProvider";

const SideMenue = () => {
   const { user } = useContext(AuthContext);
   return (
      <div className='border-none md:border-r md:border-[#eff1f2] min-h-[100vh] max-h-[100vh] overflow-x-hidden overflow-y-scroll scrollbar-thin bg-[var(--background-color)] py-5 flex justify-between flex-col gap-y-4 '>
         <div className='border-b border-[#eff1f2] py-10'>
            <div className='flex justify-center items-center'>
               <img
                  className='w-[50px] h-[50px] rounded-[50%] border-4 border-[var(--primary-color)]'
                  src={`http://localhost:3000/uploads/avatar/${user.avatar}`}
                  alt=''
               />
            </div>
         </div>
         <div>
            <ul>
               {SideBarIcon.map((item) => {
                  return (
                     <li key={item.name} className='py-4 cursor-pointer'>
                        <div className='flex justify-center items-center'>{item.icon}</div>
                     </li>
                  );
               })}
            </ul>
         </div>
         <div>
            <ul>
               <li className='py-4 cursor-pointer'>
                  <div className='flex justify-center items-center'>
                     <ThemeToggle />
                  </div>
               </li>
               <li className='py-4 cursor-pointer'>
                  <div className='flex justify-center items-center'>
                     <svg
                        width='45px'
                        height='45px'
                        viewBox='0 0 24 24'
                        fill='var(--text-color)'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='p-[14px] inline bg-[#eff1f2] rounded-[50%] transition duration-300 hover:bg-[#d3d8db]'>
                        <path d='M16 17l5-5m0 0l-5-5m5 5H9' />
                        <path d='M21 12H9m3-10h-4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h4' />
                     </svg>
                  </div>
               </li>
            </ul>
         </div>
      </div>
   );
};

export default SideMenue;
