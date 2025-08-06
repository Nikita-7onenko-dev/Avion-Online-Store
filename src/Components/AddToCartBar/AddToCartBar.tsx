import styles from './addToCartBar.module.scss'

import QuantityInput from "../QuantityInput/QuantityInput"

import { useState } from 'react'
import useCartContext from '@/Context/CartContext';
import { ProductType } from '@/types/ProductType';

export default function AddToCartBar({product}: {product: ProductType}): React.JSX.Element {

  const {addToCart} = useCartContext();

  const [quantity, setQuantity] = useState<number>(1);

  return (
    <div className={styles.addToCartBar}>
      <label>
        Amount:<QuantityInput quantity={quantity} setQuantity={setQuantity} productId={product.id} />
      </label>
      <button onClick={() => addToCart(product, quantity)} className='globalButton'>Add to cart</button> 
    </div>
  )
}