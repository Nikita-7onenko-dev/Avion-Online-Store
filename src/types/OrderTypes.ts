type orderDetailsType = {
  productName: string;
  productId: string;
  quantity: number;
}

type OrderType = {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  address: string;
  shippingMethod: string;
  payment: string;
  date: string;
  orderDetails: orderDetailsType[];
}
