import styles from './header.module.scss'

import HeaderTop from "../HeaderTop/HeaderTop";
import HeaderNavigationBar from "../HeaderNavigationBar/HeaderNavigationBar";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

export default function Header(): React.JSX.Element {

  const [isOpenBurger, setIsOpenBurger] = useState<boolean>(false);
  const pageUrl = useLocation();

  useEffect(() => {
    if(isOpenBurger) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpenBurger])
  
  useEffect(() => {
    setIsOpenBurger(false)    
  }, [pageUrl])

  return (
    <>
      <header 
        className={styles.header}
        style={isOpenBurger ? {position:'sticky'} : {position: 'static'}}
      >
        <HeaderTop isOpenBurger={isOpenBurger} setIsOpenBurger={setIsOpenBurger}/>
        <HeaderNavigationBar />
        <BurgerMenu isOpen={isOpenBurger}/>
        
      </header>
    </>
  )
}