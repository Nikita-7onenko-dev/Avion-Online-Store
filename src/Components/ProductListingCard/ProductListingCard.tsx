import styles from './productListingCard.module.scss';
import { ProductType } from "@/types/ProductType";
import { Link } from "react-router-dom";
import { useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

type Props = {
  product: ProductType
}

export default function ProductListingCard({product}: Props): React.JSX.Element {

  const [isLoad, setIsLoad] = useState(false);  
  const base = process.env.PUBLIC_URL;

return (
      <li key={product.id} className={`${product.aspectRatio === '4/5' ? styles.imgFrameSmall : styles.imgFrameWide} embla__slide`}>
        <Link className={`${styles.productCard}`} to={`/${product.id}`} >
          <div className={`${product.aspectRatio === '4/5' ? styles.imgFrameSmall : styles.imgFrameWide} ${styles.imgFrame}`}>
            <img 
              src={`${base}${product.image}`} 
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
          <p>{product.name}</p>
          <p>{product.price}$</p>
        </Link>
      </li>  
    )
}