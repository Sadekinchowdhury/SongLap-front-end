import { ChevronDown, Shield } from "lucide-react";

const Security = ({ dropdown, setDropdown }) => {
   const isOpen = dropdown === "security"; // Check if dropdown is open

   return (
      <>
         <div
            onClick={() => setDropdown(isOpen ? "" : "security")} // Toggle logic
            className='flex items-center py-5 px-4 border-t border-gray-300 justify-between cursor-pointer'>
            <div className='flex items-center'>
               <Shield className='w-5 h-5 mr-3 text-blue-500' />
               <h5>Security</h5>
            </div>
            <ChevronDown className={`w-5 h-5 mr-3 text-blue-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
         </div>
         <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "h-[500px]" : "h-0"}`}>
            <h1>Security</h1>
         </div>
      </>
   );
};

export default Security;
