import styles from './allProductsPage.module.scss';

import AllProductsGrid from "@/Components/AllProductsGrid/AllProductsGrid";
import ProductFiltersBar from '@/Components/ProductsFiltersBar/ProductsFiltersAndSortingBar';

import { useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import getAllProductsTitle from '@/utils/getAllProductsTitle';

const base = process.env.PUBLIC_URL;

export default function AllProductsPage(): React.JSX.Element {

  const title  = getAllProductsTitle();
  const location = useLocation();

  useLayoutEffect(() => {
    if(location.state?.scrollToTop) {
      window.scrollTo(0,0)
    }
  }, [location.state]);

  return (
    <>
      <div 
        className={styles.allProductsBanner}
        style={{backgroundImage: `url('${base}/img/allProductsBanner.jpg')`}}  
      >
      <h2>{title}</h2>
      </div>
      <div className={styles.allProductsBlock}>
        <ProductFiltersBar />
        <AllProductsGrid />  
      </div>
    </>
  )
}