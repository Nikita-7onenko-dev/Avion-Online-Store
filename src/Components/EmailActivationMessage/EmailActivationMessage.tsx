import styles from './emailActivationMessage.module.scss'


export default function EmailActivationMessage(): React.JSX.Element {

  return (
    <div className={styles.container}>
      <div className={styles.activationMessage}>
        <p>We have sent an activation link to your email. Please check your inbox and follow the link</p>
      </div>       
    </div>
  )
}