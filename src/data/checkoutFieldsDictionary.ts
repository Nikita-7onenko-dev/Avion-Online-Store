export const contactsAndDeliveryFieldsDictionary = [
  {
    label: 'Email',
    name: 'email',
    type: 'email',
  },
  {
    label: 'Phone',
    name: 'phone',
    type: 'text',
  },
  {
    label: 'First name',
    name: 'firstName',
    type: 'text',
    dataMethod: 'name'
  },
  {
    label: 'Last name',
    name: 'lastName',
    type: 'text',
    dataMethod: 'name'
  },
  {
    label: 'Country',
    name: 'country',
    type: 'text',
    dataMethod: 'location'
  },
  {
    label: 'City',
    name: 'city',
    type: 'text',
    dataMethod: 'location'
  },
  {
    label: 'Address',
    name: 'address',
    type: 'text',
    dataMethod: 'location'
  },
]

export const shippingMethodsDictionary = [
  {
    name: 'shippingMethod',
    value: 'Standard delivery'
  },
  {
    name: 'shippingMethod',
    value: 'Pickup'
  },
]

export const paymentOptionsDictionary = [
  {
    name: 'payment',
    value: 'Credit Card'
  },
  {
    name: 'payment',
    value: 'PayPal'
  },
  {
    name: 'payment',
    value: 'Cash on delivery'
  }
]