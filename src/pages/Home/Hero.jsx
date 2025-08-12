import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const Hero = () => {
  const container = useRef();

  // Custom scramble effect function with proper cleanup
  const scrambleText = (element, finalText) => {
    // Clear any existing scramble interval
    if (element.scrambleInterval) {
      clearInterval(element.scrambleInterval);
    }
    
    const chars = "abcdefghijklmnopqrstuvwxyz";
    const originalText = finalText;
    let iteration = 0;
    
    element.scrambleInterval = setInterval(() => {
      element.textContent = originalText
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return originalText[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");
      
      if (iteration >= originalText.length) {
        clearInterval(element.scrambleInterval);
        element.scrambleInterval = null;
        // Ensure final text is exactly correct
        element.textContent = originalText;
      }
      
      iteration += 1 / 3;
    }, 30);
  };

  useGSAP(
    () => {
      // Animate each line with a stagger effect
      gsap.from(".hero-line", {
        opacity: 0,
        y: 100,
        ease: "back.out(1.7)",
        duration: 1,
        stagger: 0.2,
      });
    },
    { scope: container }
  );

  useEffect(() => {
    // Add hover effect to About link
    const aboutLink = document.querySelector('a[href="/about"]');
    const phrase1Elements = document.querySelectorAll('.phrase1');
    
    // Add hover effect to Skills link
    const skillsLink = document.querySelector('a[href="/skills"]');
    const phrase2Elements = document.querySelectorAll('.phrase2');
    
    // Add hover effect to Projects link
    const projectsLink = document.querySelector('a[href="/projects"]');
    const phrase3Elements = document.querySelectorAll('.phrase3');
    
    // Add hover effect to Contact link
    const contactLink = document.querySelector('a[href="/contact"]');
    const phrase4Elements = document.querySelectorAll('.phrase4');
    
    // Helper function to get the appropriate color based on theme
    const getHoverColor = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      return isDarkMode ? '#F3FF00' : '#F991CC'; // mainyellow for dark, mainpink for light
    };

    // Store original text for all elements
    const storeOriginalText = (elements) => {
      elements.forEach(element => {
        if (!element.dataset.originalText) {
          element.dataset.originalText = element.textContent;
        }
      });
    };

    // Store original text for all phrase elements
    storeOriginalText(phrase1Elements);
    storeOriginalText(phrase2Elements);
    storeOriginalText(phrase3Elements);
    storeOriginalText(phrase4Elements);

    const handleAboutMouseEnter = () => {
      phrase1Elements.forEach(element => {
        const originalText = element.dataset.originalText;
        // Change color based on theme
        gsap.to(element, {
          color: getHoverColor(),
          duration: 0.3
        });
        // Apply scramble effect
        scrambleText(element, originalText);
      });
    };

    const handleAboutMouseLeave = () => {
      phrase1Elements.forEach(element => {
        // Clear any ongoing scramble
        if (element.scrambleInterval) {
          clearInterval(element.scrambleInterval);
          element.scrambleInterval = null;
        }
        // Restore original text
        element.textContent = element.dataset.originalText;
        // Reset color
        gsap.to(element, {
          color: 'inherit',
          duration: 0.3
        });
      });
    };

    const handleSkillsMouseEnter = () => {
      phrase2Elements.forEach(element => {
        const originalText = element.dataset.originalText;
        // Change color based on theme
        gsap.to(element, {
          color: getHoverColor(),
          duration: 0.3
        });
        // Apply scramble effect
        scrambleText(element, originalText);
      });
    };

    const handleSkillsMouseLeave = () => {
      phrase2Elements.forEach(element => {
        // Clear any ongoing scramble
        if (element.scrambleInterval) {
          clearInterval(element.scrambleInterval);
          element.scrambleInterval = null;
        }
        // Restore original text
        element.textContent = element.dataset.originalText;
        // Reset color
        gsap.to(element, {
          color: 'inherit',
          duration: 0.3
        });
      });
    };

    const handleProjectsMouseEnter = () => {
      phrase3Elements.forEach(element => {
        const originalText = element.dataset.originalText;
        // Change color based on theme
        gsap.to(element, {
          color: getHoverColor(),
          duration: 0.3
        });
        // Apply scramble effect
        scrambleText(element, originalText);
      });
    };

    const handleProjectsMouseLeave = () => {
      phrase3Elements.forEach(element => {
        // Clear any ongoing scramble
        if (element.scrambleInterval) {
          clearInterval(element.scrambleInterval);
          element.scrambleInterval = null;
        }
        // Restore original text
        element.textContent = element.dataset.originalText;
        // Reset color
        gsap.to(element, {
          color: 'inherit',
          duration: 0.3
        });
      });
    };

    const handleContactMouseEnter = () => {
      phrase4Elements.forEach(element => {
        const originalText = element.dataset.originalText;
        // Change color based on theme
        gsap.to(element, {
          color: getHoverColor(),
          duration: 0.3
        });
        // Apply scramble effect
        scrambleText(element, originalText);
      });
    };

    const handleContactMouseLeave = () => {
      phrase4Elements.forEach(element => {
        // Clear any ongoing scramble
        if (element.scrambleInterval) {
          clearInterval(element.scrambleInterval);
          element.scrambleInterval = null;
        }
        // Restore original text
        element.textContent = element.dataset.originalText;
        // Reset color
        gsap.to(element, {
          color: 'inherit',
          duration: 0.3
        });
      });
    };

    // Add event listeners
    if (aboutLink && phrase1Elements.length > 0) {
      aboutLink.addEventListener('mouseenter', handleAboutMouseEnter);
      aboutLink.addEventListener('mouseleave', handleAboutMouseLeave);
    }

    if (skillsLink && phrase2Elements.length > 0) {
      skillsLink.addEventListener('mouseenter', handleSkillsMouseEnter);
      skillsLink.addEventListener('mouseleave', handleSkillsMouseLeave);
    }

    if (projectsLink && phrase3Elements.length > 0) {
      projectsLink.addEventListener('mouseenter', handleProjectsMouseEnter);
      projectsLink.addEventListener('mouseleave', handleProjectsMouseLeave);
    }

    if (contactLink && phrase4Elements.length > 0) {
      contactLink.addEventListener('mouseenter', handleContactMouseEnter);
      contactLink.addEventListener('mouseleave', handleContactMouseLeave);
    }

    // Cleanup function
    return () => {
      if (aboutLink) {
        aboutLink.removeEventListener('mouseenter', handleAboutMouseEnter);
        aboutLink.removeEventListener('mouseleave', handleAboutMouseLeave);
      }
      if (skillsLink) {
        skillsLink.removeEventListener('mouseenter', handleSkillsMouseEnter);
        skillsLink.removeEventListener('mouseleave', handleSkillsMouseLeave);
      }
      if (projectsLink) {
        projectsLink.removeEventListener('mouseenter', handleProjectsMouseEnter);
        projectsLink.removeEventListener('mouseleave', handleProjectsMouseLeave);
      }
      if (contactLink) {
        contactLink.removeEventListener('mouseenter', handleContactMouseEnter);
        contactLink.removeEventListener('mouseleave', handleContactMouseLeave);
      }
    };
  }, []);

  return (
    <>
    <div ref={container} className="flex flex-col p-4 justify-end h-[calc(100dvh-78px)]">
            <div className="flex flex-row pb-10">        
                <h1 className="hero-headline sm:max-w-[900px]" style={{lineHeight: '0.8'}}>
                  <div className="hero-line" style={{lineHeight: '0.8'}}><span className="phrase1">a</span>ny time things seem</div>
                  <div className="hero-line" style={{lineHeight: '0.8'}}>a <span className="phrase1">bit</span> <span className="phrase2">stuff</span>y, open a</div>
                  <div className="hero-line" style={{lineHeight: '0.8'}}>window <span className="phrase1">about</span> <span className="phrase2">i</span>t. View</div>
                  <div className="hero-line" style={{lineHeight: '0.8'}}>the la<span className="phrase1">me</span> with <span className="phrase2">can</span>dor</div>
                  <div className="hero-line" style={{lineHeight: '0.8'}}>& <span className="phrase3">check</span> it at the <span className="phrase2">do</span>or.</div>
                  <div className="hero-line" style={{lineHeight: '0.8'}}>Stand <span className="phrase3">out</span> by knowing</div>
                  <div className="hero-line" style={{lineHeight: '0.8'}}>perfection is a <span className="phrase3">my</span>th.</div>
                  <div className="hero-line" style={{lineHeight: '0.8'}}><span className="phrase3 phrase4">Work</span> the rules over</div>
                  <div className="hero-line" style={{lineHeight: '0.8'}}><span className="phrase4">with</span> abandon & most</div>
                  <div className="hero-line" style={{lineHeight: '0.8'}}>of all, Make a <span className="phrase4">me</span>ss.</div>
                </h1>
            </div>
        </div>
    </>
  )
}

export default Hero;
