import { Link } from 'react-router-dom'
import styles from './burgerMenuNav.module.scss'

export default function BurgerMenuNav(): React.JSX.Element {

  return (
      <ul className={styles.burgerMenuNavList}>
        <li><Link to='/allProducts'>All Products</Link></li>
        <li><Link to='/allProducts?productType=Furniture'>Furniture</Link></li>
        <li><Link to='/allProducts?productType=Homeware'>Homeware</Link></li>
        <li><Link to='/allProducts?productType=Lighting'>Lighting</Link></li>
        <li><Link to='/allProducts?productType=Accessories'>Accessories</Link></li>
        <li><Link to='/about'>About us</Link></li>
        <li><Link to='/contacts'>Contacts</Link></li>
      </ul>
  )
}