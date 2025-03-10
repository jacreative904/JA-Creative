import { useEffect } from 'react';
import { Link } from 'react-router-dom';



const MobileMenu = ({menuOpen, setMenuOpen}) => {

    return (
        <div className={`fixed top-0 left-0 w-dvw bg-maindark/95 z-40 flex flex-col items-center justify-center transition-all duration-300 ease-in-out
                            ${
                            menuOpen 
                                ? "h-screen opacity-100 pointer-events-auto" 
                                : "h-0 opacity-0 pointer-events-none"
                            }
                        `}>
            <button 
                onClick={() => setMenuOpen(false)} 
                className="absolute top-6 right-6 text-mainlight text-3xl focus:outline-none cursor-pointer"
                aria-label="Close Menu"
            >
                &times;
            </button>

        <ul>
          <li>
            <Link 
                to="/"
                onClick={() => setMenuOpen(false)}
                className={`text-5xl font-sm text-mainlight my-4 transform transition-transform duration-300
                        ${
                            menuOpen 
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-5"
                        }
                `}>Home
            </Link>
        </li>
        
        <li>
            <Link 
                to="/about"
                onClick={() => setMenuOpen(false)}
                className={`text-2xl font-semibold text-mainlight my-4 transform transition-transform duration-300
                        ${
                            menuOpen 
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-5"
                            }
                `}>About
            </Link>
        </li>
        
        <li>
            <Link 
                to="/skills"
                onClick={() => setMenuOpen(false)}
                className={`text-2xl font-semibold text-mainlight my-4 transform transition-transform duration-300
                        ${
                            menuOpen 
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-5"
                        }
                `}>Skills
            </Link>
        </li>
        
        <li>
            <Link 
            to="/contact" 
            onClick={() => setMenuOpen(false)}
            className={`flex font-bold text-center nav-cta space-x-3 my-4 transform transition-transform duration-300
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