import styles from './checkoutForm.module.scss';

import { contactsAndDeliveryFieldsDictionary } from '@/data/checkoutFieldsDictionary';
import { shippingMethodsDictionary } from '@/data/checkoutFieldsDictionary';
import { paymentOptionsDictionary } from '@/data/checkoutFieldsDictionary';

type Props = {
  formData: Record<string, string>;
  errors: Record<string, string>;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>
  inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>): void;
  placeOrder(): void;
  formRef: React.RefObject<HTMLElement | null>
}

export function CheckoutForm({
  formData,
  errors,
  setFormData,
  inputChangeHandler,
  placeOrder,
  formRef
}: Props) {

  const contactsAndDeliveryFields = contactsAndDeliveryFieldsDictionary.map(field => (
    <input 
      key={field.name}
      className={errors[field.name as keyof typeof errors] ? styles.errorField : ''} 
      onChange={inputChangeHandler} 
      name={field.name}
      type={field.type}
      value={formData[field.name as keyof typeof formData]}
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
    <form className={styles.checkoutForm}>
      
      <section ref={formRef}>
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
  )
}