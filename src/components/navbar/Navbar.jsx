import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { LogOut, UserIcon } from "lucide-react";

function Navbar() {
   const { user, handleLogOut } = useContext(AuthContext);

   const [isOpen, setisOpen] = useState(false);
   const isToggle = () => {
      setisOpen(!isOpen);
   };

   return (
      <div className='flex justify-center text-[var(--text-color)]'>
         <nav className='w-full z-10 hidden md:hidden lg:block '>
            <div className='max-w-[1200px] mx-auto py-6 flex justify-between items-center font-semibold'>
               <div className=''>
                  <NavLink to='/'>
                     <img className='w-auto h-10' src='/src/assets/SongLap.jpg' alt='' />
                  </NavLink>
               </div>
               <div className=''>
                  <NavLink to='/' className='mx-4 hover:text-blue-600 transition duration-75'>
                     Home
                  </NavLink>
                  <NavLink to='/blog' className='mx-4 hover:text-blue-600 transition duration-75'>
                     Blog
                  </NavLink>
                  <NavLink to='/about' className='mx-4 hover:text-blue-600 transition duration-75'>
                     About
                  </NavLink>
                  <NavLink to='/support' className='mx-4 hover:text-blue-600 transition duration-75'>
                     Support
                  </NavLink>
               </div>
               <div className=''>
                  {!user ? (
                     <NavLink to='/login'>
                        {" "}
                        <UserIcon className="hover:text-blue-600 transition duration-75" />{" "}
                     </NavLink>
                  ) : (
                     <button onClick={handleLogOut} className='mx-2 hover:text-blue-600 transition duration-75'>
                        <LogOut />
                     </button>
                  )}
               </div>
            </div>
         </nav>
         <nav className='lg:hidden md:block p-5 w-full'>
            <div className='flex items-center justify-between'>
               <NavLink to='/'>
                  <img className='w-auto h-10' src='/src/assets/SongLap.jpg' alt='' />
               </NavLink>
               <button onClick={isToggle}>
                  {isOpen ? (
                     <svg id='hide-button' className='h-6 fill-current' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                        <title>Menu Close</title>
                        <polygon
                           points='11,9 22,9 22,11 11,11 11,22 9,22 9,11 -2,11 -2,9 9,9 9,-2 11,-2'
                           transform='rotate(45 10 10)'
                        />
                     </svg>
                  ) : (
                     <svg id='show-button' className='h-6 fill-current' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                        <title>Menu Open</title>
                        <path d='M0 3h20v2H0V3z M0 9h20v2H0V9z M0 15h20v2H0V15z' />
                     </svg>
                  )}
               </button>
            </div>
            {isOpen ? (
               <div className='items-center flex flex-col gap-5 p-10 font-semibold'>
                  <NavLink to='/' className='mx-2'>
                     Home
                  </NavLink>
                  <NavLink to='/blog' className='mx-2'>
                     Blog
                  </NavLink>
                  <NavLink to='/about' className='mx-2'>
                     About
                  </NavLink>
                  <NavLink to='/support' className='mx-2'>
                     Support
                  </NavLink>
                  {!user ? (
                     <NavLink to='/login'>Login</NavLink>
                  ) : (
                     <button onClick={handleLogOut} className='mx-2'>
                        LogOut
                     </button>
                  )}
               </div>
            ) : (
               <></>
            )}
         </nav>
      </div>
   );
}

export default Navbar;
