import AboutBlock from "@/Components/AboutBlock/AboutBlock";
import CtaBlock from "@/Components/CtaBlock/CtaBlock";
import Features from "@/Components/Features/Features";
import HeroBlock from "@/Components/HeroBlock/HeroBlock";
import ProductListing from "@/Components/ProductsListing/ProductsListing";


export default function HomePage(): React.JSX.Element {


  return (
    <>
      <HeroBlock />
      <Features />
      <ProductListing category='Ceramics' newest title='New Ceramics' />
      <ProductListing popular title='Our popular products' />
      <CtaBlock />
      <AboutBlock
        withLink
        linkLabel="Get in touch"
        linkHref="/contacts"
        imgSrc="/img/AboutBlockImage.jpg"
        title="From a studio in London to a global brand with over 400 outlets"
        paragraph="When we started Avion, the idea was simple. Make high quality furniture affordable and available for the mass market."
        anotherParagraph="Handmade, and lovingly crafted furniture and homeware is what we live, breathe and design so our Chelsea boutique become the hotbed for the London interior design community."  
      />
    </>
  )
}