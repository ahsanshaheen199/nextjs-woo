export type CheckpoutData = {
    isShippingDifferent: boolean;
    orderNote: string;
    billing: {
        billingFirstName: string;
        billingLastName: string;
        billingEmail: string;
        billingAddress: string;
        billingCountry: string;
        billingCity: string;
        billingZip: string;
        billingPhone: string;
        billingState: string;
    },
    shipping: {
        shippingFirstName: string;
        shippingLastName: string;
        shippingEmail: string;
        shippingAddress: string;
        shippingCountry: string;
        shippingCity: string;
        shippingZip: string;
        shippingPhone: string;
        shippingState: string;
      }
}