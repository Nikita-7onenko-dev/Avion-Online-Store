import styles from './ctaBlock.module.scss'

import SubscribeForm from '../SubscribeForm/SubscribeForm'

type Props = {
  isWithImage?: boolean;
}

export default function CtaBlock({isWithImage}: Props): React.JSX.Element {

  if(isWithImage) {
    const base = process.env.PUBLIC_URL;
    document.documentElement.style.setProperty(
      '--checkmark-url',
      `url('${base}/icons/Checkmark.svg')`
    );

    return (
      <div 
        className={`${styles.ctaBlockContainer} ${styles.withImage}`}
        style={{backgroundImage: `url('${base}/img/Cta.webp')`}}
      >
        <div>
          <h3>Join the club and get the benefits</h3>
          <p>Sign up for our newsletter and receive exclusive offers on new ranges, sales, pop up stores and more</p>
          <ul>
            <li>Exclusive offers</li>
            <li>Free events</li>
            <li>Large discounts</li>
          </ul>
          <SubscribeForm />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.ctaBlockContainer}>
      <div>
        <h3>Join the club and get the benefits</h3>
        <p>Sign up for our newsletter and receive exclusive offers on new ranges, sales, pop up stores and more</p>
        <SubscribeForm />
      </div>
    </div>
  )
}