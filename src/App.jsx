import React, { useState, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import "./index.css";

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/Home/HomePage.jsx'));
const AboutPage = lazy(() => import('./pages/About/AboutPage.jsx'));
const SkillsPage = lazy(() => import('./pages/Skills/SkillsPage.jsx'));
const ContactPage = lazy(() => import('./pages/Contact/ContactPage.jsx'));
const ProjectsPage = lazy(() => import('./pages/Projects/ProjectsPage.jsx'));
const NotFoundPage = lazy(() => import('./components/NotFoundPage.jsx'));

// Keep these as regular imports since they're needed immediately
import Navbar from './components/Navbar.jsx'
import MobileMenu from './components/MobileMenu.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import { PageTransitionProvider } from './contexts/PageTransitionContext.jsx';

function App() {
  // const [isLoaded, setIsLoaded] = useState(false); // Commented out - loading screen disabled
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <PageTransitionProvider>
      {/* Loading screen disabled - uncomment the lines below to re-enable */}
      {/* {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />} */}
      <div className="min-h-screen">
        {/* Removed opacity transition classes - can be restored when loading screen is re-enabled */}
        {/* <div className={`min-h-screen transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}> */}
        <CustomCursor />
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>

        <Suspense fallback={<div>Loading...</div>}>
          {/* Changed fallback from LoadingScreen to simple text - can be reverted when loading screen is re-enabled */}
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/skills' element={<SkillsPage />} />
            <Route path='/projects' element={<ProjectsPage />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
      </Suspense>
      </div>
    </PageTransitionProvider>
  );
}

export default App
