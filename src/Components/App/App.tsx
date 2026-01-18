import Header from '@/Components/Header/Header';
import HomePage from '@/pages/HomePage';
import Footer from '../Footer/Footer';
import ProductPage from '@/pages/ProductPage';
import AllProductsPage from '@/pages/AllProductsPage/AllProductsPage';
import ShoppingCart from '../../pages/ShoppingCart/ShoppingCart';
import { Route, Routes } from 'react-router-dom';
import React, { Suspense } from 'react';
import { PageLoader } from '../PageLoader/PageLoader';

const AboutPage = React.lazy(() => import('@/pages/AboutPage'));
const ContactsPage = React.lazy(() => import('@/pages/ContactsPage'));
const UserPage = React.lazy(() => import('@/pages/UserPage'));
const CheckoutPage = React.lazy(() => import('@/pages/CheckoutPage/CheckoutPage'));

export default function App(): React.JSX.Element {
  
  return (
          <>
            <Header />
            <main>
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/about' element={<Suspense fallback={<PageLoader />}> <AboutPage /> </Suspense>} />
                <Route path='/shoppingCart' element={<ShoppingCart />} />
                <Route path='/allProducts' element={<AllProductsPage />} />
                <Route path='/:id' element={<ProductPage />} />
                <Route path='/contacts' element={<Suspense fallback={<PageLoader />}> <ContactsPage /> </Suspense>} />
                <Route path='/profile' element={<Suspense fallback={<PageLoader />}> <UserPage/> </Suspense>} />
                <Route path='/checkout' element={<Suspense fallback ={<PageLoader />}> <CheckoutPage /> </Suspense>} />
              </Routes>
            </main>
            <Footer />
          </>
  )
}