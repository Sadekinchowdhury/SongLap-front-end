import { useState } from "react";
import { Heart } from "lucide-react"; // Using lucide-react icons

export default function Favourite() {
   const [isPressed, setIsPressed] = useState(false);

   return (
      <div className='flex items-center gap-2'>
         <button
            onMouseDown={() => setIsPressed(true)}
            onTouchStart={() => setIsPressed(true)} // For mobile touch
            onTouchEnd={() => setIsPressed(false)} // For mobile release
            className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition'>
            Press Me
         </button>
         {isPressed && <Heart className='text-red-500 w-6 h-6  ' />}
      </div>
   );
}
