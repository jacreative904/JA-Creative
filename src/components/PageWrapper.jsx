import React, { useEffect, useState } from 'react';
import { usePageTransitionContext } from '../contexts/PageTransitionContext';

const PageWrapper = ({ children, className = '' }) => {
  const { transitionState } = usePageTransitionContext();
  const [backgroundStyle, setBackgroundStyle] = useState({});

  useEffect(() => {
    if (transitionState.isTransitioning && transitionState.backgroundColor) {
      // Set the background color during transition
      setBackgroundStyle({
        backgroundColor: transitionState.backgroundColor,
        transition: 'background-color 0.5s ease-out'
      });
    } else {
      // Reset to default background after transition
      setTimeout(() => {
        setBackgroundStyle({
          backgroundColor: 'transparent',
          transition: 'background-color 0.5s ease-out'
        });
      }, 100);
    }
  }, [transitionState]);

  return (
    <div 
      className={`min-h-screen ${className}`}
      style={backgroundStyle}
    >
      {children}
    </div>
  );
};

export default PageWrapper;
