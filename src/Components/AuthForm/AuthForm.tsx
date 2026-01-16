import styles from './registerForm.module.scss';
import { useState } from "react";
import { formDataValidator } from "@/utils/formDataValidator";
import { finalFormValidation } from '@/utils/finalFormValidation';
import { usePostUser } from '@/queries/useUserSessionQueries';

type Props = {
  variation: 'Sign up' | 'Log in';
  setSwitchForm: React.Dispatch<React.SetStateAction<boolean>>;
}

type FormDataType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
} | {
  email: string;
  password: string;
}

type ErrorsDataType = Partial<Record<keyof FormDataType, string>>;

const placeHolders = {
  username: 'Your name',
  email: 'Your email',
  password: 'Password',
  confirmPassword: 'Confirm password'
};

const validationRules = {
  isEmptyFieldsAllowed: false
}

export default function AuthForm({variation, setSwitchForm}: Props): React.JSX.Element {

  const { mutate: postUser } = usePostUser();
  const isSignUp = variation === 'Sign up';

  const initFormDataFields = isSignUp ? {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  } : {
    email: '',
    password: '',
  }

  const [formData, setFormData] = useState<FormDataType>(initFormDataFields);
  const [errors, setErrors] = useState<ErrorsDataType>(initFormDataFields);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  function sendFormData() {
    const {newErrorData, hasErrors} = finalFormValidation(formData, errors, validationRules)

    if(hasErrors) {
      setErrors(newErrorData);
      return;
    };

    postUser(formData);
  }

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name: field , value } = e.target;
    const newFormData = {...formData, [field]: value};
    const isValidatingPasswords = 'confirmPassword' in newFormData && (field === 'password' || field === 'confirmPassword');
    setFormData( newFormData );
    if(isValidatingPasswords) {
      setErrors(prev => ({
        ...prev, 
        'password': formDataValidator('password', newFormData.password, newFormData, validationRules),
        'confirmPassword': formDataValidator( 'confirmPassword', newFormData.confirmPassword ?? '', newFormData, validationRules)
      }))
    } else {
      setErrors(prev => ({...prev, [field]: formDataValidator(field, value, newFormData, validationRules)}))
    }
  }

  const formInputs = Object.keys(formData).map(field => {
    return (
      <div className={styles.inputWrapper} key={field}>
        {errors[field as keyof ErrorsDataType] && <p>{errors[field as keyof ErrorsDataType]}</p>}
        <input 
          className={errors[field as keyof ErrorsDataType] ? styles.errorField : ''}
          type={(field === 'password' || field === 'confirmPassword') ? (showPassword ? 'text' : 'password') : field}
          name={field}
          value={formData[field as keyof FormDataType]} 
          onChange={changeHandler}
          placeholder={placeHolders[field as keyof FormDataType]}
          autoComplete="AutoFill"
        />
      </div>
    )
  })
  
  const switchButtonLabel = isSignUp ? 'Log in' : 'Sign up';
  const question = isSignUp ? "Already have an account?" : "Don't have an account?";
 
  return (
    <div className={styles.registerFormBlock}>
        <form 
          onSubmit={(e) => {
            e.preventDefault(); 
            sendFormData();
        }}>
          <h2>{variation}</h2>
          {formInputs}
          <label><input type="checkbox" onChange={() => setShowPassword(prev => !prev) } />Show password</label>
          <button type="submit" className="globalButton">{variation}</button>
          <div className={styles.switchFormWrapper}>
            <p>{question}</p>
            <button type="button" className="globalButton" onClick={() => setSwitchForm(prev => !prev)}>{switchButtonLabel}</button>
          </div>
        </form>
    </div>
  )
}