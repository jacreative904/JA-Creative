import { useEffect } from 'react';
import { Link } from 'react-router-dom';



const Navbar = ({menuOpen, setMenuOpen}) => {
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
    }, [menuOpen]);

    return <nav>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
            to="/"
            className='headline-regular self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
            JA Creative
        </Link>

{/* ------ Mobile Humburger ----- */}
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <div className='w-7 h-5 relative cursor-pointer z-40 md:hidden' onClick={() => setMenuOpen((prev) => !prev)}>
            &#9776;
        </div>

 {/* ------ Desktop Menu ----- */}       
      <div className="items-center justify-between hidden w-screen md:flex md:w-auto md:order-1" id="navbar-cta">
        <ul className="flex flex-col p-4 md:p-0 mt-4 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
          <li>
            <Link 
                to="/"
                className="block font-semibold py-2 px-3 nav-text left">Home
            </Link>
          </li>
          <li>
            <Link 
                to="/about"
                className="block font-semibold py-2 px-3 nav-text left">About
            </Link>
          </li>
          <li>
            <Link 
                to="/skills"
                className="block font-semibold py-2 px-3 nav-text left">Skills
            </Link>
          </li>
          <li>
            <Link 
            to="/contact" 
            className="flex font-semibold font-bold text-center nav-cta space-x-3">Contact
            </Link>
          </li>
        </ul>
      </div>
      </div>
      </div>
    </nav>
}

export default Navbar;