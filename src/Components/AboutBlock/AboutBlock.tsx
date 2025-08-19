import styles from './aboutBlock.module.scss';
import { Link } from 'react-router-dom';

import { useState } from 'react';
import  ClipLoader  from 'react-spinners/ClipLoader';


type BaseProps = {
  variation?: 'reverse' | 'highlighted';
  imgSrc: string;
  title: string;
  paragraph: string;
  anotherParagraph?: string;
}

type WithLink = {
  withLink: true;
  linkLabel: string;
  linkHref: string;
}

type WithoutLink = {
  withLink?: false | undefined;
  linkLabel?: never;
  linkHref?: never;
}

type Props = BaseProps & (WithoutLink | WithLink)

export default function AboutBlock({
  variation,
  imgSrc, 
  title, 
  paragraph, 
  anotherParagraph, 
  withLink, 
  linkLabel, 
  linkHref
}: Props  ): React.JSX.Element {

  const [isLoad, setIsLoad] = useState(false);  
  const base = process.env.PUBLIC_URL;
  
  const spinnerColor = variation === 'highlighted' ? '#fff' : '#2a254b'

  return (
    <div className={`${styles.aboutBlock} ${variation && styles[variation]}`}>
    <div className={styles.aboutBlockText} >
      <div className={styles.aboutBlockTextTop}>
        <h3>{title}</h3>
        <p>{paragraph}</p>
        {anotherParagraph && <p>{anotherParagraph}</p>}
      </div>
      {withLink && <Link to={linkHref} state={{scrollToTop: true}} className='globalLink'>{linkLabel}</Link>}
    </div>
    <div className={styles.imageWrapper}>
      <img 
        src={`${base}${imgSrc}`} 
        alt="" 
        loading='lazy' 
        onLoad={() => setIsLoad(true)}
        style={isLoad ? {visibility: 'visible'} : {visibility: 'hidden'} } 
      />
      <ClipLoader 
        color={spinnerColor}
        size={80}
        cssOverride={isLoad ? {display: 'none'} : {display: 'inline-block', position: 'absolute'} } 
      />
    </div>
    </div>
  )
}