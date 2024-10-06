import React, { useState } from "react";
import "./NavBar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

const NavBar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);

  return (
    <div className="flex items-center justify-between px-5 py-3 mb-5 border-b border-gray-400 shadow-lg bg-white">
      <h1 onClick={() => navigate("/")} className="cursor-pointer text-xl md:text-2xl font-bold text-blue-600">
        Medscription
      </h1>
      
      <ul className={`md:flex ${showMenu ? "flex" : "hidden"} flex-col md:flex-row md:space-x-4 mt-3 md:mt-0 ml-auto`}>
        <NavLink to="/" className="px-3 py-2 text-gray-700 hover:text-blue-500 hover:bg-gray-100 rounded-lg transition duration-300 ease-in-out">
          HOME
        </NavLink>
        <NavLink to="/doctors" className="px-3 py-2 text-gray-700 hover:text-blue-500 hover:bg-gray-100 rounded-lg transition duration-300 ease-in-out">
          ALL DOCTORS
        </NavLink>
        <NavLink to="/about" className="px-3 py-2 text-gray-700 hover:text-blue-500 hover:bg-gray-100 rounded-lg transition duration-300 ease-in-out">
          ABOUT
        </NavLink>
        <NavLink to="/contact" className="px-3 py-2 text-gray-700 hover:text-blue-500 hover:bg-gray-100 rounded-lg transition duration-300 ease-in-out">
          CONTACT
        </NavLink>
      </ul>

      <div className="relative">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group">
            <img className="w-8 rounded-full" src={assets.profile_pic} alt="Profile" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="bg-stone-100 rounded shadow-lg p-4">
                <p onClick={() => navigate("/my-profile")} className="hover:text-black cursor-pointer">My Profile</p>
                <p onClick={() => navigate("/my-appointments")} className="hover:text-black cursor-pointer">My Appointments</p>
                <p onClick={() => { setToken(false); }} className="hover:text-black cursor-pointer">Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out mt-3 md:mt-0"
          >
            Create Account
          </button>
        )}
      </div>

      <div className="md:hidden flex items-center">
        <img onClick={() => setShowMenu(true)} className="w-6" src={assets.menu_icon} alt="Menu" />
        <img onClick={() => setShowMenu(false)} className="w-6" src={assets.cross_icon} alt="Close" />
      </div>
    </div>
  );
};

export default NavBar;
