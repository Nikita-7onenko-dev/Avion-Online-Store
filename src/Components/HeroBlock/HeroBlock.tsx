import { useState } from 'react';
import styles from './heroBlock.module.scss';

import { Link } from 'react-router-dom';

import ClipLoader from 'react-spinners/ClipLoader';
import { useProductsAndFilters } from '@/Context/FiltersAndProductsContextProvider';



export default function HeroBlock(): React.JSX.Element {

  const base = process.env.PUBLIC_URL;

  const [isLoad, setIsLoad] = useState(false);
  const {setFiltersOptions} = useProductsAndFilters();

  return (
    <div className={styles.heroBlock}>
      <div className={styles.heroBlockLeft}>
        <h3>The furniture brand for the future, with timeless designs</h3>
        <div className={styles.heroBlockLeftBottom}>
          <Link 
            to='/allProducts' 
            className='globalLink'
            onClick={() => setFiltersOptions({
              filters: { productType: [], category: [], designers: [], priceFilters: [] },
              sorting: '',
              search: ''
            })}
            state={{scrollToTop: true}}  
          >View collection</Link>
          <p>
            A new era in eco friendly furniture with Avelon, the French luxury retail brand
            with nice fonts, tasteful colors and a beautiful way to display things digitally 
            using modern web technologies.
          </p>
        </div>
      </div>
      <div className={styles.heroBlockImgWrapper}>
        <img 
          src={`${base}/img/HeroBlock.jpg`} 
          alt="" 
          loading='lazy'
          onLoad={() => setIsLoad(true)} 
          style={isLoad ? {visibility: 'visible'} : {visibility: 'hidden'} } 
        />
        <ClipLoader 
          color={'#fff'}
          size={80}
          cssOverride={isLoad ? {display: 'none'} : {display: 'inline-block', position: 'absolute'} } 
        />
      </div>
    </div>

  )
}