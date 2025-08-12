import React, { useEffect, useRef } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MdWork, MdBusiness, MdTrendingUp, MdDesignServices } from 'react-icons/md';

gsap.registerPlugin(ScrollTrigger);

const TimelineTraditional = ({ timelineData }) => {
  const sectionRef = useRef(null);
  const timelineLineRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const timelineLine = timelineLineRef.current;
    
    if (!section || !timelineData) return;

    // Set initial states
    gsap.set(timelineLine, { scaleY: 0, transformOrigin: "top" });
    
    // Set initial states for all timeline items
    itemRefs.current.forEach((item, index) => {
      if (!item) return;
      
      const icon = item.querySelector('.timeline-icon');
      const tag = item.querySelector('.timeline-tag');
      const headline = item.querySelector('.timeline-headline');
      const bullets = item.querySelectorAll('.timeline-bullet');
      
      // Set initial states
      gsap.set([icon, tag, headline, ...bullets], {
        opacity: 0,
        y: 30
      });
      
      gsap.set(icon, { scale: 0.5 });
    });

    // Create scroll-triggered timeline line animation
    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      end: "bottom 20%",
      scrub: 1, // Smooth scrubbing, takes 1 second to "catch up" to the scrollbar
      animation: gsap.to(timelineLine, {
        scaleY: 1,
        duration: 1,
        ease: "none"
      })
    });

    // Create individual scroll-triggered animations for each timeline item
    itemRefs.current.forEach((item, index) => {
      if (!item) return;
      
      const icon = item.querySelector('.timeline-icon');
      const tag = item.querySelector('.timeline-tag');
      const headline = item.querySelector('.timeline-headline');
      const bullets = item.querySelectorAll('.timeline-bullet');
      
      // Create timeline for this item
      const itemTl = gsap.timeline();
      
      itemTl
        .to(icon, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "back.out(1.7)"
        })
        .to(tag, {
          opacity: 1,
          y: 0,
          duration: 0.2,
          ease: "power2.out"
        }, "-=0.1")
        .to(headline, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        }, "-=0.1")
        .to(bullets, {
          opacity: 1,
          y: 0,
          duration: 0.2,
          stagger: 0.05,
          ease: "power2.out"
        }, "-=0.2");

      // Create ScrollTrigger for this item with scrub
      ScrollTrigger.create({
        trigger: item,
        start: "top 85%",
        end: "top 30%",
        scrub: 0.5, // Smooth scrubbing for individual items
        animation: itemTl
      });
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === section || itemRefs.current.includes(trigger.trigger)) {
          trigger.kill();
        }
      });
    };
  }, [timelineData]);

  const getIcon = (iconType) => {
    const iconProps = { className: "w-8 h-8 text-mainpink dark:text-darkteal" };
    switch (iconType) {
      case 'work': return <MdWork {...iconProps} />;
      case 'business': return <MdBusiness {...iconProps} />;
      case 'trending': return <MdTrendingUp {...iconProps} />;
      case 'design': return <MdDesignServices {...iconProps} />;
      default: return <MdWork {...iconProps} />;
    }
  };

  if (!timelineData || timelineData.length === 0) return null;

  return (
    <div ref={sectionRef} className="py-20 px-4 max-w-6xl mx-auto">
      <div className="relative">
        {/* Timeline Line */}
        <div 
          ref={timelineLineRef}
          className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-mainpink dark:bg-darkteal h-full hidden lg:block"
        />
        
        {/* Mobile Timeline Line */}
        <div 
          ref={timelineLineRef}
          className="absolute left-8 w-1 bg-mainpink dark:bg-darkteal h-full lg:hidden"
        />

        {/* Timeline Items */}
        <div className="space-y-16 lg:space-y-24">
          {timelineData.map((item, index) => (
            <div
              key={index}
              ref={el => itemRefs.current[index] = el}
              className={`relative flex flex-col lg:flex-row lg:items-center ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Icon */}
              <div className="timeline-icon absolute left-4 lg:left-1/2 lg:transform lg:-translate-x-1/2 w-16 h-16 bg-mainbg dark:bg-darkbg border-4 border-mainpink dark:border-darkteal rounded-full flex items-center justify-center z-10">
                {getIcon(item.icon)}
              </div>

              {/* Content */}
              <div className={`ml-20 lg:ml-0 lg:w-1/2 ${
                index % 2 === 0 ? 'lg:pr-16' : 'lg:pl-16'
              }`}>
                <div className="timeline-tag text-sm font-mono text-maintext dark:text-darklight opacity-70 mb-2">
                  {item.tag}
                </div>
                
                <h3 className="timeline-headline headline text-2xl lg:text-3xl mb-4">
                  {item.headline}
                </h3>
                
                <ul className="space-y-2">
                  {item.bullets.map((bullet, bulletIndex) => (
                    <li 
                      key={bulletIndex}
                      className="timeline-bullet flex items-start text-maintext dark:text-darklight"
                    >
                      <span className="text-mainpink dark:text-darkteal mr-3 mt-1">•</span>
                      <span className="font-text leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimelineTraditional;
