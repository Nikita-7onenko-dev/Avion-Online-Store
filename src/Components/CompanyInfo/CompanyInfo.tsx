
import { Link } from 'react-router-dom'
import styles from './companyInfo.module.scss'

export default function CompanyInfo(): React.JSX.Element {

  return (
    <address className={styles.address}>
      <h4><Link to="/" state={{scrollToTop: true}}>Avion</Link></h4>
      21 New York Street<br />
      New York City<br />
      United States of America<br />
      432 34
    </address>

  )
}