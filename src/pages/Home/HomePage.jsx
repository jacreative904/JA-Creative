import React from 'react'
import Hero from './Hero'
import Section2 from './Section2'
import Section3 from './Section3'
import TwoColumn from '../../components/TwoColumn'

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
 };

const HomePage = ( normalText, fancyText, bodyText, link, linkText ) => {
  return (
          <div>
               <Hero />
               <Section2 />
               <Section3 />
               <TwoColumn 
                    normalText={twoColumn.headline.normalText}
                    fancyText={twoColumn.headline.fancyText}
                    bodyText={twoColumn.bodyText}
                    link={twoColumn.buttonInfo.link}
                    linkText={twoColumn.buttonInfo.linkText}
               />
          </div>
  )
}

export default HomePage;