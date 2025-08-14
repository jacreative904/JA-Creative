import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

// Register the useGSAP plugin globally
gsap.registerPlugin(useGSAP);

// Global GSAP configuration
gsap.config({
  // Improve performance by reducing precision for transforms
  autoSleep: 60,
  force3D: false,
  nullTargetWarn: false,
});

// Common easing functions
export const eases = {
  smooth: "power2.out",
  bounce: "back.out(1.7)",
  elastic: "elastic.out(1, 0.3)",
  quick: "power3.out",
  slow: "power1.inOut"
};

// Common durations
export const durations = {
  fast: 0.3,
  medium: 0.6,
  slow: 1.0,
  verySlow: 1.5
};

// Animation utility functions
export const animationUtils = {
  // Create a smooth cursor tracker
  createCursorTracker: (element, options = {}) => {
    const { duration = 0.6, ease = "power3" } = options;
    return {
      x: gsap.quickTo(element, "x", { duration, ease }),
      y: gsap.quickTo(element, "y", { duration, ease })
    };
  },

  // Create a quick setter for frequently updated properties
  createQuickSetter: (target, property, unit = "") => {
    return gsap.quickSetter(target, property, unit);
  },

  // Scramble text effect with GSAP
  scrambleText: (element, finalText, options = {}) => {
    const { 
      chars = "abcdefghijklmnopqrstuvwxyz",
      duration = 0.6,
      ease = "none"
    } = options;
    
    let iteration = 0;
    const originalText = finalText;
    
    return gsap.to({}, {
      duration,
      ease,
      onUpdate: function() {
        const progress = this.progress();
        const targetIteration = originalText.length * progress;
        
        element.textContent = originalText
          .split("")
          .map((letter, index) => {
            if (index < targetIteration) {
              return originalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");
          
        if (progress === 1) {
          element.textContent = originalText;
        }
      }
    });
  }
};

export default gsap;
