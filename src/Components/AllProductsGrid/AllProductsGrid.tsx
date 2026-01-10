import styles from './AllProductsGrid.module.scss';

import MainProductCard from '../MainProductCard/MainProductCard';
import { useAppSelector } from '@/hooks/ReduxHooks';
import { useProductsIncrementalLoading } from '@/queries/useProducts';

type ScreenStateType = 'initial-loading' | 'empty' | 'list' | 'error'

const pageSize = 5;

export default function AllProductsGrid(): React.JSX.Element {

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

  const { data, hasNextPage, isFetching, isError, fetchNextPage } = useProductsIncrementalLoading(queryKey, filtersOptions, pageSize);

  function getScreenState(): ScreenStateType {
    if(isError) return 'error';
    if(!data && isFetching) return 'initial-loading';
    if(data?.length === 0) return 'empty';
    return 'list'
  }

  const isLoadingMore = hasNextPage && isFetching;

  const screenState = getScreenState();

  return (
    <div className={styles.productGridBlock} style={hasNextPage ? {} : {paddingBottom: '50px'}}>

      {screenState === 'error' && <span>Error</span>}

      {screenState === 'initial-loading' && <span>Loading...</span>}

      {screenState === 'empty' && <span>We couldn't find any products matching your search.</span>}

      {screenState === 'list' && (
        <>  
          <ul className={styles.productGrid} >

            {data?.map(product => <MainProductCard key={product._id} product={product} variation='gridElement' /> )}
            
            {isLoadingMore && [...Array(pageSize).keys()].map(index => <MainProductCard key={index} variation='gridElement' />) }
          </ul>
        
          {hasNextPage && <button className='globalButton' onClick={() => fetchNextPage()}>Load more</button>}
        </>
      )}



    </div>
  )
}