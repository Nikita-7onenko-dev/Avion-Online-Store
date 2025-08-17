import { useFilters } from '@/Context/FiltersContextProvider';
import styles from './headerNavigationBar.module.scss'
import { NavLink, useSearchParams} from 'react-router-dom';

export default function HeaderNavigationBar(): React.JSX.Element {

  const {filterContext, setFiltersOptions} = useFilters();
  const [searchParams] = useSearchParams();
  const currentProductType = searchParams.get('productType');

  const categoryLinkItems = filterContext.productType.map(productType => (
    <li key={productType}>
      <NavLink
        to={{
          pathname:'/allProducts',
          search:`productType=${productType}`
        }}
        className={ () => productType === currentProductType ? 'active' : ''}
      >
        {productType}
      </NavLink>
    </li>
  ))

  return (
    <nav>
      <ul className={styles.headerNavigationList}>
        <li 
          onClick={() => setFiltersOptions({
              filters: { productType: [], category: [], designers: [], priceFilters: [] },
              sorting: '',
              search: ''
            })
          }
        >
          <NavLink to='/allProducts'
            className={({isActive}) => isActive && !currentProductType ? 'active' : ''}
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