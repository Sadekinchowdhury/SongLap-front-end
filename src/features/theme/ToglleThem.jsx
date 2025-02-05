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
        <svg
          width="45px"
          height="45px"
          viewBox="0 0 24 24"
          fill="var(--text-color)"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="p-[14px] inline bg-[#eff1f2] rounded-[50%] transition duration-300 hover:bg-[#d3d8db]"
          onClick={toggleTheme}
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ) : (
        <svg
          width="45px"
          height="45px"
          viewBox="0 0 24 24"
          fill="var(--text-color)"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="p-[14px] inline bg-[#eff1f2] rounded-[50%] transition duration-300 hover:bg-[#d3d8db]"
          onClick={toggleTheme}
        >
          <path d="M21 12.79A9 9 0 0 1 11.21 3 7 7 0 1 0 18 18.79 9 9 0 0 1 21 12.79z" />
        </svg>
      )}
    </>
  );
}
