// SwitchD.js
import React from 'react';
import { useDarkMode } from '../utils/DarkModeContext';

export default function SwitchColorMode() {
  const { darkMode, toggleTheme } = useDarkMode();

  const toggleClass = "transform translate-x-6";

  return (
    <div className="flex items-center text-gray-200 text-sm">
      <p className={`pr-2 ${darkMode?'text-gray-100':'text-gray-700'}`}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-mask" viewBox="0 0 16 16">
  <path d="M6.225 1.227A7.5 7.5 0 0 1 10.5 8a7.5 7.5 0 0 1-4.275 6.773 7 7 0 1 0 0-13.546zM4.187.966a8 8 0 1 1 7.627 14.069A8 8 0 0 1 4.186.964z"/>
</svg></p>
    <div
      className="md:w-10 md:h-4 w-10 h-4 flex items-center bg-gray-200 rounded-full p-0 cursor-pointer"
      onClick={toggleTheme}
    >
      {/* Switch */}
      
      <div
        className={
          "bg-gray-700 md:w-4 md:h-4 h-4 w-4 rounded-full shadow-md transform duration-300 ease-in-out" +
          (darkMode ? null : toggleClass)
        }
      ></div>
    </div>
    </div>
  );
}