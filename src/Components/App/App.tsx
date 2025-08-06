import Header from '@/Components/Header/Header';
import HomePage from '@/pages/HomePage';
import Footer from '../Footer/Footer';
import ProductPage from '@/pages/ProductPage';
import AboutPage from '@/pages/AboutPage';
import AllProductsPage from '@/pages/AllProductsPage/AllProductsPage';
import ShoppingCart from '../../pages/ShoppingCart/ShoppingCart';

import { Route, Routes } from 'react-router-dom';

import { FiltersContext } from '@/Context/FiltersContext';
import getFiltersContextValue from '@/utils/getFilterContextValue';
import { CartProvider } from '@/Context/CartContext';
import ContactsPage from '@/pages/ContactsPage';

const filtersContextValue = getFiltersContextValue();

export default function App(): React.JSX.Element {
  
  return (
    <CartProvider> 
      <FiltersContext.Provider value={filtersContextValue}>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/shoppingCart' element={<ShoppingCart />} />
            <Route path='/allProducts' element={<AllProductsPage />} />
            <Route path='/:id' element={<ProductPage />} />
            <Route path='/contacts' element={<ContactsPage />} />
          </Routes>
        </main>
        <Footer />
      </FiltersContext.Provider>
    </CartProvider>
  )
}