import { useState } from 'react'
import styles from './feedbackForm.module.scss'
import { ClipLoader } from 'react-spinners'


type Props = {
  ref: React.RefObject<null | HTMLFormElement>
}


export default function FeedbackForm({ref}: Props): React.JSX.Element {

  const [isLoad, setIsLoad] = useState(false);
  const base = process.env.PUBLIC_URL;

  return (
    <div className={styles.feedbackFormContainer}>
      <div className={styles.imageWrapper}>
        <img 
        src={`${base}/img/feedbackForm2.webp`}
        alt="" 
        loading='lazy'
        onLoad={() => setIsLoad(true)} 
        style={isLoad ? {visibility: 'visible'} : {visibility: 'hidden'} } 
        />
        <ClipLoader 
          color={'#2a254b'}
          size={80}
          cssOverride={isLoad ? {display: 'none'} : {display: 'inline-block', position: 'absolute'} } 
        />
      </div>
      <form action="/submit-form" className={styles.feedbackForm} ref={ref}>
        <h3>Feedback form</h3>
        <fieldset>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Enter your name" required />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" required />
          </div>
        </fieldset>
        <fieldset>
              <div>
            <label htmlFor="subject">Subject:</label>
            <input type="subject" id="subject" name="subject" placeholder="Subject of your message"  />
          </div>
          <div>
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" placeholder="Type your message here..."></textarea>
          </div>
        </fieldset>
        <button type="button" className='globalButton'>Send</button>
      </form>   
    </div>
  )
}