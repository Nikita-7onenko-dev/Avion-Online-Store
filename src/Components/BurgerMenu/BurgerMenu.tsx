import styles from './burgerMenu.module.scss'

import BurgerMenuNav from '../BurgerMenuNav/BurgerMenuNav'
import BurgerMenuFooter from '../BurgerMenuFooter/BurgerMenuFooter'
import { createPortal } from 'react-dom';

type Props = {
  isOpen: boolean;
}

export default function BurgerMenu({isOpen}: Props): React.JSX.Element {

  const overlay = document.getElementById('overlay');
  if(!overlay) throw new Error('No overlay container found')

  return createPortal(
    <nav className={`${styles.burgerMenu} ${isOpen ? styles.open : ''}` }>
      <BurgerMenuNav />
      <BurgerMenuFooter />
    </nav>
  , overlay)
}