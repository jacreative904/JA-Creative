import React from "react";

const Hero = () => {
  return (
    <>
    <div className="mx-auto flex flex-col h-[calc(100vh-78px)] justify-end bg-[url('./assets/squiggle.svg')] bg-no-repeat bg-center bg-contain max-w-screen-5xl p-4">
            <div className="max-w-screen-2xl self-center">        
                <h1 className="hero-headline-thin leading-60">Let's Make Some <span className="hero-headline-fancy">Classy </span></h1>
            </div>
    
            <div className="flex flex-row max-w-screen-2xl self-center gap-8">
                <h1 className="hero-headline max-w-3/4">Creative</h1>
                <p className="hero-body-text pt-2">Here is an additional and then another dang paragraph of lackluster rough draft copy. This paragraph will give a brief introduction to various things against the machine once again.</p>
            </div>
        </div>
    </>
  )
}

export default Hero;