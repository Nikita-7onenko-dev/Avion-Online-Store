import style from './shoppingCart.module.scss';

import ShoppingCartProductCard from "../../Components/ShoppingCartProductCard/ShoppingCartProductCard";
import QuantityInput from '../../Components/QuantityInput/QuantityInput';
import useCartContext from '@/Context/CartContext';

import { Link } from 'react-router-dom';

export default function ShoppingCart(): React.JSX.Element {
  
  const {cart, getCartTotalSum, getProductQuantity} = useCartContext();

  if(cart.length === 0) {
    return (
      <div className={style.shoppingCartBlock}>
        <h2>Your cart is empty</h2>
      </div> 
    )
  }

  const addedProductsList = cart.map(product => (
    <tr key={product._id}>
      <td>
          <ShoppingCartProductCard product={product} quantity={getProductQuantity(product._id)} />
      </td>
      <td><QuantityInput quantity={getProductQuantity(product._id)} productId={product._id}/></td>
      <td style={{whiteSpace: 'nowrap'}}>{product.price * getProductQuantity(product._id)} $</td>
    </tr>
  ))

  return (
    <div className={style.shoppingCartBlock}>
      <h2>Your shopping cart</h2>
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
            <th colSpan={3}>Subtotal <span>{getCartTotalSum(cart)} $</span></th>
          </tr> 
          <tr>
            <td colSpan={3}>Taxes and shipping are calculated at checkout</td>
          </tr>
          <tr>
            <td colSpan={3}><Link to='/' className='globalLink'>Go to checkout</Link></td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}