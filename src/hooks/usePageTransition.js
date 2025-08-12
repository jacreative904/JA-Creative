import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { usePageTransitionContext } from '../contexts/PageTransitionContext';

export const usePageTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentTransitionColor, setCurrentTransitionColor] = useState(null);
  const navigate = useNavigate();
  const transitionTimelineRef = useRef(null);
  const { updateTransitionState, resetTransitionState } = usePageTransitionContext();

  // Map routes to their corresponding phrase classes
  const routePhraseMap = {
    '/about': 'phrase1',
    '/skills': 'phrase2', 
    '/projects': 'phrase3',
    '/contact': 'phrase4'
  };

  // Get the appropriate color based on theme
  const getTransitionColor = useCallback(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    return isDarkMode ? '#292929' : '#F991CC'; // hovergrey for dark, mainpink for light
  }, []);

  // Main transition function
  const triggerTransition = useCallback((targetRoute, event) => {
    if (event) {
      event.preventDefault();
    }

    if (isTransitioning) return;

    // If navigating to home page, reset transition state
    if (targetRoute === '/') {
      resetTransitionState();
      navigate(targetRoute);
      return;
    }

    const phraseClass = routePhraseMap[targetRoute];
    if (!phraseClass) {
      // If no phrase mapping, do normal navigation
      navigate(targetRoute);
      return;
    }

    setIsTransitioning(true);
    const transitionColor = getTransitionColor();
    setCurrentTransitionColor(transitionColor);

    // Update global transition state
    updateTransitionState({
      isTransitioning: true,
      backgroundColor: transitionColor,
      targetRoute: targetRoute
    });

    // Get the phrase elements
    const phraseElements = document.querySelectorAll(`.${phraseClass}`);
    
    if (phraseElements.length === 0) {
      // Fallback to normal navigation if no elements found
      navigate(targetRoute);
      setIsTransitioning(false);
      resetTransitionState();
      return;
    }

    // Create transition timeline
    const tl = gsap.timeline({
      onComplete: () => {
        setIsTransitioning(false);
        setCurrentTransitionColor(null);
        // Update transition state to maintain background color on destination page
        updateTransitionState({
          isTransitioning: false,
          backgroundColor: transitionColor,
          targetRoute: targetRoute
        });
      }
    });

    transitionTimelineRef.current = tl;

    // Step 1: Trigger hover effect (color change)
    tl.to(phraseElements, {
      color: transitionColor,
      duration: 0.3,
      ease: "power2.out"
    });

    // Step 2: Create a single expanding circular overlay from the first phrase element
    const firstElement = phraseElements[0];
    const rect = firstElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create the expanding circle overlay
    const overlay = document.createElement('div');
    overlay.className = 'transition-overlay';
    
    // Start as a tiny circle (2px diameter) at the center of the first phrase element
    const initialSize = 2;
    overlay.style.cssText = `
      position: fixed;
      top: ${centerY - initialSize/2}px;
      left: ${centerX - initialSize/2}px;
      width: ${initialSize}px;
      height: ${initialSize}px;
      background-color: ${transitionColor};
      border-radius: 50%;
      z-index: 9999;
      pointer-events: none;
      transform-origin: center;
    `;
    document.body.appendChild(overlay);

    // Calculate the scale needed to cover the entire screen
    const maxDistance = Math.sqrt(
      Math.pow(Math.max(centerX, window.innerWidth - centerX), 2) +
      Math.pow(Math.max(centerY, window.innerHeight - centerY), 2)
    );
    const finalScale = (maxDistance * 2) / initialSize;

    // Step 3: Expand circle to cover screen immediately and smoothly
    tl.to(overlay, {
      scale: finalScale,
      duration: 0.9,
      ease: "power2.inOut"
    }, 0.3); // Start expanding right after color change

    // Step 3.5: Change navigation text color as circle expands over it
    const isDarkMode = document.documentElement.classList.contains('dark');
    const navTextColor = isDarkMode ? '#0B0A07' : '#F9F9F9'; // maindark for dark mode, mainbg for light mode
    
    tl.to('.nav-text, .nav-cta', {
      color: navTextColor,
      duration: 0.4,
      ease: "power2.out"
    }, 0.7); // Start changing nav color as circle expands

    // Step 4: Navigate to new page WELL AFTER circle is fully expanded
    tl.call(() => {
      navigate(targetRoute);
      
      // Immediately apply navigation styling for interior pages to prevent flash
      setTimeout(() => {
        const isDarkMode = document.documentElement.classList.contains('dark');
        const navLinks = document.querySelectorAll('.nav-text');
        const contactButton = document.querySelector('a[href="/contact"]');
        const logoLink = document.querySelector('a[href="/"]');
        
        // Apply logo styling immediately
        if (logoLink) {
          if (!isDarkMode && transitionColor === '#F991CC') {
            // Light mode with pink background: logo should be white
            logoLink.style.color = '#F9F9F9';
          } else if (isDarkMode) {
            // Dark mode: logo should be mainbg
            logoLink.style.color = '#F9F9F9';
          }
        }
        
        if (isDarkMode) {
          // Dark mode: immediately set nav text to mainbg for contrast
          navLinks.forEach(link => {
            link.style.color = '#F9F9F9';
            link.style.setProperty('--underline-color', '#F9F9F9');
          });
          
          if (contactButton) {
            contactButton.style.backgroundColor = '#0B0A07';
            contactButton.style.color = '#F9F9F9';
          }
        } else {
          // Light mode: set underlines to mainbg
          navLinks.forEach(link => {
            link.style.setProperty('--underline-color', '#F9F9F9');
          });
          
          if (contactButton) {
            contactButton.style.backgroundColor = '#F9F9F9';
            contactButton.style.color = '#F991CC';
          }
        }
      }, 50); // Very short delay to ensure DOM is ready
    }, null, 1.5); // Wait extra time to ensure complete coverage

    // Step 5: Fade out overlays and reveal new page
    tl.to('.transition-overlay', {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        // Clean up overlay elements
        document.querySelectorAll('.transition-overlay').forEach(el => el.remove());
      }
    }, 1.7); // Start fade after navigation

  }, [isTransitioning, navigate, getTransitionColor, routePhraseMap]);

  // Cancel transition if needed
  const cancelTransition = useCallback(() => {
    if (transitionTimelineRef.current) {
      transitionTimelineRef.current.kill();
    }
    setIsTransitioning(false);
    setCurrentTransitionColor(null);
    // Clean up any remaining overlays
    document.querySelectorAll('.transition-overlay').forEach(el => el.remove());
  }, []);

  // Reset transition function for navigating back to home
  const resetTransition = useCallback(() => {
    resetTransitionState();
    setIsTransitioning(false);
    setCurrentTransitionColor(null);
    // Clean up any remaining overlays
    document.querySelectorAll('.transition-overlay').forEach(el => el.remove());
    
    // Reset navigation text colors to their original state
    gsap.set('.nav-text, .nav-cta', {
      color: '', // Reset to CSS default
      clearProps: 'color'
    });
    
    // Reset logo color to original state
    const logoLink = document.querySelector('a[href="/"]');
    if (logoLink) {
      logoLink.style.removeProperty('color');
    }
  }, [resetTransitionState]);

  return {
    isTransitioning,
    currentTransitionColor,
    triggerTransition,
    cancelTransition,
    resetTransition,
    routePhraseMap
  };
};
