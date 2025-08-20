import React, { useRef, memo, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ProjectSectionSimple = memo(({ 
  title, 
  description, 
  image, 
  imageAlt, 
  type, 
  technologies = [], 
  buttonText = "View Details", 
  onButtonClick,
  imageLeft = true 
}) => {
  const container = useRef();

  useGSAP(() => {
    const imageContainer = container.current.querySelector('.image-container');
    const contentSection = container.current.querySelector('.content-section');

    // Set initial states for reveal effect
    gsap.set(imageContainer, { 
      clipPath: "inset(0 100% 0 0)" // Start with image completely hidden (clipped from right)
    });
    gsap.set(contentSection, { y: 80, x: imageLeft ? 100 : -100 });

    // Fast image reveal timeline - starts when section is a quarter up the page
    const imageTl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%", // Start when section is 25% up the page (quarter way up)
        end: "top 70%", // Still completes when top is 40% up (same end point)
        scrub: 1.2,
        invalidateOnRefresh: true
      }
    });

    imageTl.to(imageContainer, {
      clipPath: "inset(0 0% 0 0)", // Reveal the full image quickly
      ease: "none",
      duration: 1
    });

    // Content animation timeline - completes when image is halfway up the page
    const contentTl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "top 50%", // Text fully centered when image is halfway up (50% from bottom)
        scrub: 1.2,
        invalidateOnRefresh: true
      }
    });

    contentTl.to(contentSection, {
      y: 0,
      x: 0,
      ease: "none",
      duration: 1
    });

    // Separate exit animation timeline (removed scale to prevent conflict with parallax)
    const exitTl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "center top",
        end: "bottom top",
        scrub: 1,
        invalidateOnRefresh: true
      }
    });

    exitTl.to([imageContainer, contentSection], {
      y: -50,
      ease: "none",
      duration: 1
    });
  }, { scope: container, dependencies: [imageLeft] });

  // Get project type styling
  const getTypeColor = (type) => {
    const colors = {
      website: 'bg-mainteal text-mainbg',
      'print ad': 'bg-mainpink text-mainbg',
      'digital banner': 'bg-mainyellow text-maindark',
      branding: 'bg-purple-500 text-white',
      'web development': 'bg-blue-500 text-white',
      animation: 'bg-green-500 text-white',
      'motion design': 'bg-orange-500 text-white'
    };
    return colors[type] || 'bg-maingrey text-maindark';
  };

  return (
    <section ref={container} className="min-h-screen flex items-center px-8 py-20 bg-mainbg dark:bg-maindark">
      <div className="max-w-7xl mx-auto w-full">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
          imageLeft ? '' : 'lg:grid-flow-col-dense'
        }`}>
          
          {/* Image Section */}
          <div className={`relative ${imageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
            <div 
              className="image-container aspect-[4/4] overflow-hidden rounded-lg bg-maingrey dark:bg-hovergrey"
              style={{
                transform: 'translateZ(0)', // Force hardware acceleration
                backfaceVisibility: 'hidden' // Prevent flickering
              }}
            >
              <img 
                src={image} 
                alt={imageAlt}
                className="w-full h-full object-contain transform-gpu"
                style={{
                  transformOrigin: 'center center',
                  willChange: 'transform' // Optimize for animations
                }}
                onError={(e) => {
                  // Fallback for missing images
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `
                    <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-mainpink to-mainteal">
                      <span class="text-white text-2xl font-bold">${type ? type.toUpperCase() : 'PROJECT'}</span>
                    </div>
                  `;
                }}
              />
            </div>
            
            {/* Floating project type badge */}
            {type && (
              <div className={`absolute -top-4 -right-4 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider ${getTypeColor(type)}`}>
                {type}
              </div>
            )}
          </div>

          {/* Content Section */}
          <div 
            className={`content-section space-y-6 ${imageLeft ? 'lg:order-2' : 'lg:order-1'}`}
            style={{
              transform: 'translateZ(0)', // Force hardware acceleration
              backfaceVisibility: 'hidden', // Prevent flickering
              perspective: '1000px' // Improve 3D rendering
            }}
          >
            <div>
              <h2 className="hero-headline text-4xl md:text-5xl lg:text-6xl mb-4 leading-tight">
                {title}
              </h2>
              <p className="text-lg md:text-xl text-maintext dark:text-darklight leading-relaxed">
                {description}
              </p>
            </div>

            {/* Technologies */}
            {technologies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {technologies.slice(0, 4).map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="px-3 py-1 text-sm bg-maingrey dark:bg-hovergrey text-maintext dark:text-darklight rounded-full"
                  >
                    {tech}
                  </span>
                ))}
                {technologies.length > 4 && (
                  <span className="px-3 py-1 text-sm bg-maingrey dark:bg-hovergrey text-maintext dark:text-darklight rounded-full">
                    +{technologies.length - 4} more
                  </span>
                )}
              </div>
            )}

            {/* Button */}
            {onButtonClick && (
              <button
                onClick={onButtonClick}
                className="button mt-8"
              >
                <span>{buttonText}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

export default ProjectSectionSimple;
