import React from "react";
import Button from "./Button";


const TwoColumnAlt = (props) => {

return (
    <div class="flex flex-col p-4 gap-8 min-h-[90dvh] justify-center lg:flex-row lg:items-center lg:gap-20 lg:max-w-[90vw]">
            <div className="flex flex-col">
                <img src={ props.img } alt={ props.alt } className="two-col-img"/>
            </div>
            <div className="flex flex-col max-w-[80vw] md:max-w-[70vw] lg:max-w-[40vw] xl:max-w-[30vw]">
                <h2 className="headline text-left">{ props.normalText } <span className="headline-fancy">{ props.fancyText }</span></h2>
                <p className="body-text pb-12">{ props.bodyText }</p>
                <Button 
                    to={ props.link }
                    linkText={ props.linkText }
                    className="self-end"                
                />
            </div>
        </div> 
  )
}

export default TwoColumnAlt;
