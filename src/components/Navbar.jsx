import { Link } from "react-router-dom";
import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full bg-zinc-800 py-4 px-6 flex justify-between items-center">
      <h1 className="bg-gradient-to-r from-lime-400 to-lime-500 bg-clip-text text-transparent text-2xl font-extrabold">DhanDiary</h1>
      <div className="space-x-4">
        <Link to="/dashboard" className="text-zinc-400 hover:text-white">
          Home
        </Link>
        <Link to="/signup" className="text-zinc-400 hover:text-white">
          Signup
        </Link>
        <Link to="/login" className="text-zinc-400 hover:text-white">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
