import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageWrapper from '../../components/PageWrapper';
import ProjectModal from './ProjectModal';
import ProjectSectionSimple from '../../components/ProjectSectionSimple';
import { projectsData } from '../../data/projectsData';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const ProjectsPage = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    // Add smooth scrolling behavior to the page
    if (containerRef.current) {
      containerRef.current.style.scrollBehavior = 'smooth';
    }

    // Animate header on page load
    if (headerRef.current) {
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          delay: 0.3
        }
      );

      // Add scroll-responsive header animation tied to scroll progress
      gsap.to(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5, // Smooth scrubbing tied to scroll position
          invalidateOnRefresh: true
        },
        opacity: 0.2,
        scale: 0.9,
        y: -100,
        ease: "none" // Use "none" for scrub animations
      });

      // Add parallax effect to header text
      gsap.to(headerRef.current.children, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2, // Slower parallax effect
          invalidateOnRefresh: true
        },
        y: -50,
        ease: "none"
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const openModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = '';
  };

  return (
    <PageWrapper>
      <div data-page="projects" ref={containerRef} className="smooth-scroll">
        {/* Header Section */}
        <section className="min-h-screen flex items-center justify-center px-8 py-20">
          <div ref={headerRef} className="text-center max-w-4xl">
            <h1 className="hero-headline text-6xl md:text-8xl lg:text-9xl mb-6">
              PROJECTS
            </h1>
            <p className="text-xl md:text-2xl text-maintext dark:text-darklight max-w-2xl mx-auto leading-relaxed">
              A showcase of creative solutions, innovative designs, and impactful digital experiences.
            </p>
          </div>
        </section>

        {/* Project Sections using ProjectSectionSimple */}
        {projectsData.map((project, index) => (
          <ProjectSectionSimple
            key={project.id}
            title={project.title}
            description={project.description}
            image={project.image}
            imageAlt={project.title}
            type={project.type}
            technologies={project.technologies}
            buttonText="View Details"
            onButtonClick={() => openModal(project)}
            imageLeft={index % 2 === 0}
          />
        ))}

        {/* Project Modal */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={closeModal}
          />
        )}
      </div>
    </PageWrapper>
  );
};

export default ProjectsPage;
