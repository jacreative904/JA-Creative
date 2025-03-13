import React from "react";
import image from "../assets/image2.png"
import Button from "./Button";


const TwoColumn = (props) => {

return (
    <div class="max-w-screen-2xl flex flex-row items-center justify-center mx-auto gap-[40px] p-44">
            <div className="flex flex-col w-1/2">
                <h2 className="headline pb-4">{ props.normalText } <span className="headline-fancy">{ props.fancyText }</span></h2>
                <p className="pb-16">{ props.bodyText }</p>
                <Button 
                    to={ props.link }
                    linkText={ props.linkText }                
                />
            </div>
            <div className="flex flex-col w-1/2">
                <img src={image} alt="" className="w-[380px] self-end"/>
            </div>
        </div> 
  )
}

export default TwoColumn;

