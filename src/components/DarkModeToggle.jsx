import React, { useEffect, useState } from 'react'
import moon from '../assets/moon.svg';
import sun from '../assets/sun.svg';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage for the user's preference
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="bg-linear-to-r from-mainteal to-mainpink dark:to-darkyellow bg-no-repeat bg-center bg-contain w-20 grid justify-items-stretch content-center rounded-2xl"
    >
      { isDarkMode 
      ?     
          <img src={moon} className='h-6 pl-2 justify-self-start'/>
      :
          <img src={sun} className='h-6 pr-2 justify-self-end'/>
      }
    </button>
  );
};

export default DarkModeToggle;