import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel"

import styles from './productsListingEmblaCar.module.scss'
import { Link } from "react-router-dom";
import { FiltersOptionsType } from "@/types/FiltersOptionsType";
import { useAppDispatch } from "@/hooks/ReduxHooks";
import { setFiltersOptions } from "@/store/slices/filtersOptionsSlice";

type Props = {
  slides: React.ReactNode[];  
  options?: EmblaOptionsType;
  title: string;
  filtersOptions: FiltersOptionsType;
}

export default function ProductListingEmblaCarousel({slides, options, title, filtersOptions}: Props) {

  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const dispatch = useAppDispatch();

  function followTheLink() {
    dispatch(setFiltersOptions(filtersOptions));
  }
  let searchParam = ''
  if(filtersOptions.filters.productTypes.length > 0) {
    searchParam = `productType=${filtersOptions.filters.productTypes[0]}`
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
              search: searchParam
            }}
            state={{scrollToTop: true}}  
          > 
            View collection
          </Link>
        </div>
    </div>
  )
} 