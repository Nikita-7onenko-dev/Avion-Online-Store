import styles from './subscribeForm.module.scss'



export default function SubscribeForm(): React.JSX.Element {
  
  return (
    <form className={styles.subscribeForm}>
      <input 
        type="email"
        name="email"
        placeholder="your@email.com"
      />
      <button type='button' className='globalButton'>Sign up</button>
    </form>
  )
}