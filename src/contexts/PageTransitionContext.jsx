import React, { createContext, useContext, useState } from 'react';

const PageTransitionContext = createContext();

export const usePageTransitionContext = () => {
  const context = useContext(PageTransitionContext);
  if (!context) {
    throw new Error('usePageTransitionContext must be used within a PageTransitionProvider');
  }
  return context;
};

export const PageTransitionProvider = ({ children }) => {
  const [transitionState, setTransitionState] = useState({
    isTransitioning: false,
    backgroundColor: null,
    targetRoute: null
  });

  const updateTransitionState = (newState) => {
    setTransitionState(prev => ({ ...prev, ...newState }));
  };

  const resetTransitionState = () => {
    setTransitionState({
      isTransitioning: false,
      backgroundColor: null,
      targetRoute: null
    });
  };

  return (
    <PageTransitionContext.Provider value={{
      transitionState,
      updateTransitionState,
      resetTransitionState
    }}>
      {children}
    </PageTransitionContext.Provider>
  );
};
