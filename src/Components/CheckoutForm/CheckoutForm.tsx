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
    <div className={styles.inputWrapper} key={field.name} >
      {errors[field.name as string] && <p>{errors[field.name as string]}</p>}
      <input 
        className={`${styles.textInput} ${errors[field.name as keyof typeof errors] ? styles.errorField : ''}`} 
        onChange={inputChangeHandler} 
        name={field.name}
        type={field.type}
        value={formData[field.name as keyof typeof formData]}
        placeholder={field.label}
      />
    </div>
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
        <h3>Contacts and delivery information</h3>
        {contactsAndDeliveryFields}
      </section>
      
      <section>
        <h3>Shipping method</h3>
        {shippingMethodOptionsItems}
      </section>

      <section>
        <h3>Payment</h3>
        {paymentOptionsItems}
      </section>

      <button type='button' className='globalButton' onClick={placeOrder}>Place order</button>
    </form>
  )
}