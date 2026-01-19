
type FormData = {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;

    firstName?: string;
    lastName?: string;
    oldPassword?: string;
    phone?: string;
    country?: string;
    city?: string;
    message?: string;
}

export const validationMethods: Record<string, (value: string, formData: FormData, isEmptyFieldsAllowed:boolean) => string> = {

  name(value, _, isEmptyFieldsAllowed) {
    const nameRegex = /^[A-Za-zÀ-žА-Яа-яЁё]+(?:[-\s][A-Za-zÀ-žА-Яа-яЁё]+)*$/;
    if(!value) return isEmptyFieldsAllowed ? '' : 'Field must be filled';
    else if(!nameRegex.test(value)) return 'Invalid name format';
    else if(value.length < 2 || value.length > 33) return 'Name must be 2-33 chars';
    return '';
  },

  username(value) {
    const nameRegex = /^[A-Za-zА-Яа-яЁё\s-]+$/;
    if(!value) return 'Field must be filled';
    else if(value.length < 2 || value.length > 33) return 'Name must be 2-33 chars';
    else if(!nameRegex.test(value)) return 'Name can contain only letters, spaces and dashes';
    else return '';
  },

  email(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!value) return 'Field must be filled';
    else if(!emailRegex.test(value)) return 'Invalid email format';
    else return '';
  },

  oldPassword(value) {
    if(!value) return 'Field must be filled';
    else if(value.length < 6) return 'Password must be at least 6 characters long';
    return '';
  },

  password(value, formData) {
    if(!formData) return '';
    if(!value) return 'Field must be filled';
    else if(value.length < 6) return 'Password must be at least 6 characters long';
    else if('confirmPassword' in formData && (value !== formData.confirmPassword)) return 'Passwords do not match';
    return '';
  },

  confirmPassword(value, formData) {
    if(!formData) return '';
    if(!value) return 'Field must be filled';
    else if(value.length < 6) return 'Password must be at least 6 characters long';
    else if('password' in formData && (value !== formData.password)) return 'Passwords do not match';
    return '';
  },

  phone(value, _, isEmptyFieldsAllowed) {
    const phoneRegex = /^\+?[0-9 ]*$/;
    if(!value) return isEmptyFieldsAllowed ? '' : 'Field must be filled';
    else if(!phoneRegex.test(value)) return 'Invalid phone number format'
    const digitsCount = value.replace(/\D/g, '').length;
    if (digitsCount < 8 || digitsCount > 15) return 'Phone number must be 8-15 digits long';
    return '';
  },

  location(value, _, isEmptyFieldsAllowed) {
    const locationRegex = /^[A-Za-zÀ-ž\s-]+$/;
    if(!value) return isEmptyFieldsAllowed ? '' : 'Field must be filled';
    else if(!locationRegex.test(value)) return 'Invalid location format';
    else if(value.length < 2 || value.length > 75) return 'Location must be 2-75 chars long';
    return '';
  },

  message(value, _, isEmptyFieldsAllowed) {
    const messageRegex = /^(?=.*\S)(?:(?! {5,}).)+$/s;
    if(!value) return isEmptyFieldsAllowed ? '' : 'Field must be filled';
    else if(!messageRegex.test(value)) return 'Invalid message format';
    else if(value.length < 5) return 'Message must be at least 5 chars long';
    return '';
  }
}