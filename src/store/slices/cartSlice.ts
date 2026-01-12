import { ProductType } from "@/types/ProductType";
import { safeParse } from "@/utils/safeParse";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItem =  ProductType & {quantity: number};

const initialState = safeParse<CartItem[]>(localStorage.getItem('cart'), []);

type QuantityAction = 
| { id: string; operation: 'inc' | 'dec' } 
| { id: string; operation: 'lit'; quantity: number; }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<{product: ProductType, quantity: number}>) {
      const {product, quantity} = action.payload;
      const cartItem = {...product, quantity};
      
      if( state.find(item => item._id === product._id) ) {
        return state.map(item => {
          if(item._id === product._id) return {...item, quantity: item.quantity + quantity}
          else return item;
        })
      } else return [...state, cartItem]
    },

    changeCartItemQuantity(state, action: PayloadAction<QuantityAction>) {
      const {id, operation } = action.payload;

      return state.map(item => {
        if(item._id === id) {
          switch(operation) {
            case 'inc': return {...item, quantity: item.quantity + 1};
            case 'dec': return {...item, quantity: item.quantity - 1};
            case 'lit': return {...item, quantity: action.payload.quantity};
          }
        } else return item;
      })
    },

    removeFromCart(state, action: PayloadAction<string>) {
      const id = action.payload
      return state.filter(item => item._id !== id)
    },

    clearCart() {
      return [];
    }
  }
})

export function getCartTotalSum(cart: CartItem[]) {
  return cart.reduce( (sum, item) => {
    return sum += (item.price * item.quantity)
  }, 0)
}

export const {
  addToCart,
  changeCartItemQuantity,
  removeFromCart,
  clearCart
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer