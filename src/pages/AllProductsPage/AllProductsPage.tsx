import styles from './allProductsPage.module.scss';

import AllProductsGrid from "@/Components/AllProductsGrid/AllProductsGrid";
import ProductFiltersBar from '@/Components/ProductsFiltersBar/ProductsFiltersAndSortingBar';

import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {FiltersOptionsType} from '@/types/FiltersOptionsType'

export default function AllProductsPage(): React.JSX.Element {

  const [searchParams] = useSearchParams();
  const productType = searchParams.get('productType');
  const category = searchParams.get('category');
  const sorting = searchParams.get('sorting');
  const designer = searchParams.get('designer')
  const search = searchParams.get('search');

  const initialOptions: FiltersOptionsType = {
    filters: {
      productType: [],
      category: [],
      designers: [],
      priceFilters: [],
    },
    sorting: '',
    search: ''
  }

  let title: React.ReactNode;
  if(sorting) {
    title = <h2>{sorting}</h2>;
    initialOptions.sorting = sorting;
  }
  if(category) {
    title = <h2>{category}</h2>;
    initialOptions.filters.category = [category];
  }
  if(productType) {
    title = <h2>{productType}</h2>;
    initialOptions.filters.productType = [productType];
  } 
  if(designer) {
    title = <h2>{designer}</h2>;
    initialOptions.filters.designers = [designer]
  }
  if(search) {
    title = <h2>{`Searching for: ${search}`}</h2>;
    initialOptions.search = search;
  }
  if(!title){
    title = (<h2>All Products</h2>);
  }
  
  const [filterOptions, setFilterOption] = useState<FiltersOptionsType>(initialOptions);

  const base = process.env.PUBLIC_URL;

  useEffect(() => {
    setFilterOption(initialOptions)
  }, [searchParams])


  return (
    <>
      <div 
        className={styles.allProductsBanner}
        style={{backgroundImage: `url('${base}/img/allProductsBanner.jpg')`}}  
      >
      {title}
      </div>
      <div className={styles.allProductsBlock}>
        <ProductFiltersBar  setFilterOption={setFilterOption} filterOptions={filterOptions} />
        <AllProductsGrid filterOptions={filterOptions} />  
      </div>
    </>
  )
}