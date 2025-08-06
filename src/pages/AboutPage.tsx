import AboutBlock from "@/Components/AboutBlock/AboutBlock";
import AboutHeroTitle from "@/Components/AboutHeroTitle/AboutHeroTitle";

import { useEffect } from "react";

export default function AboutPage(): React.JSX.Element {

  useEffect(() => {
    window.scrollTo({
      top:0
    })
  },[])


  return (
    <>
      <AboutHeroTitle />
      <AboutBlock
        imgSrc="/img/AboutBlockImage.jpg"
        title="From a studio in London to a global brand with over 400 outlets"
        paragraph="When we started Avion, the idea was simple. Make high quality furniture affordable and available for the mass market."
        anotherParagraph="Handmade, and lovingly crafted furniture and homeware is what we live, breathe and design so our Chelsea boutique become the hotbed for the London interior design community."  
      />
      <AboutBlock 
        variation="reverse"
        imgSrc="/img/AboutBlock2.jpg"
        title="Our service isn’t just personal, it’s actually hyper personally exquisite"
        paragraph="When we started Avion, the idea was simple. Make high quality furniture affordable and available for the mass market."
        anotherParagraph="Handmade, and lovingly crafted furniture and homeware is what we live, breathe and design so our Chelsea boutique become the hotbed for the London interior design community."
      />  
      <AboutBlock 
        variation="highlighted"
        withLink
        linkLabel="View collection"
        linkHref="/allProducts"
        imgSrc="/img/AboutBlock3.jpg"
        title="It started with a small idea"
        paragraph="A global brand with local beginnings, our story began in a small studio in South London in early 2014"
      />  
    </>
  )
}