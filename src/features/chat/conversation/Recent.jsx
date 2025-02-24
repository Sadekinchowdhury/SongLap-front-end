import { LayoutDashboard } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";

const Recent = () => {
   const { showSideBar, setShowSideBar } = useContext(AuthContext);
   const handleSidebar = () => {
      setShowSideBar(!showSideBar);
   };
   return (
      <div className='flex justify-between mb-7'>
         <div>
            <p className='text-2xl font-bold mb-1.5 leading-[20px] text-[var(--text-color)]'>Recent</p>
            <p className='text-[14px] leading-[20px] text-[var(--text-color)]'>Chat With Your Feind </p>
         </div>
         <div>
            <LayoutDashboard fill='white' onClick={handleSidebar} className='w-6 h-6 cursor-pointer' />
         </div>
      </div>
   );
};

export default Recent;
