import { validationMethods } from "./validationMethods";


export type ValidationRules = {
  isEmptyFieldsAllowed: boolean;
};

export function formDataValidator<T extends Record<string, string>, K = keyof T >(
  fieldKey: K,
  value: string,
  formData: T,
  rules: ValidationRules
) {
  const dictionary: Record<string, (value: string, formData: T, isEmptyFieldsAllowed: boolean) => string> = {
    username: validationMethods.username,
    firstName: validationMethods.name,
    lastName:  validationMethods.name,
    name: validationMethods.name,
    email:     validationMethods.email,
    oldPassword: validationMethods.oldPassword,
    password:  validationMethods.password,
    confirmPassword: validationMethods.confirmPassword,
    phone:     validationMethods.phone,
    country:   validationMethods.location,
    city:      validationMethods.location,
    address: validationMethods.location,
    message: validationMethods.message
  };  

  const validator = dictionary[fieldKey as string];
  if (!validator) return '';

  let error = validator(value, formData, rules.isEmptyFieldsAllowed)
  return error;
}
