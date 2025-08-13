import React from "react";
import Button from "./Button";

const TwoColumnSimple = (props) => {
  return (
    <div className="flex flex-col-reverse p-4 gap-8 min-h-[90dvh] justify-center lg:flex-row lg:items-center lg:gap-20 lg:max-w-[90vw]">
      <div className="flex flex-col max-w-[80vw] md:max-w-[70vw] lg:max-w-[40vw] xl:max-w-[30vw]">
        <h2 className="headline">
          <span>{props.normalText}</span> 
          <span className="headline-fancy">{props.fancyText}</span>
        </h2>
        <p className="body-text pb-12">{props.bodyText}</p>
        <div>
          <Button 
            to={props.link}
            linkText={props.linkText}                
          />
        </div>
      </div>
      <div className="flex flex-col">
        <img src={props.img} alt={props.alt} className="two-col-img"/>
      </div>
    </div> 
  );
};

export default TwoColumnSimple;
