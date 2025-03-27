import React from "react";

const Hero = () => {

  return (
    <>
    <div className="flex flex-col p-4 justify-center lg:justify-end bg-[url('./assets/light_squiggle.png')] dark:bg-[url('./assets/dark-squiggle.png')] bg-no-repeat bg-center bg-contain h-[calc(100dvh-78px)]">
            <div className="flex flex-row">        
                <h1 className="hero-headline-thin sm:max-w-[80vw]">Let's Make <br></br><span className="whitespace-nowrap">Some <span className="hero-headline-fancy">Classy </span></span></h1>
            </div>
    
            <div className="flex flex-col gap-4 lg:flex-row">
                <h1 className="hero-headline">Creative</h1>
                <p className="hero-body-text max-w-[70vw] md:max-w-[70vw] xl:max-w-[35vw] mt-[-5px]">Here is an additional and then another dang paragraph of lackluster rough <span className="whitespace-nowrap">draft copy.</span></p>
            </div>
        </div>
    </>
  )
}

export default Hero;