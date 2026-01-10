import { formDataValidator } from "./formDataValidator";

export default function passwordGroupValidator(
  formData: Record<string, string>) {
    const {oldPassword, password, confirmPassword} = formData;

    const rules = {
      isEmptyFieldsAllowed: false
    }

    if(!oldPassword && !password && !confirmPassword) {
      return {oldPassword: "", password: "", confirmPassword: ""}
    }

    return {
      oldPassword: formDataValidator('oldPassword',oldPassword, formData, rules),
      password: formDataValidator('password', password, formData, rules),
      confirmPassword: formDataValidator('confirmPassword', confirmPassword, formData, rules)
    }
}