import { useState } from 'react';
import styles from './contactsHeroBlock.module.scss';
import ClipLoader from 'react-spinners/ClipLoader';


type Props = {
  ref: React.RefObject<null | HTMLFormElement>
}

export default function ContactsHeroBlock({ref}: Props): React.JSX.Element {

  const [isLoad, setIsLoad] = useState(false);

  function scrollToFeedbackForm() {
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end'
    })
  }

  return (
      <div className={styles.contactsHeroBlock}>
        <div className={styles.bannerTextBlock}>
          <div>
            <h3>Contact us</h3>
            <p>Have a question or request? Use the feedback form or any contact details below</p>
          </div>
          <button className='globalButton' onClick={scrollToFeedbackForm}>Use feedback form</button>
        </div>
        <img 
          src='/img/ContactsHeroBlock.jpg' 
          onLoad={() => setIsLoad(true)}
          loading='lazy'
          style={isLoad ? {visibility: 'visible'} : {visibility: 'hidden'} } 
          />
          <ClipLoader 
            color={'#fff'}
            size={80}
            cssOverride={isLoad ? {display: 'none'} : {display: 'inline-block', position: 'absolute'} } 
          />
      </div>
)
}