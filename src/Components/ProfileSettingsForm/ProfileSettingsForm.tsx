import styles from './profileSettingsForm.module.scss';
import { useState } from 'react';

import { formDataValidator } from '@/utils/formDataValidator';
import passwordGroupValidator from '@/utils/passwordGroupValidator';

import ProfileInfoFields from '../ProfileInfoFields/ProfileInfoFields';
import { finalFormValidation } from '@/utils/finalFormValidation';
import { useRefreshUser, useUpdateUser } from '@/queries/useUserSessionQueries';

export default function ProfileSettingsForm() {

  const { data: userData} = useRefreshUser();
  const { mutate: updateUser } = useUpdateUser();

  const fieldNames = [
    "firstName", "lastName", "username",
    "oldPassword", "password", "confirmPassword",
    "phone", "email", "country", "city"
  ] as const;

  const initFormData = Object.fromEntries(
    fieldNames.map(f => [f, userData?.[f as keyof typeof userData] || ""])
  ) as Record<typeof fieldNames[number], string>

  const initErrorFields = Object.fromEntries(
    fieldNames.map(f => [f, ""])
  ) as Record<typeof fieldNames[number], string>
  
  const [edit, setEdit] = useState(false);

  const [formData, setFormData] = useState(initFormData);
  const [errors, setErrors] = useState(initErrorFields);

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const {name, value} = e.target;
    const newFormData = {...formData, [name]: value};
    setFormData( newFormData )
    if(name === 'password' || name === 'confirmPassword' || name === 'oldPassword') {
      setErrors(prev => ({
        ...prev,
        ...passwordGroupValidator(newFormData)
      }))
    } else {
      setErrors( prev => ( {...prev, [name]: formDataValidator(name, value, newFormData, {isEmptyFieldsAllowed: true})} ) )
    }
  }

  function submitChanges() {

    const {hasErrors, newErrorData} = finalFormValidation(formData, errors, {isEmptyFieldsAllowed: true})

    if(hasErrors) {
      setErrors(newErrorData);
      return
    }
    
    const updateData = Object.fromEntries(
      Object.entries(formData).filter(([k, v]) => {
        if(k === 'password' || k === 'confirmPassword' || k === 'oldPassword') {
          return v;
        } else return true;
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
          {
            edit && <ProfileInfoFields edit={edit} errors={errors} formData={formData} changeHandler={changeHandler} variation='Passwords' />
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