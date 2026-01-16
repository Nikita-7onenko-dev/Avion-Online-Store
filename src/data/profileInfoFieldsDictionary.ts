export const profileInfoFieldsDictionary = {
  Personal: [
    {
      label: 'User name',
      name: 'username',
      type: 'text',
      field: 'username'
    },
    {
      label: 'First name',
      name: 'firstName',
      type: 'text',
      field: 'firstName',
    },
    {
      label: 'Last name',
      name: 'lastName',
      type: 'text',
      field: 'lastName',
    }
  ],
  Contacts: [ 
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      field: 'email'
    },
    {
      label: 'Phone',
      name: 'phone',
      type: 'tel',
      field: 'phone',
    },
    {
      label: 'Country',
      name: 'country',
      type: 'text',
      field: 'country',
    },
    {
      label: 'City',
      name: 'city',
      type: 'text',
      field: 'city',
    },
  ],
  Passwords: [
  {
    label: 'Old password',
    name: 'oldPassword',
  },
  {
    label: 'New password',
    name: 'password',
  },
  {
    label: 'Confirm new password',
    name: 'confirmPassword',
  }
  ]
}