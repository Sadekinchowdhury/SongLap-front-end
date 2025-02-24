import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
   const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

   useEffect(() => {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
   }, [theme]);

   const toggleTheme = () => {
      setTheme(theme === "light" ? "dark" : "light");
   };

   return (
      <>
         {theme !== "light" ? (
            <Sun
               className='w-10 h-10 inline-block p-3 bg-[#eff1f2] rounded-full transition duration-300 hover:bg-[#d3d8db]'
               onClick={toggleTheme}
            />
         ) : (
            <Moon
               className='w-10 h-10 inline-block p-3 bg-[#eff1f2] rounded-full transition duration-300 hover:bg-[#d3d8db]'
               onClick={toggleTheme}
            />
         )}
      </>
   );
}
