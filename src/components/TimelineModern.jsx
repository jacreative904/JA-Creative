import React, { useEffect, useRef } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MdWork, MdBusiness, MdTrendingUp, MdDesignServices } from 'react-icons/md';

gsap.registerPlugin(ScrollTrigger);

const TimelineModern = ({ timelineData }) => {
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    
    if (!section || !timelineData) return;

    // Set initial states for all items
    itemRefs.current.forEach((item, index) => {
      if (!item) return;
      
      const card = item.querySelector('.timeline-card');
      const icon = item.querySelector('.timeline-icon');
      const tag = item.querySelector('.timeline-tag');
      const headline = item.querySelector('.timeline-headline');
      const bullets = item.querySelectorAll('.timeline-bullet');
      
      // Set initial states
      gsap.set(card, { 
        opacity: 0, 
        y: 50,
        scale: 0.9
      });
      
      gsap.set([icon, tag, headline, ...bullets], {
        opacity: 0,
        y: 20
      });
      
      gsap.set(icon, { scale: 0.5, rotation: -10 });
    });

    // Create scroll-triggered animations for each item
    itemRefs.current.forEach((item, index) => {
      if (!item) return;
      
      const card = item.querySelector('.timeline-card');
      const icon = item.querySelector('.timeline-icon');
      const tag = item.querySelector('.timeline-tag');
      const headline = item.querySelector('.timeline-headline');
      const bullets = item.querySelectorAll('.timeline-bullet');
      
      const itemTl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        }
      });
      
      itemTl
        .to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out"
        })
        .to(icon, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          ease: "back.out(1.7)"
        }, "-=0.6")
        .to(tag, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.4")
        .to(headline, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.3")
        .to(bullets, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out"
        }, "-=0.4");
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger && itemRefs.current.includes(trigger.trigger)) {
          trigger.kill();
        }
      });
    };
  }, [timelineData]);

  const getIcon = (iconType) => {
    const iconProps = { className: "w-10 h-10 text-mainbg dark:text-darkbg" };
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
    <div ref={sectionRef} className="py-20 px-4 max-w-7xl mx-auto">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
        {timelineData.map((item, index) => (
          <div
            key={index}
            ref={el => itemRefs.current[index] = el}
            className="timeline-item"
          >
            <div className="timeline-card bg-mainbg dark:bg-darkbg border-2 border-maingrey dark:border-darkgrey rounded-lg p-6 h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
              {/* Icon */}
              <div className="timeline-icon w-16 h-16 bg-mainpink dark:bg-darkteal rounded-full flex items-center justify-center mb-4 mx-auto">
                {getIcon(item.icon)}
              </div>

              {/* Tag */}
              <div className="timeline-tag text-center text-sm font-mono text-maintext dark:text-darklight opacity-70 mb-3">
                {item.tag}
              </div>
              
              {/* Headline */}
              <h3 className="timeline-headline headline text-xl lg:text-2xl text-center mb-6">
                {item.headline}
              </h3>
              
              {/* Bullets */}
              <ul className="space-y-3">
                {item.bullets.map((bullet, bulletIndex) => (
                  <li 
                    key={bulletIndex}
                    className="timeline-bullet flex items-start text-maintext dark:text-darklight text-sm"
                  >
                    <span className="text-mainpink dark:text-darkteal mr-3 mt-1 text-lg">•</span>
                    <span className="font-text leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineModern;
