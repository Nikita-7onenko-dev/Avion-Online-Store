import styles from './addToCartBar.module.scss'

import QuantityInput from "../QuantityInput/QuantityInput"

import { useState } from 'react'
import { addToCart } from '@/store/slices/cartSlice';
import { ProductType } from '@/types/ProductType';
import { useAppDispatch } from '@/hooks/ReduxHooks';

export default function AddToCartBar({product}: {product: ProductType}): React.JSX.Element {

  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useAppDispatch()

  return (
    <div className={styles.addToCartBar}>
      <label>
        Amount:<QuantityInput quantity={quantity} setQuantity={setQuantity} productId={product._id} />
      </label>
      <button onClick={() => dispatch(addToCart({product, quantity}))} className='globalButton'>Add to cart</button> 
    </div>
  )
}