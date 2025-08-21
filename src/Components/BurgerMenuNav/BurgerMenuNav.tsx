import { Link } from 'react-router-dom'
import styles from './burgerMenuNav.module.scss'
import { useProductsAndFilters } from '@/Context/FiltersAndProductsContextProvider'

export default function BurgerMenuNav(): React.JSX.Element {

  const {filterContext, setFiltersOptions} = useProductsAndFilters();

  const productTypeLinkItems = filterContext.productType.map(productType => {
    return (
      <li key={productType}>
        <Link to={{
          pathname: '/allProducts',
          search: `?productType=${productType}`
        }}>{productType}</Link>
      </li>
    )
  })

  return (
      <ul className={styles.burgerMenuNavList}>
        <li>
          <Link 
            to='/allProducts'
            onClick={() => setFiltersOptions({
              filters: { productType: [], category: [], designers: [], priceFilters: [] },
              sorting: '',
              search: ''
            })}>All Products</Link>
        </li>
        {productTypeLinkItems}
        <li><Link to='/about'>About us</Link></li>
        <li><Link to='/contacts'>Contacts</Link></li>
      </ul>
  )
}