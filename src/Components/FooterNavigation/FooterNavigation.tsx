import styles from './footerNavigation.module.scss'

import { Link } from 'react-router-dom'


export default function FooterNavigation(): React.JSX.Element {

  return (
    <nav  className={styles.navigation}>
      <ul>
        <li><h4>Menu</h4></li>
        <li><Link to={{
          pathname: '/allProducts',
          search: 'sorting=Newest'
        }}>New arrivals</Link></li>
        <li><Link to={{
          pathname: '/allProducts',
          search: 'sorting=Best sellers'
        }}>Best sellers</Link></li>
        <li><Link to={{
          pathname: '/allProducts',
          search: ''
        }}>Recently viewed</Link></li>
        <li><Link to={{
          pathname: '/allProducts'
        }}>All products</Link></li>
      </ul>

      <ul className={styles.categoryUl}>
        <li><h4>Categories</h4></li>
        <li><Link to={{
          pathname: '/allProducts',
          search: 'category=Crockery'
        }}>Crockery</Link></li>
        <li><Link to={{
          pathname: '/allProducts',
          search: 'productType=Furniture'
        }}>Furniture</Link></li>
        <li><Link to={{
          pathname: '/allProducts',
          search: 'productType=Homeware'
        }}>Homeware</Link></li>
        <li><Link to={{
          pathname: '/allProducts',
          search: 'category=Plant pots'
        }}>Plant pots</Link></li>
        <li><Link to={{
          pathname: '/allProducts',
          search: 'category=Chairs'
        }}>Chairs</Link></li>
        <li><Link to={{
          pathname: '/allProducts',
          search: 'category=Crockery'
        }}>Crockery</Link></li>
      </ul>

      <ul>
        <li><h4>Our company</h4></li>
        <li><Link to="/about">About us</Link></li>
        <li><Link to="/vacancies">Vacancies</Link></li>
        <li><Link to="/contacts">Contact us</Link></li>
        <li><Link to="">Privacy</Link></li>
        <li><Link to="">Returns policy</Link></li>
      </ul>
    </nav>
  )
}