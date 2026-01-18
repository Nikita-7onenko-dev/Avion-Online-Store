import { useState } from 'react';
import styles from './contactsHeroBlock.module.scss';
import ClipLoader from 'react-spinners/ClipLoader';


type Props = {
  ref: React.RefObject<null | HTMLFormElement>
}

export default function ContactsHeroBlock({ref}: Props): React.JSX.Element {

  const [isLoad, setIsLoad] = useState(false);

  const base = process.env.PUBLIC_URL;

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
          <button className='globalLink' onClick={scrollToFeedbackForm}>Use feedback form</button>
        </div>
        <div className={`${styles.imageWrapper} ${isLoad ? '' : styles.imageWrapperLoading}`}>
          <img 
            src={`${base}/img/ContactsHeroBlock.webp`}
            onLoad={() => setIsLoad(true)}
            loading='lazy'
            style={isLoad ? {visibility: 'visible'} : {visibility: 'hidden', width: '0px'} } 
            />
          <ClipLoader 
            color={'#fff'}
            size={80}
            cssOverride={isLoad ? {display: 'none'} : {display: 'inline-block'} } 
          />  
        </div>
      </div>
)
}