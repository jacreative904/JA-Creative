import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ProjectModal = ({ project, onClose }) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);
  const backdropRef = useRef(null);

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
    const modal = modalRef.current;
    const content = contentRef.current;
    const backdrop = backdropRef.current;

    if (!modal || !content || !backdrop) return;

    // Set initial states
    gsap.set(backdrop, { opacity: 0 });
    gsap.set(content, { opacity: 0, y: 100, scale: 0.9 });

    // Animate in
    const tl = gsap.timeline();
    tl.to(backdrop, { opacity: 1, duration: 0.3 })
      .to(content, { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 0.5, 
        ease: "back.out(1.7)" 
      }, "-=0.1");

    // Handle escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleClose = () => {
    // Simplified close - just call onClose immediately
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div 
        ref={backdropRef}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleBackdropClick}
      />

      {/* Modal Content */}
      <div 
        ref={contentRef}
        className="relative bg-mainbg dark:bg-maindark rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Project Image */}
        <div className="aspect-[16/9] overflow-hidden rounded-t-lg bg-maingrey dark:bg-hovergrey">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = `
                <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-mainpink to-mainteal">
                  <span class="text-white text-4xl font-bold">${project.type.toUpperCase()}</span>
                </div>
              `;
            }}
          />
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <h2 className="hero-headline text-3xl md:text-4xl lg:text-5xl">
                {project.title}
              </h2>
              <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider ${getTypeColor(project.type)}`}>
                {project.type}
              </span>
            </div>
            <p className="text-lg text-maintext dark:text-darklight leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            {/* Overview */}
            <div>
              <h3 className="text-2xl font-bold mb-4 text-maindark dark:text-darklight">
                Overview
              </h3>
              <p className="text-maintext dark:text-darklight leading-relaxed">
                {project.overview}
              </p>
            </div>

            {/* Challenges */}
            <div>
              <h3 className="text-2xl font-bold mb-4 text-maindark dark:text-darklight">
                Challenges
              </h3>
              <p className="text-maintext dark:text-darklight leading-relaxed">
                {project.challenges}
              </p>
            </div>

            {/* Solutions */}
            <div>
              <h3 className="text-2xl font-bold mb-4 text-maindark dark:text-darklight">
                Solutions
              </h3>
              <p className="text-maintext dark:text-darklight leading-relaxed">
                {project.solutions}
              </p>
            </div>

            {/* Results */}
            <div>
              <h3 className="text-2xl font-bold mb-4 text-maindark dark:text-darklight">
                Results
              </h3>
              <p className="text-maintext dark:text-darklight leading-relaxed">
                {project.results}
              </p>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="text-2xl font-bold mb-4 text-maindark dark:text-darklight">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-maingrey dark:bg-hovergrey text-maintext dark:text-darklight rounded-full font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
