import styles from './addToCartBar.module.scss'

import QuantityInput from "../QuantityInput/QuantityInput"

import { useState } from 'react'
import { addToCart } from '@/store/slices/cartSlice';
import { ProductType } from '@/types/ProductType';
import { useAppDispatch } from '@/hooks/ReduxHooks';
import { showToastThunk } from '@/store/slices/toastSlice';

export default function AddToCartBar({product}: {product: ProductType}): React.JSX.Element {

  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useAppDispatch();

  const onAddToCart = () => {
    dispatch(addToCart({product, quantity}));
    dispatch(showToastThunk({
      type: 'success',
      message: `${product.name} added to your cart`,
    }))
  }

  return (
    <div className={styles.addToCartBar}>
      <label>
        Amount:<QuantityInput quantity={quantity} setQuantity={setQuantity} productId={product._id} />
      </label>
      <button onClick={onAddToCart} className='globalButton'>Add to cart</button> 
    </div>
  )
}