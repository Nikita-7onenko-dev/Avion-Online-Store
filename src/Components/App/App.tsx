import Header from '@/Components/Header/Header';
import HomePage from '@/pages/HomePage';
import Footer from '../Footer/Footer';
import ProductPage from '@/pages/ProductPage';
import AboutPage from '@/pages/AboutPage';
import AllProductsPage from '@/pages/AllProductsPage/AllProductsPage';
import ShoppingCart from '../../pages/ShoppingCart/ShoppingCart';
import ContactsPage from '@/pages/ContactsPage';
import UserPage from '@/pages/UserPage';

import { Route, Routes } from 'react-router-dom';

import {ProductsAndFiltersProvider} from '@/Context/FiltersAndProductsContextProvider';
import { CartProvider } from '@/Context/CartContext';
import { UserSessionContextProvider } from '@/Context/userSessionContext';
import CheckoutPage from '../CheckoutPage/CheckoutPage';



export default function App(): React.JSX.Element {
  
  return (
    <UserSessionContextProvider>
      <CartProvider> 
        <ProductsAndFiltersProvider>
          <Header />
          <main>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/about' element={<AboutPage />} />
              <Route path='/shoppingCart' element={<ShoppingCart />} />
              <Route path='/allProducts' element={<AllProductsPage />} />
              <Route path='/:id' element={<ProductPage />} />
              <Route path='/contacts' element={<ContactsPage />} />
              <Route path='/profile' element={<UserPage/>} />
              <Route path='/checkout' element={<CheckoutPage />} />
            </Routes>
          </main>
          <Footer />
        </ProductsAndFiltersProvider>
      </CartProvider>
    </UserSessionContextProvider>
  )
}