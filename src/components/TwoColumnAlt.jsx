import React from "react";
import Button from "./Button";


const TwoColumnAlt = (props) => {

return (
    <div class="flex flex-col p-4 gap-8 min-h-[100dvh] justify-center">
            <div className="flex flex-col items-end">
                <img src={ props.img } alt={ props.alt } className="two-col-img"/>
            </div>
            <div className="flex flex-col items-end md:max-w-[70vw] md:justify-end">
                <h2 className="headline text-right">{ props.normalText } <span className="headline-fancy">{ props.fancyText }</span></h2>
                <p className="body-text pb-12 text-right">{ props.bodyText }</p>
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
