import { useFilters } from '@/Context/FiltersContextProvider'
import styles from './footerNavigation.module.scss'

import { Link } from 'react-router-dom'


export default function FooterNavigation(): React.JSX.Element {

  const {filterContext, setFiltersOptions} = useFilters();

  const categoryListItems = filterContext.categories.map( category => (
      <li key={category}>
        <Link
          to={{
            pathname: '/allProducts',
            search: `category=${category}`
          }}
          state={{scrollToTop: true}}
        > {category}
        </Link>
      </li>
  ));


  return (
    <nav  className={styles.navigation}>
      <ul>
        <li><h4>Menu</h4></li>
        <li>
          <Link 
            to={{
              pathname: '/allProducts',
              search: 'sorting=Newest'
            }}
            state={{scrollToTop: true}}
          >New arrivals</Link>
        </li>
        <li>
          <Link 
            to={{
              pathname: '/allProducts',
              search: 'sorting=Best sellers'
            }}
            state={{scrollToTop: true}}
          >Best sellers</Link>
        </li>
        <li>
          <Link 
            to={{
              pathname: '/allProducts',
              search: ''
            }}
            state={{scrollToTop: true}}
            >Recently viewed
          </Link>
        </li>
        <li>
          <Link
            to={{
              pathname: '/allProducts'
            }}
            onClick={() => setFiltersOptions({
              filters: { productType: [], category: [], designers: [], priceFilters: [] },
              sorting: '',
              search: ''
            })}
            state={{scrollToTop: true}}
          >All products</Link>
        </li>
      </ul>

      <ul className={styles.categoryUl}>
        <li><h4>Categories</h4></li>
        {categoryListItems}
      </ul>

      <ul>
        <li><h4>Our company</h4></li>
        <li><Link to="/about" state={{scrollToTop: true}}>About us</Link></li>
        <li><Link to="">Vacancies</Link></li>
        <li><Link to="/contacts" state={{scrollToTop: true}}>Contact us</Link></li>
        <li><Link to="">Privacy</Link></li>
        <li><Link to="">Returns policy</Link></li>
      </ul>
    </nav>
  )
}