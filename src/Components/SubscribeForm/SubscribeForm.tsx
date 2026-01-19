import { formDataValidator } from '@/utils/formDataValidator';
import styles from './subscribeForm.module.scss'
import { useRef, useEffect, useState } from 'react';
import { finalFormValidation } from '@/utils/finalFormValidation';
import { useAppDispatch } from '@/hooks/ReduxHooks';
import { showToastThunk } from '@/store/slices/toastSlice';

const initField = { email: "" };
const validationRules = { isEmptyFieldsAllowed: false }

export default function SubscribeForm(): React.JSX.Element {

  const dispatch = useAppDispatch()

  const buttonRef = useRef<HTMLButtonElement>(null);
  const [gap, setGap] = useState(false);

  const [ formData, setFormData ] = useState(initField);
  const [ errors, setErrors ] = useState(initField);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const newFormData = { [name as keyof typeof initField]: value};
    setFormData(newFormData);
    setErrors({[name as keyof typeof initField]: formDataValidator(name, value, formData, validationRules) })
  }

  function onSubmit() {
    const { hasErrors, newErrorData } = finalFormValidation(formData, errors, validationRules);
    console.log(newErrorData)

    if(hasErrors) {
      setErrors(newErrorData as typeof initField);
      return;
    }

    dispatch(showToastThunk({
      type: "success",
      message: "You're in! Thanks for subscribing - stay tuned for exclusive offers and special updates ✨"
    }));
    setFormData(initField);
  }

  function onBlur() {
    if(!formData.email) setErrors(initField)
  }

  useEffect(() => {
    if(!buttonRef.current) return;
    
    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      setGap(width > 200)
    })

    observer.observe(buttonRef?.current);

    return () => observer.disconnect();
  }, [])
  
  return (
    <form 
      className={styles.subscribeForm}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      >
      {errors.email && <p>{errors.email}</p>}
      <label htmlFor="email" style={gap ? {gap: '20px'} : {}} >
        <input 
         className={errors.email ? styles.errorField : ''}
          onChange={onChange}
          value={formData.email}
          id="email"
          type="email"
          name="email"
          placeholder="your@email.com"
          onBlur={onBlur}
        />
        <button ref={buttonRef} type='button' className='globalButton' onClick={onSubmit}>Sign up</button>
      </label>
    </form>
  )
}