import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Reusable animation functions
export const fadeUp = (elements, options = {}) => {
  const defaults = {
    duration: 0.8,
    y: 30,
    opacity: 0,
    ease: "power2.out",
    stagger: 0.1
  };
  
  const config = { ...defaults, ...options };
  
  return gsap.fromTo(elements, 
    { opacity: 0, y: config.y },
    { 
      opacity: 1, 
      y: 0, 
      duration: config.duration,
      ease: config.ease,
      stagger: config.stagger
    }
  );
};

export const slideIn = (elements, direction = 'left', options = {}) => {
  const defaults = {
    duration: 0.8,
    distance: 50,
    opacity: 0,
    ease: "power2.out"
  };
  
  const config = { ...defaults, ...options };
  const xValue = direction === 'left' ? -config.distance : config.distance;
  
  return gsap.fromTo(elements,
    { opacity: 0, x: xValue },
    { 
      opacity: 1, 
      x: 0, 
      duration: config.duration,
      ease: config.ease
    }
  );
};

export const scaleIn = (elements, options = {}) => {
  const defaults = {
    duration: 0.8,
    scale: 0.8,
    opacity: 0,
    ease: "back.out(1.7)"
  };
  
  const config = { ...defaults, ...options };
  
  return gsap.fromTo(elements,
    { opacity: 0, scale: config.scale },
    { 
      opacity: 1, 
      scale: 1, 
      duration: config.duration,
      ease: config.ease
    }
  );
};

// Scroll-triggered animation wrapper
export const createScrollAnimation = (trigger, elements, animationType, options = {}) => {
  const defaults = {
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none reverse"
  };
  
  const scrollConfig = { ...defaults, ...options };
  
  let animation;
  
  switch (animationType) {
    case 'fadeUp':
      animation = fadeUp(elements, options);
      break;
    case 'slideIn':
      animation = slideIn(elements, options.direction, options);
      break;
    case 'scaleIn':
      animation = scaleIn(elements, options);
      break;
    default:
      animation = fadeUp(elements, options);
  }
  
  ScrollTrigger.create({
    trigger: trigger,
    start: scrollConfig.start,
    end: scrollConfig.end,
    toggleActions: scrollConfig.toggleActions,
    animation: animation
  });
  
  return animation;
};
