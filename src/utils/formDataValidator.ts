
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
}

export const formDataValidator: Record<string, (value: string, formData?: FormData) => string> = {

  name(value) {
    const nameRegex = /^[A-Za-zÀ-žА-Яа-яЁё]+(?:[-\s][A-Za-zÀ-žА-Яа-яЁё]+)*$/;
    if(!value) return '';
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

  phone(value) {
    const phoneRegex = /^\+?[0-9 ]*$/;
    if(!value) return '';
    else if(!phoneRegex.test(value)) return 'Invalid phone number format'
    const digitsCount = value.replace(/\D/g, '').length;
    if (digitsCount < 8 || digitsCount > 15) return 'Phone number must be 8-15 digits long';
    return '';
  },

  location(value) {
    const locationRegex = /^[A-Za-zÀ-ž\s-]+$/;
    if(!value) return '';
    else if(!locationRegex.test(value)) return 'Invalid location format';
    else if(value.length < 2 || value.length > 35) return 'Location must be 2-35 chars long';
    return '';
  }


}