import { ChevronDown, HelpCircle } from "lucide-react";

const Help = ({ dropdown, setDropdown }) => {
   const isOpen = dropdown === "help"; // Check if dropdown is open

   return (
      <>
         <div
            onClick={() => setDropdown(isOpen ? "" : "help")} // Toggle logic
            className='flex items-center py-5 px-4 justify-between cursor-pointer text-[var(--text-color)]'>
            <div className='flex items-center'>
               <HelpCircle className='w-5 h-5 mr-3 text-blue-500' />
               <h5>Help</h5>
            </div>
            <ChevronDown className={`w-5 h-5 mr-3 text-blue-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
         </div>
         <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "h-[500px]" : "h-0"}`}>
            <h1>Help</h1>
         </div>
      </>
   );
};

export default Help;
