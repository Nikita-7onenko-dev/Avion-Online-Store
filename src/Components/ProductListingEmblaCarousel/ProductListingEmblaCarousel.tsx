import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel"

import styles from './productsListingEmblaCar.module.scss'
import { Link } from "react-router-dom";

type Props = {
  slides: React.ReactNode[];  
  options?: EmblaOptionsType;
  title: string;
  searchParams: string;
}

export default function ProductListingEmblaCarousel({slides, options, title, searchParams}: Props) {

  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  

  return (
    <div className={styles.productsListingContainer}>
      <h3>{title}</h3>
        <div className="embla" ref={emblaRef}>
          <ul className="embla__container">{slides}</ul>
          <Link 
            className={`${styles.link} globalLink`}
            to={{
              pathname: '/allProducts',
              search: searchParams,
            }}
            state={{scrollToTop: true}}  
          > 
            View collection
          </Link>
        </div>
    </div>
  )
} 