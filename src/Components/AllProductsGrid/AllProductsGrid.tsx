import styles from './AllProductsGrid.module.scss';

import MainProductCard from '../MainProductCard/MainProductCard';

import { ProductType } from "@/types/ProductType";

import { useEffect, useState } from "react";
import fetchAllProducts from '@/utils/fetchAllProducts';
import { useFilters } from '@/Context/FiltersContextProvider';


const pageSize = 5;

function loadMore(setAlreadyLoaded: React.Dispatch<React.SetStateAction<number>>) {
  setAlreadyLoaded( (prev) => prev + pageSize );
}

export default function AllProductsGrid(): React.JSX.Element {

  const [products, setProducts] = useState<ProductType[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [alreadyLoaded, setAlreadyLoaded] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { filtersOptions } = useFilters();

  let ignore = false;

  async function fetchProducts(searchParams: URLSearchParams) {
    setIsLoading(true);
    const data = await fetchAllProducts(searchParams.toString());

    if(!ignore) {
      setIsLoading(false)
      setProducts( prev => [...prev, ...data.products]);
      setHasMore(data.hasMore);
    }
  }


  useEffect(() => {
    setProducts([]);
    setAlreadyLoaded(0);
    
  },[filtersOptions])

  useEffect(() => {
    let searchParams = new URLSearchParams({
      search: filtersOptions.search,
      sorting: filtersOptions.sorting,
      filters: JSON.stringify(filtersOptions.filters),
      alreadyLoaded: alreadyLoaded.toString(),
      limit: pageSize.toString()
    });

    if(!ignore) {
      fetchProducts(searchParams);
    }

    return () => {
      ignore = true;
    }
  }, [alreadyLoaded, filtersOptions])

  return (
    <div className={styles.productGridBlock} style={hasMore ? {} : {paddingBottom: '50px'}}>
      {
      <ul className={styles.productGrid}>
        {(products.length > 0) && products.map(product => <MainProductCard key={product._id} product={product} variation='gridElement' /> )}
        {(isLoading && products.length > 0 ) && [...Array(pageSize).keys()].map(index => <MainProductCard key={index} variation='gridElement' />)}
      </ul>
      }        
      {(products.length === 0 && !isLoading) && <span>We couldn't find any products matching your search.</span>}
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        hasMore && <button className='globalButton' onClick={() => loadMore(setAlreadyLoaded)}>Load more</button>
      )}
    </div>
  )
}