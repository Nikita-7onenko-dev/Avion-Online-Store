import styles from './checkoutPage.module.scss';

import { clearCart } from '@/store/slices/cartSlice';
import { useEffect, useRef, useState } from 'react';
import { formDataValidator } from '@/utils/formDataValidator';
import { useAppDispatch, useAppSelector } from '@/hooks/ReduxHooks';

import { CheckoutForm } from '@/Components/CheckoutForm/CheckoutForm';
import { Link } from 'react-router-dom';
import { finalFormValidation } from '@/utils/finalFormValidation';
import { useRefreshUser } from '@/queries/useUserSessionQueries';

const fieldNames = [
  'email', 'phone', 'firstName', 'lastName', 'country', 'city', 'address', 'shippingMethod', 'payment'
] as const;

type orderDetailsType = {
  productName: string;
  productId: string;
  quantity: number;
}

type OrderType = {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  address: string;
  shippingMethod: string;
  payment: string;
  date: string;
  orderDetails: orderDetailsType[];
}

const validationRules = {
  isEmptyFieldsAllowed: false,
}

export default function CheckoutPage(): React.JSX.Element {

  useEffect(() => {
    window.scrollTo(0,0)
  }, []);

  const { data: userData } = useRefreshUser();
  const cart = useAppSelector( state => state.cart );
  const dispatch = useAppDispatch();
  const [isShowMessage, setIsShowMessage] = useState(false);

  const contactsAndDeliverySectionRef = useRef<null | HTMLElement>(null)

  const initFormData = Object.fromEntries(
    fieldNames.map(f => [f, userData?.[f as keyof typeof userData] || ""])
  ) as Record<typeof fieldNames[number], string>;

  initFormData.shippingMethod = 'Standard delivery';
  initFormData.payment = 'Credit card';

  const initErrorFields = Object.fromEntries(
    fieldNames.map(f => [f, ""])
  ) as Record<typeof fieldNames[number], string>;

  const [formData, setFormData] = useState(initFormData);
  const [errors, setErrors] = useState(initErrorFields);

  function inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const {name, value} = e.target;
    const newFormData = {...formData, [name]: value };

    setFormData(newFormData);
    setErrors(prev => ({
      ...prev,
      [name]: formDataValidator(name, value, newFormData, validationRules)
    }));
  }

  function placeOrder() {
    const {newErrorData, hasErrors} = finalFormValidation(formData, errors, {isEmptyFieldsAllowed: false})

    if(hasErrors) {
      setErrors(newErrorData);
      contactsAndDeliverySectionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      return;
    }

    const order: OrderType = { 
      ...formData,
      date: new Date().toISOString(),
      orderDetails: cart.map(product => ({
          productName: product.name,
          productId: product._id,
          quantity: product.quantity
        })
      )
    }

    console.log(order);
    dispatch(clearCart());
    setIsShowMessage(true);
  }

  return (
    <div className={styles.checkoutContainer}>
      {isShowMessage ? (
        <div className={styles.message}>
          <h2>Thank you for your order! 🎉</h2>
          <p>
            Your order has been successfully placed. <br />
            Order number: #12345
          </p>
          <Link to={'/'} className='globalLink'>Return to Home </Link>
        </div>
      ) : <CheckoutForm
            formData={formData}
            errors={errors}
            setFormData={setFormData}
            inputChangeHandler={inputChangeHandler}
            formRef={contactsAndDeliverySectionRef}
            placeOrder={placeOrder}
          />}
    </div>
  )
}