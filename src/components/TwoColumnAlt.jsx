import React, { useEffect, useRef } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);

const TwoColumnAlt = (props) => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const fancyTextRef = useRef(null);
  const bodyTextRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const fancyText = fancyTextRef.current;
    const bodyText = bodyTextRef.current;
    const button = buttonRef.current;
    const image = imageRef.current;

    if (!section) return;

    // Set initial states
    gsap.set([headline, fancyText, bodyText, button, image], {
      opacity: 0,
      y: 50
    });

    gsap.set(image, { x: 50 }); // Image slides in from right (opposite of TwoColumn)

    // Create scroll-triggered timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Animate elements in sequence
    tl.to(image, {
      opacity: 1,
      y: 0,
      x: 0,
      duration: 1,
      ease: "power2.out"
    })
    .to(headline, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.6")
    .to(fancyText, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: "back.out(1.7)"
    }, "-=0.4")
    .to(bodyText, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.3")
    .to(button, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.2");

    // Cleanup
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

return (
    <div ref={sectionRef} className="flex flex-col p-4 gap-8 min-h-[90dvh] justify-center lg:flex-row lg:items-center lg:gap-20 lg:max-w-[90vw]">
            <div className="flex flex-col">
                <img ref={imageRef} src={ props.img } alt={ props.alt } className="two-col-img will-animate"/>
            </div>
            <div className="flex flex-col max-w-[80vw] md:max-w-[70vw] lg:max-w-[40vw] xl:max-w-[30vw]">
                <h2 className="headline text-left will-animate">
                  <span ref={headlineRef}>{ props.normalText }</span> 
                  <span ref={fancyTextRef} className="headline-fancy">{ props.fancyText }</span>
                </h2>
                <p ref={bodyTextRef} className="body-text pb-12 will-animate">{ props.bodyText }</p>
                <div ref={buttonRef} className="will-animate">
                  <Button 
                      to={ props.link }
                      linkText={ props.linkText }
                      className="self-end"                
                  />
                </div>
            </div>
        </div> 
  )
}

export default TwoColumnAlt;
