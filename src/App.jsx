import React, { useState, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import "./App.css";
import "./index.css";

import HomePage from './pages/home/HomePage';
import AboutPage from './pages/About/AboutPage';
import SkillsPage from './pages/skills/SkillsPage';
import ContactPage from './pages/Contact/ContactPage';
import NotFoundPage from './components/NotFoundPage';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar'
import MobileMenu from './components/MobileMenu';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <>
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}{" "}
      <div className={`min-h-screen transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"} bg-black text-gray-100`}>
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>

        <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path='/' element={<HomePage />} />
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
