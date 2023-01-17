export type CheckpoutData = {
  isShippingDifferent: boolean;
  orderNote: string;
  billing: {
    first_name: string;
    last_name: string;
    email: string;
    address_1: string;
    country: string;
    city: string;
    postcode: string;
    phone: string;
    state: string;
  };
  shipping: {
    first_name: string;
    last_name: string;
    email: string;
    address_1: string;
    country: string;
    city: string;
    postcode: string;
    phone: string;
    state: string;
  };
  payment_method: string;
};


export type CheckoutDataError = {
  [key: string]: string[]
}