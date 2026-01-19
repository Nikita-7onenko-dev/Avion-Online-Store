import { useState } from "react";
import EmailActivationMessage from "@/Components/EmailActivationMessage/EmailActivationMessage";
import ProfileBlock from "@/Components/ProfileBlock/ProfileBlock";
import AuthForm from "@/Components/AuthForm/AuthForm";
import { useRefreshUser } from "@/queries/useUserSessionQueries";
import { PageLoader } from "@/Components/PageLoader/PageLoader";


export default function UserPage(): React.JSX.Element {

  const [switchForm, setSwitchForm] = useState<boolean>(true);
  const {data: userData, isLoading} = useRefreshUser();

  if(isLoading) return (
    <PageLoader />
  )

  return (
    userData ? 
      !userData.isActivated ?
        <EmailActivationMessage />
        : <ProfileBlock key={'Profile block'}/>
        : (
          switchForm
            ? <AuthForm key={'Sign up'} setSwitchForm={setSwitchForm} variation="Sign up"/>
            : <AuthForm key={'Log in'} setSwitchForm={setSwitchForm} variation="Log in"/>
        )
  )
}