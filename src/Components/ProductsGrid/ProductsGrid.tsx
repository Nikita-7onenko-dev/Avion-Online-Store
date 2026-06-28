import styles from './ProductsGrid.module.scss';

import MainProductCard from '../MainProductCard/MainProductCard';
import { ProductType } from '@/types/ProductType';
import { ProductGridSkeletons } from '../ProductGridSkeletons/ProductGridSkeletons';

type Props = {
  data: ProductType[] | undefined;
  isLoadingMore: boolean;
}

export default function ProductsGrid({data, isLoadingMore}: Props) {

  if(!data) return null;

  return (
    <>  
      <ul className={styles.productGrid} >

        {data?.map(product => <MainProductCard key={product._id} product={product} variation='gridElement' /> )}

        {isLoadingMore &&  <ProductGridSkeletons />}
      </ul>
  
    </>
  )
}