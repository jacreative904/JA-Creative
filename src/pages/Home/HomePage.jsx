import React from 'react'
import Hero from './Hero'
import TwoColumn from '../../components/TwoColumn'
import image2 from '../../assets/image2.png'
import image3 from '../../assets/image3.png'
import TwoColumnAlt from '../../components/TwoColumnAlt'

const twoColumn = {
     headline : {
         normalText: "Here is another Headline",
         fancyText: "Sonofagun"
     },
 
     bodyText: "Here is an additional paragraph of lackluster rough draft copy. This paragraph is slightly different but not by much. This paragraph will give a brief introduction to various things against the machine once again.",
 
     buttonInfo : {
         link: "/contact",
         linkText: "Get in Touch"
     },

     img : {
          fileName: image2,
          altTag: "skyscraper building"
     },
 };

 const twoColumnAlt = {
     headline : {
         normalText: "Don't do anything utterly",
         fancyText: "Crazy"
     },
 
     bodyText: "Here is an additional paragraph of lackluster rough draft copy. This paragraph is slightly different but not by much. This paragraph will give a brief introduction to various things against the machine once again.",
 
     buttonInfo : {
         link: "/about",
         linkText: "Let's Do it"
     },

     img : {
          fileName: image3,
          altTag: "canoe on lake"
     },
 };

const HomePage = ( normalText, fancyText, bodyText, link, linkText ) => {
  return (
          <div>
               <Hero />
               <TwoColumn 
                    normalText={twoColumn.headline.normalText}
                    fancyText={twoColumn.headline.fancyText}
                    bodyText={twoColumn.bodyText}
                    link={twoColumn.buttonInfo.link}
                    linkText={twoColumn.buttonInfo.linkText}
                    img={twoColumn.img.fileName}
                    alt={twoColumn.img.altTag}
               />
               <TwoColumnAlt 
                    normalText={twoColumnAlt.headline.normalText}
                    fancyText={twoColumnAlt.headline.fancyText}
                    bodyText={twoColumnAlt.bodyText}
                    link={twoColumnAlt.buttonInfo.link}
                    linkText={twoColumnAlt.buttonInfo.linkText}
                    img={twoColumnAlt.img.fileName}
                    alt={twoColumnAlt.img.altTag}
               />
          </div>
  )
}

export default HomePage;