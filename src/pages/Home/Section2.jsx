import React from "react";
import image from "../../assets/image2.png"
import { Link } from "react-router-dom"

const Section2 = () => {
  return (
        <div class="max-w-screen-2xl flex flex-row items-center justify-center mx-auto gap-[40px] p-44">
            <div className="flex flex-col w-1/2">
                <h2 className="headline pb-4">Here is another headline <span className="headline-fancy">Bruh</span></h2>
                <p className="pb-16">Here is an additional paragraph of lackluster rough draft copy. This paragraph is slightly different but not by much. This paragraph will give a brief introduction to various things against the machine once again.</p>
                <Link 
                    to="/contact"
                    className="button self-start"><span>Let's Talk</span>
                </Link>
            </div>
            <div className="flex flex-col w-1/2">
                <img src={image} alt="" className="w-[380px] self-end"/>
            </div>
        </div> 
  )
}

export default Section2;

