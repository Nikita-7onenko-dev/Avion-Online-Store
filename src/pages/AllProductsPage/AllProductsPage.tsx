import styles from './allProductsPage.module.scss';

import ProductsGrid from "@/Components/ProductsGrid/ProductsGrid";
import ProductFiltersBar from '@/Components/ProductsFiltersBar/ProductsFiltersAndSortingBar';

import { useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import getAllProductsTitle from '@/utils/getAllProductsTitle';
import { useAppSelector } from '@/hooks/ReduxHooks';
import { useProductsIncrementalLoading } from '@/queries/useProducts';
import { LoadingDots } from '@/Components/LoadingDots/LoadingDots';
import { ProductsGridBanner } from '@/Components/ProductsGridBanner/ProductsGridBanner';

const LIMIT = 5;

type ScreenStateType = 'initial-loading' | 'empty' | 'list' | 'error'

export default function AllProductsPage(): React.JSX.Element {

  const title  = getAllProductsTitle();
  const location = useLocation();

  useLayoutEffect(() => {
    if(location.state?.scrollToTop) {
      window.scrollTo(0,0)
    }
  }, [location.state]);

  const filtersOptions = useAppSelector(state => state.filtersOptions);

  const queryKey = [
    'products',
    filtersOptions.filters.productTypes.join(','), 
    filtersOptions.filters.category.join(','), 
    filtersOptions.filters.designers.join(','), 
    filtersOptions.filters.priceFilters.join(','), 
    filtersOptions.sorting,
    filtersOptions.search
  ];

  const { data, hasNextPage, isFetching, isError, error, fetchNextPage } = useProductsIncrementalLoading(queryKey, filtersOptions, LIMIT);

  function getScreenState(): ScreenStateType {
    if(isError && error) return 'error';
    if(!data && isFetching) return 'initial-loading';
    if(data?.length === 0) return 'empty';
    return 'list';
  }

  const isLoadingMore = hasNextPage && isFetching;

  const screenState = getScreenState();
  
  return (
    <>
      <ProductsGridBanner title={title} />

      <div className={styles.allProductsBlock}>
        <ProductFiltersBar />

        <div className={styles.productGridBlock} style={hasNextPage ? {} : {paddingBottom: '50px'}}>

          {screenState === 'error' && <span>{error?.message}</span>}
          {screenState === 'initial-loading' && <LoadingDots />}
          {screenState === 'empty' && <span>We couldn't find any products matching your search</span>}
          {screenState === 'list' && (
            <>  
              <ProductsGrid data={data} isLoadingMore={isLoadingMore}/>
            
              {hasNextPage && <button className='globalButton' onClick={() => fetchNextPage()}>Load more</button>}
            </>
          )}

        </div>

      </div>
    </>
  )
}