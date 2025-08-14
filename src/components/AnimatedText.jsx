import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap, { animationUtils, eases, durations } from '../utils/gsapConfig';

const AnimatedText = ({ 
  children, 
  animation = 'fadeInUp',
  duration = durations.medium,
  delay = 0,
  stagger = 0,
  trigger = 'mount',
  className = '',
  ...props 
}) => {
  const containerRef = useRef();
  const elementsRef = useRef([]);

  // Animation presets
  const animations = {
    fadeInUp: {
      from: { opacity: 0, y: 50 },
      to: { opacity: 1, y: 0 }
    },
    fadeInDown: {
      from: { opacity: 0, y: -50 },
      to: { opacity: 1, y: 0 }
    },
    fadeInLeft: {
      from: { opacity: 0, x: -50 },
      to: { opacity: 1, x: 0 }
    },
    fadeInRight: {
      from: { opacity: 0, x: 50 },
      to: { opacity: 1, x: 0 }
    },
    scaleIn: {
      from: { opacity: 0, scale: 0.8 },
      to: { opacity: 1, scale: 1 }
    },
    slideInUp: {
      from: { y: 100, opacity: 0 },
      to: { y: 0, opacity: 1 }
    },
    bounceIn: {
      from: { opacity: 0, scale: 0.3 },
      to: { opacity: 1, scale: 1 }
    }
  };

  const { contextSafe } = useGSAP(() => {
    if (trigger === 'mount') {
      animateElements();
    }
  }, { scope: containerRef });

  const animateElements = contextSafe(() => {
    const elements = elementsRef.current.filter(Boolean);
    if (elements.length === 0) return;

    const animConfig = animations[animation] || animations.fadeInUp;
    
    // Set initial state
    gsap.set(elements, animConfig.from);
    
    // Animate to final state
    gsap.to(elements, {
      ...animConfig.to,
      duration,
      delay,
      stagger,
      ease: eases.smooth
    });
  });

  // Context-safe function for hover animations
  const handleHover = contextSafe((isEntering) => {
    const elements = elementsRef.current.filter(Boolean);
    
    gsap.to(elements, {
      scale: isEntering ? 1.05 : 1,
      duration: durations.fast,
      ease: eases.smooth
    });
  });

  // Context-safe scramble effect
  const handleScramble = contextSafe((element, shouldScramble) => {
    if (!element.dataset.originalText) {
      element.dataset.originalText = element.textContent;
    }
    
    if (shouldScramble) {
      animationUtils.scrambleText(element, element.dataset.originalText, {
        duration: 0.6,
        ease: eases.smooth
      });
    } else {
      element.textContent = element.dataset.originalText;
    }
  });

  // Helper function to add refs to child elements
  const addToRefs = (el) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  // Clone children and add refs
  const enhancedChildren = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        ref: addToRefs,
        onMouseEnter: trigger === 'hover' ? () => handleHover(true) : child.props.onMouseEnter,
        onMouseLeave: trigger === 'hover' ? () => handleHover(false) : child.props.onMouseLeave,
        'data-animation-index': index
      });
    }
    return child;
  });

  return (
    <div ref={containerRef} className={className} {...props}>
      {enhancedChildren}
    </div>
  );
};

// Higher-order component for text scramble effects
export const ScrambleText = ({ 
  children, 
  className = '',
  triggerOn = 'hover',
  ...props 
}) => {
  const textRef = useRef();
  
  const { contextSafe } = useGSAP(() => {
    const element = textRef.current;
    if (!element) return;
    
    // Store original text
    element.dataset.originalText = element.textContent;
  });

  const handleScramble = contextSafe((shouldScramble) => {
    const element = textRef.current;
    if (!element) return;
    
    if (shouldScramble) {
      animationUtils.scrambleText(element, element.dataset.originalText, {
        duration: 0.8,
        ease: eases.smooth
      });
    } else {
      element.textContent = element.dataset.originalText;
    }
  });

  const eventHandlers = triggerOn === 'hover' ? {
    onMouseEnter: () => handleScramble(true),
    onMouseLeave: () => handleScramble(false)
  } : {};

  return (
    <span 
      ref={textRef} 
      className={className} 
      {...eventHandlers}
      {...props}
    >
      {children}
    </span>
  );
};

// Preset components for common animations
export const FadeInText = (props) => (
  <AnimatedText animation="fadeInUp" {...props} />
);

export const BounceInText = (props) => (
  <AnimatedText animation="bounceIn" ease={eases.bounce} {...props} />
);

export const SlideInText = (props) => (
  <AnimatedText animation="slideInUp" {...props} />
);

export default AnimatedText;
