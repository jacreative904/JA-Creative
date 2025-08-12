import React from 'react';
import { Link } from 'react-router-dom';
import { usePageTransition } from '../hooks/usePageTransition';

const TransitionLink = ({ to, children, className, ...props }) => {
  const { triggerTransition, isTransitioning } = usePageTransition();

  const handleClick = (event) => {
    // Only trigger custom transition if we're on the home page and have phrase elements
    const isHomePage = window.location.pathname === '/';
    const hasPhraseMappings = ['/about', '/skills', '/projects', '/contact'].includes(to);
    
    if (isHomePage && hasPhraseMappings && !isTransitioning) {
      triggerTransition(to, event);
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
