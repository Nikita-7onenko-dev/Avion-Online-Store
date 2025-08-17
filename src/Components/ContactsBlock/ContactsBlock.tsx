import SocialLinks from '../SocialLinks/SocialLinks'
import styles from './contactsBlock.module.scss'



export default function ContactsBlock(): React.JSX.Element {


  return (
    <div className={styles.contactsBlock}>
      <address className={styles.contacts}>
        <div>
          <h4>Address</h4>
          <p>
            21 New York Street<br />
            New York City<br />
            United States of America<br />
            432 34
          </p>
        </div>
        <div>
          <h4>Phone</h4>
          <a href="tel:+1234567890">{"+1 (234) 567-890"}</a>
          <a href="tel:+1234567891">{"+1 (234) 567-891"}</a>  
        </div>
        <div>
          <h4>Email</h4>
          <a href="mailto:mail@avion.com">mail@avion.com</a>
        </div> 
        <SocialLinks color="#2a254b" />
      </address>
      <div className={styles.map}>
        <iframe width="100%" height="100%" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Century%2021%20NYC%2022%20Cortlandt%20St,%20Manhattan,%20NY%2010007,%20United%20States+(Avion)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
      </div>
    </div>
  )
}