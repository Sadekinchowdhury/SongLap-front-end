import { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [isOpen, setisOpen] = useState(false);
  const isToggle = () => {
    setisOpen(!isOpen);
  };
  return (
    <div className="flex justify-center text-[var(--text-color]">
      <nav className="w-full fixed top-0 z-10 hidden md:hidden lg:block bg-amber-400">
        <div className="max-w-[1200px] mx-auto py-3 flex justify-between items-center font-semibold">
          <div className="">
            <NavLink to="/" activeClassName="active">
              <img className="w-auto h-10" src="/src/assets/SongLap.jpg" alt="" />
            </NavLink>
          </div>
          <div className="">
            <NavLink to="/" activeClassName="active" className="mx-2">
              Home
            </NavLink>
            <NavLink to="/blog" activeClassName="active" className="mx-2">
              Blog
            </NavLink>
            <NavLink to="/about" activeClassName="active" className="mx-2">
              About
            </NavLink>
            <NavLink to="/support" activeClassName="active" className="mx-2">
              Support
            </NavLink>
          </div>
          <div className="">
            <NavLink to="/login" activeClassName="active">
              Login
            </NavLink>
          </div>
        </div>
      </nav>
      <nav className="lg:hidden md:block p-5 w-full">
        <div className="flex items-center justify-between">
          <NavLink to="/" activeClassName="active">
            <img className="w-auto h-10" src="/src/assets/SongLap.jpg" alt="" />
          </NavLink>
          <button onClick={isToggle}>
            {isOpen ? (
              <svg id="hide-button" className="h-6 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <title>Menu Close</title>
                <polygon points="11,9 22,9 22,11 11,11 11,22 9,22 9,11 -2,11 -2,9 9,9 9,-2 11,-2" transform="rotate(45 10 10)" />
              </svg>
            ) : (
              <svg id="show-button" className="h-6 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <title>Menu Open</title>
                <path d="M0 3h20v2H0V3z M0 9h20v2H0V9z M0 15h20v2H0V15z" />
              </svg>
            )}
          </button>
        </div>
        {isOpen ? (
          <div className="items-center flex flex-col gap-5 p-10 font-semibold">
            <NavLink to="/" activeClassName="active" className="mx-2">
              Home
            </NavLink>
            <NavLink to="/blog" activeClassName="active" className="mx-2">
              Blog
            </NavLink>
            <NavLink to="/about" activeClassName="active" className="mx-2">
              About
            </NavLink>
            <NavLink to="/support" activeClassName="active" className="mx-2">
              Support
            </NavLink>
            <NavLink to="/login" activeClassName="active">
              Login
            </NavLink>
          </div>
        ) : (
          <></>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
