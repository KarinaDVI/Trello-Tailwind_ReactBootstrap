// SwitchD.js
import React from 'react';
import { useDarkMode } from '../utils/DarkModeContext';

export default function SwitchD() {
  const { darkMode, toggleTheme } = useDarkMode();

  const toggleClass = "transform translate-x-5";

  return (
    <div
      className="md:w-14 md:h-7 w-12 h-6 flex items-center bg-gray-400 rounded-full p-1 cursor-pointer"
      onClick={toggleTheme}
    >
      {/* Switch */}
      <div
        className={
          "bg-black md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out" +
          (darkMode ? null : toggleClass)
        }
      ></div>
    </div>
  );
}