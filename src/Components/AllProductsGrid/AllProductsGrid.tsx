import styles from './AllProductsGrid.module.scss';

import MainProductCard from '../MainProductCard/MainProductCard';
import { useProductsAndFilters } from '@/Context/FiltersAndProductsContextProvider';


const pageSize = 5;

export default function AllProductsGrid(): React.JSX.Element {

  const { products, hasMore, alreadyLoaded, isLoading, loadMore } = useProductsAndFilters();

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
        hasMore && <button className='globalButton' onClick={() => loadMore()}>Load more</button>
      )}
    </div>
  )
}