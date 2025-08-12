import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const Hero = () => {
  const container = useRef();

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

  return (
    <>
    <div ref={container} className="flex flex-col p-4 justify-end h-[calc(100dvh-78px)]">
            <div className="flex flex-row">        
                <h1 className="hero-headline sm:max-w-[900px]">
                  <div className="hero-line"><span class="phrase1">a</span>ny time things seem</div>
                  <div className="hero-line">a <span class="phrase1">bit</span> stuffy, open a</div>
                  <div className="hero-line">window <span class="phrase1">about</span> it. View</div>
                  <div className="hero-line">the la<span class="phrase1">me</span> with candor</div>
                  <div className="hero-line">& check it at the door.</div>
                  <div className="hero-line">Stand out by knowing</div>
                  <div className="hero-line">perfection is a myth.</div>
                  <div className="hero-line">Work the rules over</div>
                  <div className="hero-line">with abandon & most</div>
                  <div className="hero-line">of all, Make a mess.</div>
                </h1>
            </div>
        </div>
    </>
  )
}

export default Hero;
