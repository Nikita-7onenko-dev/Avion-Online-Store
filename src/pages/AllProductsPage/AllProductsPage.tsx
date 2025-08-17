import styles from './allProductsPage.module.scss';

import AllProductsGrid from "@/Components/AllProductsGrid/AllProductsGrid";
import ProductFiltersBar from '@/Components/ProductsFiltersBar/ProductsFiltersAndSortingBar';

import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import searchParamsParser from '@/utils/searchParamsParser';
import { useFilters } from '@/Context/FiltersContextProvider';

const base = process.env.PUBLIC_URL;

export default function AllProductsPage(): React.JSX.Element {

  const [searchParams] = useSearchParams();

  const { setFiltersOptions } = useFilters();
  const [title, setTitle] = useState<string>("All Products");

  useEffect(() => {

    const [filterOptions, title] = searchParamsParser(searchParams);

    if(searchParams.size > 0) {
      setFiltersOptions(filterOptions);
    }

    setTitle(title);
  }, [searchParams])


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