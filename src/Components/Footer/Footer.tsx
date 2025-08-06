import styles from './footer.module.scss'


import CompanyInfo from "../CompanyInfo/CompanyInfo";
import SocialLinks from '../SocialLinks/SocialLinks';
import FooterNavigation from '../FooterNavigation/FooterNavigation';


export default function Footer(): React.JSX.Element {

  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerLeft}>
          <CompanyInfo />
          <SocialLinks color='#fff' />
        </div>
        <FooterNavigation />
      </div>
      <p>Copyright 2022 Avion LTD</p>
    </footer>
  )
}