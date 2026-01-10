import { useAppDispatch } from '@/hooks/ReduxHooks';
import styles from './quantityInput.module.scss';
import { changeCartItemQuantity } from '@/store/slices/cartSlice';

type Props = {
  quantity: number;
  setQuantity?: React.Dispatch<React.SetStateAction<number>>;
  productId: string;
}
 
export default function QuantityInput({quantity, setQuantity, productId}: Props): React.JSX.Element {

  const dispatch = useAppDispatch()

  function inc() {
    if(setQuantity) {
      setQuantity(prev => prev + 1)
    } else {
      dispatch(changeCartItemQuantity({id: productId, operation: 'inc'}))
    }
  }

  function dec() {
    if(setQuantity) {
      setQuantity(prev => prev - 1)
    } else {
      dispatch(changeCartItemQuantity({id: productId, operation: 'dec'}))
    }
  }

  function lit(quantity: number) {
    if(quantity < 1) return;
    if(setQuantity) {
      setQuantity(quantity)
    } else {
      dispatch(changeCartItemQuantity({id: productId, operation: 'lit', quantity}))
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