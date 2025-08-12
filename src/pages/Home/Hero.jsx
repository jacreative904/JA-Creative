import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const Hero = () => {
  const container = useRef();

  // Custom scramble effect function
  const scrambleText = (element, finalText, duration = 1) => {
    const chars = "abcdefghijklmnopqrstuvwxyz";
    const originalText = finalText;
    let iteration = 0;
    
    const interval = setInterval(() => {
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
        clearInterval(interval);
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

    const handleAboutMouseEnter = () => {
      phrase1Elements.forEach(element => {
        const originalText = element.textContent;
        // Change color based on theme
        gsap.to(element, {
          color: getHoverColor(),
          duration: 0.3
        });
        // Apply scramble effect
        scrambleText(element, originalText, 1);
      });
    };

    const handleAboutMouseLeave = () => {
      phrase1Elements.forEach(element => {
        // Reset color
        gsap.to(element, {
          color: 'inherit',
          duration: 0.3
        });
      });
    };

    const handleSkillsMouseEnter = () => {
      phrase2Elements.forEach(element => {
        const originalText = element.textContent;
        // Change color based on theme
        gsap.to(element, {
          color: getHoverColor(),
          duration: 0.3
        });
        // Apply scramble effect
        scrambleText(element, originalText, 1);
      });
    };

    const handleSkillsMouseLeave = () => {
      phrase2Elements.forEach(element => {
        // Reset color
        gsap.to(element, {
          color: 'inherit',
          duration: 0.3
        });
      });
    };

    const handleProjectsMouseEnter = () => {
      phrase3Elements.forEach(element => {
        const originalText = element.textContent;
        // Change color based on theme
        gsap.to(element, {
          color: getHoverColor(),
          duration: 0.3
        });
        // Apply scramble effect
        scrambleText(element, originalText, 1);
      });
    };

    const handleProjectsMouseLeave = () => {
      phrase3Elements.forEach(element => {
        // Reset color
        gsap.to(element, {
          color: 'inherit',
          duration: 0.3
        });
      });
    };

    const handleContactMouseEnter = () => {
      phrase4Elements.forEach(element => {
        const originalText = element.textContent;
        // Change color based on theme
        gsap.to(element, {
          color: getHoverColor(),
          duration: 0.3
        });
        // Apply scramble effect
        scrambleText(element, originalText, 1);
      });
    };

    const handleContactMouseLeave = () => {
      phrase4Elements.forEach(element => {
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
            <div className="flex flex-row">        
                <h1 className="hero-headline sm:max-w-[900px]" style={{lineHeight: '0.9'}}>
                  <div className="hero-line" style={{lineHeight: '0.9'}}><span className="phrase1">a</span>ny time things seem</div>
                  <div className="hero-line" style={{lineHeight: '0.9'}}>a <span className="phrase1">bit</span> <span className="phrase2">stuff</span>y, open a</div>
                  <div className="hero-line" style={{lineHeight: '0.9'}}>window <span className="phrase1">about</span> <span className="phrase2">i</span>t. View</div>
                  <div className="hero-line" style={{lineHeight: '0.9'}}>the la<span className="phrase1">me</span> with <span className="phrase2">can</span>dor</div>
                  <div className="hero-line" style={{lineHeight: '0.9'}}>& <span className="phrase3">check</span> it at the <span className="phrase2">do</span>or.</div>
                  <div className="hero-line" style={{lineHeight: '0.9'}}>Stand <span className="phrase3">out</span> by knowing</div>
                  <div className="hero-line" style={{lineHeight: '0.9'}}>perfection is a <span className="phrase3">my</span>th.</div>
                  <div className="hero-line" style={{lineHeight: '0.9'}}><span className="phrase3 phrase4">Work</span> the rules over</div>
                  <div className="hero-line" style={{lineHeight: '0.9'}}><span className="phrase4">with</span> abandon & most</div>
                  <div className="hero-line" style={{lineHeight: '0.9'}}>of all, Make a <span className="phrase4">me</span>ss.</div>
                </h1>
            </div>
        </div>
    </>
  )
}

export default Hero;
