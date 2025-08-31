
export default function passwordGroupValidator(
  formData: Record<string, string>, 
  validator: Record<string, (value: string, formData?: Record<string, string>) => string> ) {
    const {oldPassword, password, confirmPassword} = formData;

    if(!oldPassword && !password && !confirmPassword) {
      return {oldPassword: "", password: "", confirmPassword: ""}
    }

    return {
      oldPassword: validator.oldPassword(oldPassword, formData),
      password: validator.password(password, formData),
      confirmPassword: validator.confirmPassword(confirmPassword, formData)
    }
}