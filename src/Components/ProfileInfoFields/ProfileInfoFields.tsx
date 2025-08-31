import styles from './profileInfoFields.module.scss';
import { useState } from 'react';
import {profileInfoFieldsDictionary } from '@/data/profileInfoFieldsDictionary';

type Props = {
  edit: boolean;
  formData: Record<string, string>
  errors: Record<string, string>
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;

  variation: 'Personal' | 'Contacts' | 'Passwords';
}

export default function ProfileInfoFields({edit, errors, formData, changeHandler, variation}: Props ): React.JSX.Element {

  let infoItems;

  const [showPassword, setShowPassword] = useState(false);

  if(variation === 'Personal' || variation === 'Contacts') {

    infoItems = profileInfoFieldsDictionary[variation].map(field => (
      <label key={field.label}>
        <span>{field.label}</span>
        {edit ? 
          <input 
            className={errors[field.field as keyof typeof errors] ? styles.errorField : ''}
            value={formData?.[field.field as keyof typeof formData]}
            onChange={changeHandler} 
            name={field.name} 
            type={field.type} 
            data-method={field.dataMethod && field.dataMethod}
          /> : 
          <p>{formData?.[field.field as keyof typeof formData]}</p>}
      </label>
    ));
    
  } else if(variation === 'Passwords') {
    
    infoItems = profileInfoFieldsDictionary[variation].map(field => (
      <label key={field.label}>
        <span>{field.label}</span>
        <input 
          className={errors[field.name as keyof typeof errors] ? styles.errorField : ''} 
          onChange={changeHandler} 
          name={field.name} 
          type={showPassword ? "text" : "password"} />
      </label>
    ))

    return (
      <>
       {infoItems}
        <label key='checkBox' className={styles.checkbox}>
          <input onChange={() => setShowPassword(prev => !prev)} type="checkbox" />Show password 
        </label>
      </>
    )
  }
 
  return (
    <>
      {infoItems}
    </>
  )
}