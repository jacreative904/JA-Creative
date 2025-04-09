import React, { useState, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import "./index.css";

import HomePage from './pages/Home/HomePage.jsx';
import AboutPage from './pages/About/AboutPage.jsx';
import SkillsPage from './pages/skills/SkillsPage.jsx';
import ContactPage from './pages/Contact/ContactPage.jsx';

import Navbar from './components/Navbar.jsx'
import MobileMenu from './components/MobileMenu.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}{" "}
      <div className={`min-h-screen transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>

        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path='/JA-Creative' element={<HomePage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/skills' element={<SkillsPage />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
      </Suspense>
      </div>
    </>
  );
}

export default App
