import { createContext, ReactNode, useContext, useState } from "react";
import { ProductType } from "@/types/ProductType";

type CartItem =  ProductType & {quantity: number};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: ProductType, quantity: number) => void;
  removeFromCart: (id: string) => void;
  changeCartItemQuantity: (id: string, action: 'inc' | 'dec' | 'lit', quantity?: number) => void;
  getCartTotalSum: (cart: CartItem[]) => number;
  getProductQuantity: (id: string) => number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({children}: {children: ReactNode}) {
  const [cart, setCart] = useState<CartItem[]>([]);
  // const [total, setTotal] = useState<number>(0);

  function addToCart(product: ProductType, quantity: number) {  

    const productCartItem = {...product, quantity: quantity}

    setCart(cart => {
      if(cart.some(item => item._id === productCartItem._id)) {
        return cart.map(item => {
          if(item._id === productCartItem._id) {
            return {...item, quantity: item.quantity + quantity};
          } else return item;
        })
      } else {
        return [...cart, productCartItem]
      }
    })
  } 

  function changeCartItemQuantity(id: string, action: 'inc' | 'dec' | 'lit', quantity?: number): void {
    setCart( cart => {
      return cart.map(item => {
        if(item._id === id) {
          switch(action) {
            case 'inc': return {...item, quantity: item.quantity + 1};
            case 'dec': return {...item, quantity: item.quantity - 1};
            case 'lit': return {...item, quantity: quantity!}
          } 
        } else return item;
      })
    })
  }

  function removeFromCart(id:string) {
    setCart( cart => cart.filter(item => item._id !== id))
  }

  function clearCart() {
    setCart([])
  }

  function getCartTotalSum(cart: CartItem[]) {
    return cart.reduce((acc, item) => {
      acc+= (item.price *  item.quantity)
      return acc
    }, 0)
  }

  function getProductQuantity(id: string) {
    return cart.find(item => item._id === id)!.quantity
  }

  return (
    <CartContext.Provider 
      value={{
        cart,
        addToCart,
        removeFromCart, 
        getCartTotalSum, 
        changeCartItemQuantity,
        getProductQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default function useCartContext() {
  const cartData = useContext(CartContext);
  if(!cartData) throw new Error('useCartContext must be used inside CartContextProvider')
  return cartData;
}
