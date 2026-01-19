import styles from './feedbackForm.module.scss'
import React, { useState } from 'react'
import { ClipLoader } from 'react-spinners'
import { formDataValidator } from '@/utils/formDataValidator'
import { finalFormValidation } from '@/utils/finalFormValidation'
import { useAppDispatch } from '@/hooks/ReduxHooks'
import { showToastThunk } from '@/store/slices/toastSlice'


type Props = {
  ref: React.RefObject<null | HTMLFormElement>
}

const initFormDataFields = {
  name: "",
  email: "",
  subject: "",
  message: ""
};

const validationRules = { isEmptyFieldsAllowed: false };

const base = process.env.PUBLIC_URL;


export default function FeedbackForm({ref}: Props): React.JSX.Element {

  const [isLoad, setIsLoad] = useState(false);
  const [formData, setFormData] = useState<typeof initFormDataFields>(initFormDataFields);
  const [errors, setErrors] = useState<typeof initFormDataFields>(initFormDataFields);

  const dispatch = useAppDispatch()

  function changeHandler(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    setErrors(prev => ({ ...prev, [name]: formDataValidator(name, value, formData, validationRules) }));
  }

  function onSubmit() {
    const { newErrorData, hasErrors } = finalFormValidation(formData, errors, validationRules);

    if(hasErrors) {
      setErrors(newErrorData as typeof initFormDataFields);
      return;
    }
    
    dispatch(showToastThunk({
      type: "success",
      message: "Thank you! Your message has been sent. We'll review it and get back to you if needed"
    }));
    setFormData(initFormDataFields);
  }

  return (
    <div className={styles.feedbackFormContainer}>
      <div className={styles.imageWrapper}>
        <img 
        src={`${base}/img/feedbackForm2.webp`}
        alt="" 
        loading='lazy'
        onLoad={() => setIsLoad(true)} 
        style={isLoad ? {visibility: 'visible'} : {visibility: 'hidden'} } 
        />
        <ClipLoader 
          color={'#2a254b'}
          size={80}
          cssOverride={isLoad ? {display: 'none'} : {display: 'inline-block', position: 'absolute'} } 
        />
      </div>
      <form action="submit-form" className={styles.feedbackForm} ref={ref} 
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <h3>Feedback form</h3>
        <fieldset>
          <div>
            <label htmlFor="name">
              Name:
              {errors.name && <p>{errors.name}</p>}
              <input
                className={errors.name ? styles.errorField : ''}
                type="text" id="name" name="name" placeholder="Enter your name" value={formData.name} onChange={changeHandler} />
            </label>
          </div>
          <div>
            <label htmlFor="email">
              Email:
              {errors.email && <p>{errors.email}</p>}
              <input 
                className={errors.email ? styles.errorField : ''}
                type="email" id="email" name="email" placeholder="Enter your email" value={formData.email} onChange={changeHandler} />
            </label>
          </div>
        </fieldset>
        <fieldset>
              <div>
            <label htmlFor="subject">Subject:</label>
            <input type="subject" id="subject" name="subject" placeholder="Subject of your message" value={formData.subject} onChange={changeHandler} />
          </div>
          <div>
            <label htmlFor="message">
              Message:
              {errors.message && <p>{errors.message}</p>}
              <textarea 
                className={errors.message ? styles.errorField : ''}
                id="message" name="message" placeholder="Type your message here..." value={formData.message} onChange={changeHandler}></textarea>
            </label>
          </div>
        </fieldset>
        <button type="button" className='globalButton' onClick={onSubmit}>Send</button>
      </form>   
    </div>
  )
}