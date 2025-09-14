import style from './orderTable.module.scss';

import ShoppingCartProductCard from "../../Components/ShoppingCartProductCard/ShoppingCartProductCard";
import QuantityInput from '../../Components/QuantityInput/QuantityInput';
import useCartContext from '@/Context/CartContext';

import { Link } from 'react-router-dom';

type Props = {
  variation: "shopping cart" | "orders history";
}

export default function ShoppingCart({variation}: Props): React.JSX.Element {

  const isShoppingCart = variation === 'shopping cart';

  const {cart, getCartTotalSum, getProductQuantity} = useCartContext();
  
  let addedProductsList;

  const totalSum = isShoppingCart ? getCartTotalSum(cart) : '';

  
  const isEmptyTable = isShoppingCart ? cart.length === 0 : '';
  if(isEmptyTable) {
    return (
      <div className={style.shoppingCartBlock}>
        <h2>{`Your ${variation} is empty`}</h2>
      </div> 
    )
  }

  if(isShoppingCart) {

    addedProductsList = cart.map(product => (
      <tr key={product._id}>
        <td>
            <ShoppingCartProductCard product={product} quantity={getProductQuantity(product._id)} />
        </td>
        <td><QuantityInput quantity={getProductQuantity(product._id)} productId={product._id}/></td>
        <td style={{whiteSpace: 'nowrap'}}>{product.price * getProductQuantity(product._id)} $</td>
      </tr>
    ))
  } else {

  }

  return (
    <div className={style.shoppingCartBlock}>
      <h2>{`Your ${variation}`}</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {addedProductsList}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={3}>Subtotal <span key={totalSum}>{totalSum} $</span></th>
          </tr> 
          {isShoppingCart ? (
            <>
              <tr>
                <td colSpan={3}>Taxes and shipping are calculated at checkout</td>
              </tr>
              <tr>
                <td colSpan={3}><Link to='/' className='globalButton'>Go to checkout</Link></td>
              </tr>
            </>
            ) : (
              <tr>
                <td colSpan={3}>{`Order status: ${'status'}`}</td>
              </tr>
            )}
        </tfoot>
      </table>
    </div>
  )
}