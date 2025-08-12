import React, { useEffect } from 'react';
import { usePageTransitionContext } from '../contexts/PageTransitionContext';

const PageWrapper = ({ children, className = '' }) => {
  const { transitionState } = usePageTransitionContext();

  useEffect(() => {
    if (transitionState.isTransitioning && transitionState.backgroundColor) {
      // During transition, wait for the circle to expand before changing background
      const timer = setTimeout(() => {
        document.body.style.backgroundColor = transitionState.backgroundColor;
        document.body.style.transition = 'background-color 0.3s ease-out';
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.documentElement.style.backgroundColor = transitionState.backgroundColor;
      }, 1200); // Wait for circle expansion to complete (0.9s + buffer)
      
      return () => clearTimeout(timer);
    } else if (transitionState.backgroundColor && !transitionState.isTransitioning) {
      // Maintain the background color on the destination page body
      document.body.style.backgroundColor = transitionState.backgroundColor;
      document.body.style.transition = 'background-color 0.3s ease-out';
      document.body.style.margin = '0';
      document.body.style.padding = '0';
      document.documentElement.style.backgroundColor = transitionState.backgroundColor;
      
      // Update navigation styling for interior pages with colored backgrounds
      updateNavigationStyling(transitionState.backgroundColor);
    } else {
      // Reset to default background only when no transition state
      document.body.style.backgroundColor = '';
      document.body.style.transition = 'background-color 0.3s ease-out';
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.documentElement.style.backgroundColor = '';
      
      // Reset navigation styling to default
      resetNavigationStyling();
    }
  }, [transitionState]);

  // Function to update navigation styling for interior pages
  const updateNavigationStyling = (backgroundColor) => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    
    // Determine if we're on a colored background page
    const isColoredBackground = backgroundColor === '#F991CC' || backgroundColor === '#292929';
    
    if (isColoredBackground) {
      // Update JA Creative logo styling
      const logoLink = document.querySelector('a[href="/"]');
      if (logoLink) {
        if (!isDarkMode && backgroundColor === '#F991CC') {
          // Light mode with pink background: logo should be white
          logoLink.style.color = '#F9F9F9';
        } else if (isDarkMode) {
          // Dark mode: logo should be mainbg
          logoLink.style.color = '#F9F9F9';
        }
      }
      
      // Update underline colors for nav links
      const navLinks = document.querySelectorAll('.nav-text');
      navLinks.forEach(link => {
        if (isDarkMode) {
          // Dark mode: nav text and underline should be mainbg (#F9F9F9)
          link.style.color = '#F9F9F9';
          link.style.setProperty('--underline-color', '#F9F9F9');
        } else {
          // Light mode: underline should be mainbg (#F9F9F9)
          link.style.setProperty('--underline-color', '#F9F9F9');
        }
      });
      
      // Update contact button styling
      const contactButton = document.querySelector('a[href="/contact"]');
      if (contactButton) {
        if (isDarkMode) {
          // Dark mode: background maindark, text mainbg
          contactButton.style.backgroundColor = '#0B0A07';
          contactButton.style.color = '#F9F9F9';
        } else {
          // Light mode: background mainbg, text mainpink
          contactButton.style.backgroundColor = '#F9F9F9';
          contactButton.style.color = '#F991CC';
        }
      }
    }
  };

  // Function to reset navigation styling to default
  const resetNavigationStyling = () => {
    // Reset JA Creative logo styling
    const logoLink = document.querySelector('a[href="/"]');
    if (logoLink) {
      logoLink.style.removeProperty('color');
    }
    
    // Reset underline colors and nav text colors
    const navLinks = document.querySelectorAll('.nav-text');
    navLinks.forEach(link => {
      link.style.removeProperty('--underline-color');
      link.style.removeProperty('color');
    });
    
    // Reset contact button styling
    const contactButton = document.querySelector('a[href="/contact"]');
    if (contactButton) {
      contactButton.style.removeProperty('background-color');
      contactButton.style.removeProperty('color');
    }
  };

  return (
    <div className={`min-h-screen ${className}`}>
      {children}
    </div>
  );
};

export default PageWrapper;
