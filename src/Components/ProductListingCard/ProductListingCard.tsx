import styles from './productListingCard.module.scss';
import { ProductType } from "@/types/ProductType";
import { Link } from "react-router-dom";
import { useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

type Props = {
  product?: ProductType
  variation: "listingElement" | "gridElement"
}

const base = process.env.PUBLIC_URL;

export default function ProductListingCard({product, variation}: Props): React.JSX.Element {

  const [isLoad, setIsLoad] = useState(false);  


  const aspectRatio = product?.aspectRatio || '4/5';
  const image = product?.image || null;
  const name = product?.name || '';
  const price = product?.price ? product?.price + ' $' : '' ;


return (
      <li 
        className={`${styles[variation]} ${product?.aspectRatio === '8/5' ? styles[variation] + 'Wide' : '' } ${ variation === 'listingElement' ? 'embla__slide' : '' }`}>
        <Link className={`${styles.productCard}`} to={`/${product?._id || ''}`} >
          <div className={`${aspectRatio === '4/5' ? styles.imgFrameSmall : styles.imgFrameWide} ${styles.imgFrame}`}>
            <img 
              src={`${base}${image}`} 
              alt="" 
              loading="lazy"
              onLoad={() => setIsLoad(true)}
              style={isLoad ? {visibility: 'visible'} : {visibility: 'hidden'} } 
            />
            <ClipLoader 
              color={'#2a254b'}
              size={40}
              cssOverride={isLoad ? {display: 'none'} : {display: 'inline-block', position: 'absolute'} } 
            />
          </div>
          <p>{name}</p>
          <p>{price}</p>
        </Link>
      </li>  
    )
}