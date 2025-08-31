import styles from './registerForm.module.scss';
import { useState } from "react";
import { useUserSessionContext } from "@/Context/userSessionContext";
import { formDataValidator } from "@/utils/formDataValidator";

type Props = {
  variation: 'Sign up' | 'Log in';
  setSwitchForm: React.Dispatch<React.SetStateAction<boolean>>;
}

type FormDataType = {
  username?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

type ErrorsDataType = Partial<Record<keyof FormDataType, string>>;

const placeHolders = {
  username: 'Your name',
  email: 'Your email',
  password: 'Password',
  confirmPassword: 'Confirm password'
};

export default function AuthForm({variation, setSwitchForm}: Props): React.JSX.Element {

  const {postUser} = useUserSessionContext();
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

    const newErrorData = {} as ErrorsDataType;

    for (const key in formData) {
      const value = formData[key as keyof FormDataType] || '';
      newErrorData[key as keyof ErrorsDataType] = formDataValidator[key](value, formData)
    }
    setErrors(newErrorData)
    const hasErrors = Object.values(newErrorData).some(err => !!err)
    if(hasErrors) return;
    
    postUser(formData)
  }

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const field = e.target.name;
    const value = e.target.value;
    const newFormData = {...formData, [field]: value};
    setFormData( newFormData )
    if(field === 'password' || field === 'confirmPassword') {
      setErrors(prev => ({
        ...prev, 
        'password': formDataValidator.password(newFormData.password, newFormData),
        'confirmPassword': formDataValidator.confirmPassword(newFormData.confirmPassword ?? '', newFormData)
      }))
    } else {
      setErrors(prev => ({...prev, [field]: formDataValidator[field](value, newFormData)}))
    }
  }

  const formInputs = Object.keys(formData).map(field => {
    return (
      <input 
        key={field}
        className={errors[field as keyof ErrorsDataType] ? styles.errorField : ''}
        type={(field === 'password' || field === 'confirmPassword') ? (showPassword ? 'text' : 'password') : field}
        name={field}
        value={formData[field as keyof FormDataType]} 
        onChange={changeHandler}
        placeholder={placeHolders[field as keyof FormDataType]}
        autoComplete="AutoFill"
      />
    )
  })
  
  const switchButtonLabel = isSignUp ? 'Log in' : 'Sign up';
  const question = isSignUp ? "Already have an account?" : "Don't have an account?";
 
  return (
    <div className={styles.registerFormBlock}>
        <form onSubmit={() => sendFormData()}>
          <h2>{variation}</h2>
          {formInputs}
          <label><input type="checkbox" onChange={() => setShowPassword(prev => !prev) } />Show password</label>
          <button type="button" className="globalButton" onClick={sendFormData}>{variation}</button>
          <div>
            <p>{question}</p>
            <button type="button" className="globalButton" onClick={() => setSwitchForm(prev => !prev)}>{switchButtonLabel}</button>
          </div>
        </form>
    </div>
  )
}