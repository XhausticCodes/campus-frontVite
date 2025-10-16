import React, { useContext } from "react";
import { Menu, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../Context/ThemeContext";
import { useAuth } from "../Context/AuthContext";
import ThemeToggleButton from "./ThemeToggleButton";

const Header = ({ pageTitle, onMenuClick }) => {
  const { theme } = useContext(ThemeContext);
  const { logout } = useAuth();

  return (
    <header
      className={`fixed top-0 left-0 md:left-64 right-0 h-20 shadow-md z-20 border-b ${
        theme === "light"
          ? "bg-white border-gray-200"
          : "bg-gray-800 border-gray-700"
      }`}
    >
      <div className="flex items-center justify-between h-full px-6">
        {/* Hamburger Menu for Mobile */}
        <button
          onClick={onMenuClick}
          className={`md:hidden ${
            theme === "light"
              ? "text-gray-600 hover:text-gray-800"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <Menu className="h-6 w-6" />
        </button>
        <h1
          className={`text-2xl font-semibold ${
            theme === "light" ? "text-gray-900" : "text-white"
          }`}
        >
          {pageTitle}
        </h1>
        <div className="flex-grow"></div> {/* Spacer */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <ThemeToggleButton />

          {/* Sign Out */}
          <NavLink
            to="/login"
            onClick={() => {
              logout();
              console.log("User signed out");
            }}
            className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-200 ${
              theme === "light"
                ? "text-gray-700 hover:bg-gray-100"
                : "text-red-400 hover:bg-gray-700 hover:text-red-500"
            }`}
          >
            <LogOut className="h-5 w-5 mr-2" />
            Sign Out
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
