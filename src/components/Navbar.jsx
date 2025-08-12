import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import DarkModeToggle from './DarkModeToggle';
import TransitionLink from './TransitionLink';


const Navbar = ({menuOpen, setMenuOpen}) => {
    const navItemsRef = useRef([]);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
    }, [menuOpen]);

    useEffect(() => {
        // Animation function
        const runAnimation = () => {
            const validElements = navItemsRef.current.filter(el => el !== null);
            
            if (validElements.length > 0) {
                // Set initial state - items start from bottom with 0% opacity
                gsap.set(validElements, { opacity: 0, y: 30 });
                
                // Animate in with stagger: About -> Skills -> Projects
                gsap.to(validElements, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power2.out",
                    delay: 0.5
                });
            }
        };

        // Use a timeout to ensure elements are rendered and page is ready
        const timer = setTimeout(runAnimation, 100);
        
        return () => clearTimeout(timer);
    }, []);

    return <nav className="w-full px-8 py-4">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex gap-5">
          <TransitionLink
              to="/"
              className='headline-regular self-center text-2xl font-bold whitespace-nowrap text-maindark dark:text-mainbg'>
              JA Creative
          </TransitionLink>
          <DarkModeToggle />
        </div>


{/* ------ Mobile Humburger ----- */}
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse items-center">
        {/* Contact Button - Desktop */}
        <TransitionLink 
          to="/contact"
          className="hidden md:block nav-cta">
          CONTACT
        </TransitionLink>
        
        <div className='w-7 h-5 relative cursor-pointer z-40 md:hidden' onClick={() => setMenuOpen((prev) => !prev)}>
            &#9776;
        </div>

 {/* ------ Desktop Menu ----- */}       
      <div className="items-center justify-center hidden md:flex md:w-auto md:order-1 absolute left-1/2 transform -translate-x-1/2" id="navbar-cta">
        <ul className="flex flex-col p-4 md:p-0 mt-4 md:space-x-12 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
          <li ref={el => navItemsRef.current[0] = el} className="nav-item">
            <TransitionLink 
                to="/about"
                className="block font-bold py-2 px-3 nav-text left">About
            </TransitionLink>
          </li>
          <li ref={el => navItemsRef.current[1] = el} className="nav-item">
            <TransitionLink 
                to="/skills"
                className="block font-bold py-2 px-3 nav-text left">Skills
            </TransitionLink>
          </li>
          <li ref={el => navItemsRef.current[2] = el} className="nav-item">
            <TransitionLink 
                to="/projects"
                className="block font-bold py-2 px-3 nav-text left">Projects
            </TransitionLink>
          </li>
        </ul>
      </div>
      </div>
      </div>
    </nav>
}

export default Navbar;
