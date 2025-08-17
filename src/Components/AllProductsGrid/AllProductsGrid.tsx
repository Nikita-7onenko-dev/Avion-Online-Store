import styles from './AllProductsGrid.module.scss';

import ProductListingCard from '../ProductListingCard/ProductListingCard';

import { ProductType } from "@/types/ProductType";
import {FiltersOptionsType} from '@/types/FiltersOptionsType';

import { useEffect, useState } from "react";
import fetchAllProducts from '@/utils/fetchAllProducts';
import { useFilters } from '@/Context/FiltersContextProvider';


type Props = {
  filterOptions: FiltersOptionsType;
}

const pageSize = 5;
const base = process.env.PUBLIC_URL;

function loadMore(setAlreadyLoaded: React.Dispatch<React.SetStateAction<number>>) {
  setAlreadyLoaded( (prev) => prev + pageSize );
}

export default function AllProductsGrid(): React.JSX.Element {

  const [products, setProducts] = useState<ProductType[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [alreadyLoaded, setAlreadyLoaded] = useState<number>(0);
  const { filtersOptions } = useFilters();

  let ignore = false;
  async function fetchProducts(searchParams: URLSearchParams) {
    const data = await fetchAllProducts(searchParams.toString());
    if(!ignore) {
      setProducts( prev => [...prev, ...data.products]);
      setHasMore(data.hasMore);
    }

  }

  let searchParams = new URLSearchParams({
    search: filtersOptions.search,
    sorting: filtersOptions.sorting,
    filters: JSON.stringify(filtersOptions.filters),
    alreadyLoaded: alreadyLoaded.toString(),
    limit: pageSize.toString()
  })

  useEffect(() => {
    setProducts([]);
    setAlreadyLoaded(0);
    
  },[filtersOptions])

  useEffect(() => {
 
    fetchProducts(searchParams);

    return () => {
      ignore = true;
    }
  }, [alreadyLoaded, filtersOptions])

  return (
      <div className={styles.productGridBlock} style={hasMore ? {} : {paddingBottom: '50px'}}>
        <ul className={styles.productGrid}>
            {
              products ? 
                ( products.map(product => <ProductListingCard key={product._id} product={product} variation='gridElement' /> ) ) :
                ( [...Array(8).keys()].map(index => <ProductListingCard key={index} variation='gridElement' />) )
            }
        </ul>
        {hasMore && <button
          className='globalButton'
          onClick={() => loadMore(setAlreadyLoaded)}
        >
          Load more
        </button>}
      </div>
  )
}