import { useEffect } from 'react';
import { Link } from 'react-router-dom';



const MobileMenu = ({menuOpen, setMenuOpen}) => {

    return (
        <div className={`fixed uppercase top-0 left-0 w-dvw bg-mainteal/95 dark:bg-maindark/95 z-40 flex flex-col items-center text-center justify-center transition-all duration-300 ease-in-out
                            ${
                            menuOpen 
                                ? "h-screen opacity-100 pointer-events-auto" 
                                : "h-0 opacity-0 pointer-events-none"
                            }
                        `}>
            <button 
                onClick={() => setMenuOpen(false)} 
                className="absolute top-6 right-6 text-darklight text-3xl focus:outline-none cursor-pointer"
                aria-label="Close Menu"
            >
                &times;
            </button>

        <ul>
          <li>
            <Link 
                to="/"
                onClick={() => setMenuOpen(false)}
                className={`text-4xl text-darklight my-4 transform transition-transform duration-300 mb-5
                        ${
                            menuOpen 
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-5"
                        }
                `}>Home
            </Link>
            <hr className='w-90 text-maingrey dark:text-darkyellow mt-[20px] mb-[20px]'/>
        </li>
        
        <li>
            <Link 
                to="/about"
                onClick={() => setMenuOpen(false)}
                className={`text-4xl text-darklight my-4 transform transition-transform duration-300
                        ${
                            menuOpen 
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-5"
                            }
                `}>About
            <hr className='w-90 text-maingrey dark:text-darkyellow mt-[20px] mb-[20px]'/>
            </Link>
        </li>
        
        <li>
            <Link 
                to="/skills"
                onClick={() => setMenuOpen(false)}
                className={`text-4xl text-darklight my-4 transform transition-transform duration-300
                        ${
                            menuOpen 
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-5"
                        }
                `}>Skills
            </Link>
        </li>
        
        <li className='mt-[40px]'>
            <Link 
            to="/contact" 
            onClick={() => setMenuOpen(false)}
            className={`text-4xl text-darklight dark:text-darkbg transform transition-transform duration-300 bg-mainpink dark:bg-mainyellow px-[40px] py-[10px]
                        ${
                            menuOpen 
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-5"
                        }
            `}>Contact
            </Link>
        </li>
        </ul>
    </div>
    );
};

export default MobileMenu;