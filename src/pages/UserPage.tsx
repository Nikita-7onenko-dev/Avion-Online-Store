import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useUserSessionContext } from "@/Context/userSessionContext";
import EmailActivationMessage from "@/Components/EmailActivationMessage/EmailActivationMessage";
import ProfileBlock from "@/Components/ProfileBlock/ProfileBlock";
import AuthForm from "@/Components/AuthForm/AuthForm";


export default function UserPage(): React.JSX.Element {

  const [switchForm, setSwitchForm] = useState<boolean>(true);
  const {userData, isLoading} = useUserSessionContext();

  useEffect(() => {
    console.log('effect: ', userData)
  }, [userData])

  if(isLoading) return (
    <div style={{height: '70vh', display:'flex', justifyContent: 'center', alignItems: 'center'}}>
      <ClipLoader size={100}/>
    </div>
  )

  return (
    userData ? 
      !userData.isActivated ?
        <EmailActivationMessage />
        : <ProfileBlock />
        : (
          switchForm
            ? <AuthForm key={'Sign up'} setSwitchForm={setSwitchForm} variation="Sign up"/>
            : <AuthForm key={'Log in'} setSwitchForm={setSwitchForm} variation="Log in"/>
        )
  )
}