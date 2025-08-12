import React from 'react';
import { Link } from 'react-router-dom';
import { usePageTransition } from '../hooks/usePageTransition';

const TransitionLink = ({ to, children, className, ...props }) => {
  const { triggerTransition, isTransitioning, resetTransition } = usePageTransition();

  const handleClick = (event) => {
    const isHomePage = window.location.pathname === '/';
    const hasPhraseMappings = ['/about', '/skills', '/projects', '/contact'].includes(to);
    const isGoingToHome = to === '/';
    
    if (isHomePage && hasPhraseMappings && !isTransitioning) {
      // Trigger transition from home to other pages
      triggerTransition(to, event);
    } else if (isGoingToHome && !isTransitioning) {
      // Reset transition state when going back to home
      resetTransition();
    }
    // Otherwise, let the default Link behavior handle navigation
  };

  return (
    <Link 
      to={to} 
      className={className} 
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  );
};

export default TransitionLink;
