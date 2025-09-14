import styles from './checkoutPage.module.scss';

import useCartContext from '@/Context/CartContext';
import { useUserSessionContext } from '@/Context/userSessionContext';
import { useEffect, useRef, useState } from 'react';

import { formDataValidator } from '@/utils/formDataValidator';
import { contactsAndDeliveryFieldsDictionary, shippingMethodsDictionary, paymentOptionsDictionary } from '@/data/checkoutFieldsDictionary';
import { Link } from 'react-router-dom';

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

export default function CheckoutPage(): React.JSX.Element {

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

  const {userData} = useUserSessionContext();
  const {cart, clearCart} = useCartContext();
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
    const {name, value, dataset} = e.target;
    const method = dataset.method || name;
    const newFormData = {...formData, [name]: value };

    setFormData(newFormData);
    setErrors(prev => ({
      ...prev,
      [name]: formDataValidator[method](value, newFormData, true)
    }));
  }

  function placeOrder() {

    const newErrorData: typeof errors = {...errors}

    for(const key in formData) {
      const value = formData[key as keyof typeof formData];
      if(!value) {
        newErrorData[key as keyof typeof errors] = 'Field must be filled';
      } else {
        newErrorData[key as keyof typeof errors] = '';
      }
    }

    const hasErrors = Object.values(newErrorData).some(err => err);
    setErrors(newErrorData);

    if(hasErrors) {
      contactsAndDeliverySectionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
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
    clearCart();
    setIsShowMessage(true);
  }

  const contactsAndDeliveryFields = contactsAndDeliveryFieldsDictionary.map(field => (
      <input 
        key={field.name}
        className={errors[field.name as keyof typeof errors] ? styles.errorField : ''} 
        onChange={inputChangeHandler} 
        name={field.name}
        type={field.type}
        value={formData[field.name as keyof typeof formData]}
        data-method={field.dataMethod && field.dataMethod}
        placeholder={field.label}
      />
  ))

  const shippingMethodOptionsItems = shippingMethodsDictionary.map( (field, index)=> (
    <label key={field.value}>          
      <input 
        type="radio" 
        value={field.value} 
        name={field.name}
        onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value })} 
        defaultChecked={index === 0}
      />
      <span>{field.value}</span>
    </label>
  ))

  const paymentOptionsItems = paymentOptionsDictionary.map( (field, index) => (
    <label key={field.value}>
      <input 
        type="radio" 
        value={field.value} 
        name={field.name}
        onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value })} 
        defaultChecked={index === 0}
      />
      <span>{field.value}</span>
    </label>
  ))

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
      ) : (
        <form className={styles.checkoutForm}>

          <section ref={contactsAndDeliverySectionRef}>
            <p>Contacts and delivery information</p>
            {contactsAndDeliveryFields}
          </section>
          
          <section>
            <p>Shipping method</p>
            {shippingMethodOptionsItems}
          </section>

          <section>
            <p>Payment</p>
            {paymentOptionsItems}
          </section>

          <button type='button' className='globalButton' onClick={placeOrder}>Place order</button>
        </form>
      )}
    </div>
  )
}