import React, { useEffect, useRef } from "react";
import { gsap } from 'gsap';
import { splitTextIntoWords } from '../../utils/textSplitter';

const Hero = () => {
  const heroRef = useRef(null);
  const letsMakeRef = useRef(null);
  const someRef = useRef(null);
  const classyRef = useRef(null);
  const creativeRef = useRef(null);
  const bodyTextRef = useRef(null);

  useEffect(() => {
    // Split text into words for animation
    const letsMakeWords = splitTextIntoWords(letsMakeRef.current);
    const someWords = splitTextIntoWords(someRef.current);
    const classyWords = splitTextIntoWords(classyRef.current);
    const creativeWords = splitTextIntoWords(creativeRef.current);
    const bodyWords = splitTextIntoWords(bodyTextRef.current);

    // Create timeline for hero animations
    const tl = gsap.timeline({ delay: 1.2 }); // Start after navbar animation

    // Animate "Let's Make" first
    tl.fromTo(letsMakeWords, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      }
    )
    // Then "Some"
    .fromTo(someWords,
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6,
        stagger: 0.05,
        ease: "power2.out"
      }, "-=0.3"
    )
    // "Classy" with bounce effect
    .fromTo(classyWords,
      { opacity: 0, y: 50, scale: 0.8 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 1,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }, "-=0.2"
    )
    // "Creative" 
    .fromTo(creativeWords,
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        stagger: 0.05,
        ease: "power2.out"
      }, "-=0.4"
    )
    // Finally body text
    .fromTo(bodyWords,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6,
        stagger: 0.02,
        ease: "power2.out"
      }, "-=0.2"
    );

    // Cleanup function
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <>
    <div ref={heroRef} className="flex flex-col p-4 justify-center lg:justify-end bg-[url('./assets/light_squiggle.png')] dark:bg-[url('./assets/dark-squiggle.png')] bg-no-repeat bg-center bg-contain h-[calc(100dvh-78px)]">
            <div className="flex flex-row">        
                <h1 className="hero-headline-thin sm:max-w-[80vw] will-animate">
                  <span ref={letsMakeRef}>Let's Make</span> <br></br>
                  <span className="whitespace-nowrap">
                    <span ref={someRef}>Some </span>
                    <span ref={classyRef} className="hero-headline-fancy">Classy </span>
                  </span>
                </h1>
            </div>
    
            <div className="flex flex-col gap-4 lg:flex-row">
                <h1 ref={creativeRef} className="hero-headline will-animate">Creative</h1>
                <p ref={bodyTextRef} className="hero-body-text max-w-[70vw] md:max-w-[70vw] xl:max-w-[35vw] mt-[-5px] will-animate">Here is an additional and then another dang paragraph of lackluster rough <span className="whitespace-nowrap">draft copy.</span></p>
            </div>
        </div>
    </>
  )
}

export default Hero;
