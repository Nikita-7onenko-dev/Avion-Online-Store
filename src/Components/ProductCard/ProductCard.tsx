import styles from './productCard.module.scss';
import { ProductType } from "@/types/ProductType";

import QuantityInput from '../QuantityInput/QuantityInput';

import { useState } from 'react';
import useCartContext from '@/Context/CartContext';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

type Props = {
  product: ProductType;
  quantity: number;
  setQuantity?: React.Dispatch<React.SetStateAction<number>>;
}

export default function ProductCart({product, quantity, setQuantity}: Props): React.JSX.Element {

  const {removeFromCart} = useCartContext();
  const [isLoad, setIsLoad] = useState(false);  
  
  
  return (
    <div className={styles.productCard}>
      <Link to={`/${product.id}`} className={`${styles.imageWrapper} ${product.aspectRatio === '4/5' ? styles.small : styles.wide}`}>
        <img 
          src={product.image}
          alt={product.name} 
          loading='lazy'
          onLoad={() => setIsLoad(true)}  
          style={isLoad ? {visibility: 'visible'} : {visibility: 'hidden'} } 
        />
      <ClipLoader 
        color={'#2a254b'}
        size={30}
        cssOverride={isLoad ? {display: 'none'} : {display: 'inline-block', position: 'absolute'} } 
      />
      </Link>
      <div className={styles.productDescription}>
        <div>
          <h3>{product.name}</h3>
            <button onClick={() => removeFromCart(product.id)}>
              <svg fill='#2a254b' viewBox="0 0 640 640"><path d="M262.2 48C248.9 48 236.9 56.3 232.2 68.8L216 112L120 112C106.7 112 96 122.7 96 136C96 149.3 106.7 160 120 160L520 160C533.3 160 544 149.3 544 136C544 122.7 533.3 112 520 112L424 112L407.8 68.8C403.1 56.3 391.2 48 377.8 48L262.2 48zM128 208L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 208L464 208L464 512C464 520.8 456.8 528 448 528L192 528C183.2 528 176 520.8 176 512L176 208L128 208zM288 280C288 266.7 277.3 256 264 256C250.7 256 240 266.7 240 280L240 456C240 469.3 250.7 480 264 480C277.3 480 288 469.3 288 456L288 280zM400 280C400 266.7 389.3 256 376 256C362.7 256 352 266.7 352 280L352 456C352 469.3 362.7 480 376 480C389.3 480 400 469.3 400 456L400 280z"/></svg>
            </button>
        </div>
        <p>{product.description}</p>
        <div><span>{product.price} $</span> {quantity > 1 && <span>{`× ${quantity} = ${product.price * quantity} $`}</span>}</div>
        <QuantityInput quantity={quantity} setQuantity={setQuantity} productId={product.id} />
      </div>
    </div>
  )
}