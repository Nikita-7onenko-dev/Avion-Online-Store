import styles from './burgerMenu.module.scss'

import BurgerMenuNav from '../BurgerMenuNav/BurgerMenuNav'
import BurgerMenuFooter from '../BurgerMenuFooter/BurgerMenuFooter'

type Props = {
  isOpen: boolean;
}

export default function BurgerMenu({isOpen}: Props): React.JSX.Element {

  return (
    <nav className={`${styles.burgerMenu} ${isOpen ? styles.open : ''}` }>
      <BurgerMenuNav />
      <BurgerMenuFooter />
    </nav>
  )
}