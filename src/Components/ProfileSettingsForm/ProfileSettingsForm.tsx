import styles from './profileSettingsForm.module.scss';
import { useEffect, useState } from 'react';

import { formDataValidator } from '@/utils/formDataValidator';
import passwordGroupValidator from '@/utils/passwordGroupValidator';

import ProfileInfoFields from '../ProfileInfoFields/ProfileInfoFields';
import { finalFormValidation } from '@/utils/finalFormValidation';
import { useRefreshUser, useUpdateUser } from '@/queries/useUserSessionQueries';

const fieldNames = [
  "firstName", "lastName", "username",
  "oldPassword", "password", "confirmPassword",
  "phone", "email", "country", "city"
] as const;

const initErrorFields = Object.fromEntries(
  fieldNames.map(f => [f, ""])
) as Record<typeof fieldNames[number], string>

export default function ProfileSettingsForm() {

  const { data: userData } = useRefreshUser();
  const { mutate: updateUser } = useUpdateUser();

  const initFormData = Object.fromEntries(
    fieldNames.map(f => [f, userData?.[f as keyof typeof userData] || ""])
  ) as Record<typeof fieldNames[number], string>

  const [edit, setEdit] = useState(false);

  const [formData, setFormData] = useState(initFormData);
  const [errors, setErrors] = useState(initErrorFields);

  useEffect(() => {
    if (!edit && userData) {
      setFormData(initFormData);
      setErrors(initErrorFields);
    } 
  }, [userData, edit]);

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

    const {hasErrors, newErrorData} = finalFormValidation({...formData}, errors, {isEmptyFieldsAllowed: true})

    if(hasErrors) {
      setErrors(newErrorData);
      return;
    }
    
    const updateData = Object.fromEntries(  // Очистить от пустых полей
      Object.entries(formData).filter(([k, v]) => {
        if(k === 'password' || k === 'confirmPassword' || k === 'oldPassword') {
          return v;
        } else return true;
      })
    );

    updateUser(updateData);
    setEdit(false);
  }

  return (
    <form className={styles.profileForm} onSubmit={(e) => {
      e.preventDefault();
      submitChanges();
    }}>
      <div>
        <div className={styles.formTitle}>
          <h2>Profile info</h2>
          <button onClick={() => setEdit(prev => !prev)} className='globalButton' type='button'>
            {edit ? "Cancel" : "Edit"} 
          </button>
        </div>
        <div className={styles.profileInfo}>
            <ProfileInfoFields edit={edit} errors={errors} formData={formData} changeHandler={changeHandler} variation='Personal' />
            <ProfileInfoFields edit={edit} errors={errors} formData={formData} changeHandler={changeHandler} variation='Contacts' />
        </div>
        {edit && <button type='submit' className='globalButton' >Save changes</button>}
      </div>
    </form>
  )
}