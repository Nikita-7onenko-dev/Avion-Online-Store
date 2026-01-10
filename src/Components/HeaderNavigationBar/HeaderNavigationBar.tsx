import styles from './headerNavigationBar.module.scss'
import { NavLink, useSearchParams} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/ReduxHooks';
import { resetFiltersAction, setFiltersOptions } from '@/store/slices/filtersOptionsSlice';
import { useMetaData } from '@/queries/useMetaData';

export default function HeaderNavigationBar(): React.JSX.Element {

  const [searchParams] = useSearchParams();
  const currentProductType = searchParams.get('productType');
  const dispatch = useAppDispatch();

  const { data } = useMetaData();
  let categoryLinkItems = null

  if(data) {
    const { productTypes } = data

    categoryLinkItems = productTypes.map(productType => (
      <li key={productType}>
        <NavLink
          to={{
            pathname:'/allProducts',
            search:`productType=${productType}`
          }}
          className={ () => productType === currentProductType ? 'active' : ''}
          onClick={() => {
            dispatch(setFiltersOptions({
              filters: { productTypes: [productType], category: [], designers: [], priceFilters: [] },
              sorting: '',
              search: ''
            }))
          }}
        >
          {productType}
        </NavLink>
      </li>
    ))
  }


  return (
    <nav className={styles.headerNav}>
      <ul className={styles.headerNavigationList}>
        <li>
          <NavLink to='/allProducts'
            className={({isActive}) => isActive && !currentProductType ? 'active' : ''}
            onClick={() => dispatch(resetFiltersAction())}
          >
            All Products
          </NavLink>
        </li>
        {categoryLinkItems}
        <li>
          <NavLink to='/about'>About us</NavLink>
        </li>
        <li>
          <NavLink to='/contacts'>Contacts</NavLink>
        </li>
      </ul>
    </nav>
  )
}