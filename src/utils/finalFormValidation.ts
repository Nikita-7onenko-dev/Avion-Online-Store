import { formDataValidator, ValidationRules } from "./formDataValidator";

export function finalFormValidation(
  formData: Record<string, string>, 
  errors: Record<string, string>,
  rules: ValidationRules
) {

  const newErrorData: typeof errors = {...errors}

  for(const key in formData) {
    const value = formData[key as keyof typeof formData];
    if(rules.isEmptyFieldsAllowed && (key === 'password' || key === 'confirmPassword' || key === 'oldPassword')) {
      continue
    }
    newErrorData[key as keyof typeof formData] = formDataValidator(key, value, formData, rules);
  }

  const hasErrors = Object.values(newErrorData).some(err => err);
  return {
    hasErrors,
    newErrorData
  }
}