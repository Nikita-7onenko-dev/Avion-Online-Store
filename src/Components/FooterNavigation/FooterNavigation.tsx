import { useProductsAndFilters } from '@/Context/FiltersAndProductsContextProvider'
import styles from './footerNavigation.module.scss'

import { Link } from 'react-router-dom'


export default function FooterNavigation(): React.JSX.Element {

  const {filterContext, setFiltersOptions} = useProductsAndFilters();

  const categoryListItems = filterContext.categories.map( category => (
      <li key={category}>
        <Link
          to={{
            pathname: '/allProducts',
            search: `category=${category}`
          }}
          state={{scrollToTop: true}}
          onClick={() => {
            setFiltersOptions({
                filters: { productType: [], category: [category], designers: [], priceFilters: [] },
                sorting: '',
                search: ''
              })
          }}
        > {category}
        </Link>
      </li>
  ));

  const sortingListItems = ['New arrivals', 'Best sellers'].map(sorting => (
    <li key={sorting}>
      <Link 
        to="/allProducts"
        onClick={() => setFiltersOptions({
          filters: { productType: [], category: [], designers: [], priceFilters: [] },
          sorting,
          search: ''
        })}
        state={{ scrollToTop: true }}
      >
        {sorting}
      </Link>
    </li>
  ));


  return (
    <nav  className={styles.navigation}>
      <ul>
        <li><h4>Menu</h4></li>
        {sortingListItems}
        <li>
          <Link 
            to={{
              pathname: '/allProducts',
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
        <li><Link to="" state={{scrollToTop: true}}>Vacancies</Link></li>
        <li><Link to="/contacts" state={{scrollToTop: true}}>Contact us</Link></li>
        <li><Link to="" state={{scrollToTop: true}}>Privacy</Link></li>
        <li><Link to="" state={{scrollToTop: true}}>Returns policy</Link></li>
      </ul>
    </nav>
  )
}