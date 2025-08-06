import useCartContext from '@/Context/CartContext';
import styles from './quantityInput.module.scss';

type Props = {
  quantity: number;
  setQuantity?: React.Dispatch<React.SetStateAction<number>>;
  productId: string;
}
 
export default function QuantityInput({quantity, setQuantity, productId}: Props): React.JSX.Element {

  const {changeCartItemQuantity} = useCartContext()

  function inc() {
    if(setQuantity) {
      setQuantity(prev => prev + 1)
    } else {
      changeCartItemQuantity(productId, 'inc')
    }
  }

  function dec() {
    if(setQuantity) {
      setQuantity(prev => prev - 1)
    } else {
      changeCartItemQuantity(productId, 'dec')
    }
  }

  function lit(value: number) {
    if(value < 1) return;
    if(setQuantity) {
      setQuantity(value)
    } else {
      changeCartItemQuantity(productId, 'lit', value)
    }
  } 

  return (
    <div className={styles.quantityInput}>
      <button
        onClick={dec}
        disabled={quantity < 2}
        style={quantity < 2 ? {color: 'gray'} : {}}
      >-</button>
      <input 
        type="number"
        value={quantity}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => lit(Math.round( Number(e.target.value) ))}
      />
      <button
        onClick={inc}
      >+</button>
    </div> 
  )
}