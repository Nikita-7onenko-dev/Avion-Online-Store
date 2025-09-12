import styles from './profileSettingsForm.module.scss';
import { useState } from 'react';
import { useUserSessionContext } from '@/Context/userSessionContext';

import { formDataValidator } from '@/utils/formDataValidator';
import passwordGroupValidator from '@/utils/passwordGroupValidator';

import ProfileInfoFields from '../ProfileInfoFields/ProfileInfoFields';

export default function ProfileSettingsForm() {

  const {userData, updateUser} = useUserSessionContext();

  const fieldNames = [
    "firstName", "lastName", "username",
    "oldPassword", "password", "confirmPassword",
    "phone", "email", "country", "city"
  ] as const;

  const initFormData = Object.fromEntries(
    fieldNames.map(f => [f, userData?.[f as keyof typeof userData] || ""])
  ) as Record<string, string>

  const initErrorFields = Object.fromEntries(
    fieldNames.map(f => [f, ""])
  ) as Record<keyof typeof fieldNames, string>
  
  const [edit, setEdit] = useState(false);

  const [formData, setFormData] = useState(initFormData);
  const [errors, setErrors] = useState(initErrorFields);

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const {name, value, dataset} = e.target;
    const method = dataset.method || name;
    const newFormData = {...formData, [name]: value};
    setFormData( newFormData )
    if(name === 'password' || name === 'confirmPassword' || name === 'oldPassword') {
      setErrors(prev => ({
        ...prev,
        ...passwordGroupValidator(newFormData, formDataValidator)
      }))
    } else {
      setErrors( prev => ( {...prev, [name]: formDataValidator[method](value, newFormData)} ) )
    }
  }

  function submitChanges() {

    for(let err in errors) {
      if(errors[err].length) {
        return;
      }
    }
    
    const updateData = Object.fromEntries(
      Object.entries(formData).filter(([k, v]) => {
        if(k === 'password' || k === 'confirmPassword' || k === 'oldPassword') {
          return v;
        } else return true  
      })
    );

    updateUser(updateData);
  }

  function editButtonClick() {
    if(edit) {
      setFormData(initFormData);
      setErrors(initErrorFields);
      setEdit(false);
    } else {
      setEdit(true)
    }
  }

  return (
    <form className={styles.profileForm} >
      <section>
      <div className={styles.formTitle}>
        <h2>Profile info</h2>
        <button onClick={editButtonClick} className='globalButton' type='button'>
          {edit ? "Cancel" : "Edit"} 
        </button>
      </div>
      <div className={styles.profileInfo}>
        <div>
          <ProfileInfoFields edit={edit} errors={errors} formData={formData} changeHandler={changeHandler} variation='Personal' />
          {edit &&
            <ProfileInfoFields edit={edit} errors={errors} formData={formData} changeHandler={changeHandler} variation='Passwords' />
          }
        </div>
        <div>
          <ProfileInfoFields edit={edit} errors={errors} formData={formData} changeHandler={changeHandler} variation='Contacts' />
        </div>
      </div>
      {edit && <button type='button' className='globalButton' onClick={submitChanges}>Save changes</button>}
      </section>
    </form>
  )
}