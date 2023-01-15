export type CheckpoutData = {
  isShippingDifferent: boolean;
  orderNote: string;
  billing: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    country: string;
    city: string;
    zip: string;
    phone: string;
    state: string;
  };
  shipping: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    country: string;
    city: string;
    zip: string;
    phone: string;
    state: string;
  };
  payment_method: string;
};
