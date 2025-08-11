import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const useScrollAnimations = () => {
  const scrollTriggersRef = useRef([]);
  
  // Cleanup function
  useEffect(() => {
    return () => {
      // Kill all ScrollTrigger instances created by this hook
      scrollTriggersRef.current.forEach(trigger => {
        if (trigger) trigger.kill();
      });
      scrollTriggersRef.current = [];
    };
  }, []);
  
  // Function to add ScrollTrigger to our tracking array
  const addScrollTrigger = (trigger) => {
    scrollTriggersRef.current.push(trigger);
    return trigger;
  };
  
  // Refresh all ScrollTriggers (useful for window resize)
  const refreshScrollTriggers = () => {
    ScrollTrigger.refresh();
  };
  
  return {
    addScrollTrigger,
    refreshScrollTriggers
  };
};
