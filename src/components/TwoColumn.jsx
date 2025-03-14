import React from "react";
import Button from "./Button";


const TwoColumn = (props) => {

return (
    <div class="flex flex-col-reverse p-4 gap-8 min-h-[100dvh] justify-center">
            <div className="flex flex-col md:max-w-[70vw]">
                <h2 className="headline">{ props.normalText } <span className="headline-fancy">{ props.fancyText }</span></h2>
                <p className="body-text pb-12">{ props.bodyText }</p>
                <Button 
                    to={ props.link }
                    linkText={ props.linkText }                
                />
            </div>
            <div className="flex flex-col">
                <img src={ props.img } alt={ props.alt } className="two-col-img"/>
            </div>
        </div> 
  )
}

export default TwoColumn;

