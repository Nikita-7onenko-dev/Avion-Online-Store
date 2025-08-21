import styles from './allProductsPage.module.scss';

import AllProductsGrid from "@/Components/AllProductsGrid/AllProductsGrid";
import ProductFiltersBar from '@/Components/ProductsFiltersBar/ProductsFiltersAndSortingBar';

import { useLocation, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import searchParamsParser from '@/utils/searchParamsParser';
import { useProductsAndFilters } from '@/Context/FiltersAndProductsContextProvider';

const base = process.env.PUBLIC_URL;

export default function AllProductsPage(): React.JSX.Element {

  const [searchParams] = useSearchParams();
  const { setFiltersOptions } = useProductsAndFilters();
  const [filterOptions, title] = searchParamsParser(searchParams);
  const location = useLocation()

  useEffect(() => {
    if(searchParams.size > 0) {
      setFiltersOptions(filterOptions);
    }  
  }, [searchParams.toString()]);

  useEffect(() => {
    if(location.state?.scrollToTop) {
      window.scrollTo(0,0)
    }
  }, [location.state?.scrollToTop]);

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