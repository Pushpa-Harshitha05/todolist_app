import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar flex justify-around w-full items-center bg-gradient-to-r from-blue-800 via-blue-900 to-blue-800 h-14">
        <div className="logo text-[28px] font-serif font-extrabold text-center text-white">
          JustDo
        </div>
        <div className="navi flex gap-10 items-center">
          <p className="text-[17px] hover:underline cursor-pointer text-white font-medium hover:font-bold 5xl:flex underline-offset-4 hidden">
            Home
          </p>
          <p className="text-[17px] hover:underline cursor-pointer text-white font-medium hover:font-bold underline-offset-4">
            Your Tasks
          </p>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
