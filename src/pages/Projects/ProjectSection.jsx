import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ProjectSection = ({ project, index, onViewDetails }) => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  
  // Determine if this section should have image on left or right
  const isImageLeft = index % 2 === 0;

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

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;

    if (!section || !image || !content) return;

    // Set initial states for reveal effect
    gsap.set(image.parentElement, { 
      clipPath: "inset(0 100% 0 0)" // Start with image completely hidden (clipped from right)
    });
    gsap.set(content, { y: 80, x: isImageLeft ? 100 : -100 });

    // Image reveal animation - expands the viewport/container horizontally
    gsap.to(image.parentElement, {
      clipPath: "inset(0 0% 0 0)", // Reveal the full image
      scrollTrigger: {
        trigger: section,
        start: "top 90%", // Start when section is 90% up the page
        end: "top 80%",   // Complete when section is 80% up the page
        scrub: 1,
        invalidateOnRefresh: true
      },
      ease: "none"
    });

    // Content directional animation - no fade, only movement
    gsap.to(content, {
      y: 0,
      x: 0,
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2,
        invalidateOnRefresh: true
      },
      ease: "none"
    });

    // Exit animations for when elements leave viewport
    gsap.to([image.parentElement, content], {
      y: -50,
      scale: 0.95,
      scrollTrigger: {
        trigger: section,
        start: "center top",
        end: "bottom top",
        scrub: 1,
        invalidateOnRefresh: true
      },
      ease: "none"
    });

    // Add hover effect for image
    const handleMouseEnter = () => {
      gsap.to(image, { scale: 1.05, duration: 0.3, ease: "power2.out" });
    };

    const handleMouseLeave = () => {
      gsap.to(image, { scale: 1, duration: 0.3, ease: "power2.out" });
    };

    image.addEventListener('mouseenter', handleMouseEnter);
    image.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      image.removeEventListener('mouseenter', handleMouseEnter);
      image.removeEventListener('mouseleave', handleMouseLeave);
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === section) trigger.kill();
      });
    };
  }, [index, isImageLeft]);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen flex items-center px-8 py-20"
      data-speed={index % 2 === 0 ? "0.8" : "1.2"} // Parallax effect
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
          isImageLeft ? '' : 'lg:grid-flow-col-dense'
        }`}>
          
          {/* Image Section */}
          <div 
            ref={imageRef}
            className={`relative ${isImageLeft ? 'lg:order-1' : 'lg:order-2'}`}
          >
            <div className="aspect-[4/3] overflow-hidden rounded-lg bg-maingrey dark:bg-hovergrey">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback for missing images
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `
                    <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-mainpink to-mainteal">
                      <span class="text-white text-2xl font-bold">${project.type.toUpperCase()}</span>
                    </div>
                  `;
                }}
              />
            </div>
            
            {/* Floating project type badge */}
            <div className={`absolute -top-4 -right-4 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider ${getTypeColor(project.type)}`}>
              {project.type}
            </div>
          </div>

          {/* Content Section */}
          <div 
            ref={contentRef}
            className={`space-y-6 ${isImageLeft ? 'lg:order-2' : 'lg:order-1'}`}
          >
            <div>
              <h2 className="hero-headline text-4xl md:text-5xl lg:text-6xl mb-4 leading-tight">
                {project.title}
              </h2>
              <p className="text-lg md:text-xl text-maintext dark:text-darklight leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 4).map((tech, techIndex) => (
                <span 
                  key={techIndex}
                  className="px-3 py-1 text-sm bg-maingrey dark:bg-hovergrey text-maintext dark:text-darklight rounded-full"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="px-3 py-1 text-sm bg-maingrey dark:bg-hovergrey text-maintext dark:text-darklight rounded-full">
                  +{project.technologies.length - 4} more
                </span>
              )}
            </div>

            {/* View Details Button */}
            <button
              onClick={onViewDetails}
              className="button mt-8"
            >
              <span>View Details</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
