import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel"

import styles from './productsListingEmblaCar.module.scss'
import { Link } from "react-router-dom";
import { FiltersOptionsType } from "@/types/FiltersOptionsType";
import { useProductsAndFilters } from "@/Context/FiltersAndProductsContextProvider";

type Props = {
  slides: React.ReactNode[];  
  options?: EmblaOptionsType;
  title: string;
  filterOptions: FiltersOptionsType;
}

export default function ProductListingEmblaCarousel({slides, options, title, filterOptions}: Props) {

  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {setFiltersOptions} = useProductsAndFilters();

  function followTheLink() {
    setFiltersOptions(filterOptions)
  }
  

  return (
    <div className={styles.productsListingContainer}>
      <h3>{title}</h3>
        <div className="embla" ref={emblaRef}>
          <ul className="embla__container">{slides}</ul>
          <Link 
            onClick={followTheLink}
            className={`${styles.link} globalLink`}
            to={{
              pathname: '/allProducts',
            }}
            state={{scrollToTop: true}}  
          > 
            View collection
          </Link>
        </div>
    </div>
  )
} 