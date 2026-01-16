import styles from './profileInfoFields.module.scss';
import { useState } from 'react';
import {profileInfoFieldsDictionary } from '@/data/profileInfoFieldsDictionary';

type Props = {
  edit: boolean;
  formData: Record<string, string>
  errors: Record<string, string>
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;

  variation: 'Personal' | 'Contacts';
}

export default function ProfileInfoFields({edit, errors, formData, changeHandler, variation}: Props ): React.JSX.Element {

  let infoItems = profileInfoFieldsDictionary[variation].map(field => (
      <label key={field.label} htmlFor={field.name} className={styles.inputLabel}>
        <span>{field.label}</span>
        {edit ? 
         <div className={styles.inputWrapper} >
            {errors[field.name as string] && <p>{errors[field.name as string]}</p>}
            <input 
              id={field.name}
              className={`${styles.infoInput} ${errors[field.name as keyof typeof errors] ? styles.errorField : ''}`}
              value={formData?.[field.field as keyof typeof formData]}
              onChange={changeHandler} 
              name={field.name} 
              type={field.type} 
            /> 
          </div>  
            : <p className={styles.infoField}>{formData?.[field.field as keyof typeof formData]}</p>
          }
      </label>
  ));

  const [showPassword, setShowPassword] = useState(false);

  if(variation === 'Personal') {

    let passwordItems = profileInfoFieldsDictionary['Passwords'].map(field => (
      <label key={field.label} className={styles.inputLabel} >
        <span>{field.label}</span>
        <div className={styles.inputWrapper} >
          {errors[field.name as string] && <p>{errors[field.name as string]}</p>}
          <input 
            className={`${styles.infoInput} ${errors[field.name as keyof typeof errors] ? styles.errorField : ''}`}
            onChange={changeHandler} 
            name={field.name} 
            type={showPassword ? "text" : "password"} />
        </div>
      </label>
    ));

    return (
      <section className={styles.fieldsSection}>
        {infoItems}
        { edit && 
          <>
            {passwordItems}
            <label key='checkBox' htmlFor='showPassword' className={styles.checkbox}>
              <input onChange={() => setShowPassword(prev => !prev)} id='showPassword' type="checkbox" />Show password 
            </label>
          </>
        }
      </section>
    )
  }
 
  return (
    <section className={styles.fieldsSection}>
      {infoItems}
    </section>
  )
}