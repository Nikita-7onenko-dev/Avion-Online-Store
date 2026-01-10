import { Link } from 'react-router-dom'
import styles from './burgerMenuNav.module.scss'
import { useAppDispatch, useAppSelector } from '@/hooks/ReduxHooks';
import { resetFiltersAction, setFiltersOptions, toggleFilters } from '@/store/slices/filtersOptionsSlice';
import { useMetaData } from '@/queries/useMetaData';

export default function BurgerMenuNav(): React.JSX.Element {

  const dispatch = useAppDispatch();
  const { data } = useMetaData();
  let productTypeLinkItems = null;

  if(data) {
    const { productTypes } = data

    productTypeLinkItems = productTypes.map(productType => (
      <li key={productType}>
        <Link 
          to={{
          pathname: '/allProducts',
        }}
        onClick={() => {
          dispatch(setFiltersOptions({
            filters: { productTypes: [productType], category: [], designers: [], priceFilters: [] },
            sorting: '',
            search: ''
          }))
        }}
      >
      {productType}</Link>
      </li>
    ))

  }

  return (
      <ul className={styles.burgerMenuNavList}>
        <li>
          <Link 
            to='/allProducts'
            onClick={() => dispatch(resetFiltersAction()) }>All Products</Link>
        </li>
        {productTypeLinkItems}
        <li><Link to='/about'>About us</Link></li>
        <li><Link to='/contacts'>Contacts</Link></li>
      </ul>
  )
}