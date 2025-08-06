
import styles from './companyInfo.module.scss'

export default function CompanyInfo(): React.JSX.Element {

  return (
    <address className={styles.address}>
      <h4>Avion</h4>
      21 New York Street<br />
      New York City<br />
      United States of America<br />
      432 34
    </address>

  )
}