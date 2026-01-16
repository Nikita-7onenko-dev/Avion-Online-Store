import { formDataValidator } from "./formDataValidator";
   
const rules = {
  isEmptyFieldsAllowed: false
}

export default function passwordGroupValidator(
  formData: Record<string, string>) {
    const {oldPassword, password, confirmPassword} = formData;
    
    if(!oldPassword && !password && !confirmPassword) {
      return {oldPassword: "", password: "", confirmPassword: ""}
    }

    return {
      oldPassword: formDataValidator('oldPassword',oldPassword, formData, rules),
      password: formDataValidator('password', password, formData, rules),
      confirmPassword: formDataValidator('confirmPassword', confirmPassword, formData, rules)
    }
}