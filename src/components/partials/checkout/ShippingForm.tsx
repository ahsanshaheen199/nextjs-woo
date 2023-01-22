import React, { ChangeEvent, FunctionComponent, useMemo } from 'react';
import { CheckoutDataError, CheckpoutData } from '../../../types/Checkout';
import Select, { StylesConfig } from 'react-select';
import courtiesWithStates from '../../../data/countries-with-states.json';

type Props = {
  checkoutData: CheckpoutData;
  setCheckoutData: React.Dispatch<React.SetStateAction<CheckpoutData>>;
  shippingFormError: CheckoutDataError;
};

const ShippingForm: FunctionComponent<Props> = ({ checkoutData, setCheckoutData, shippingFormError }: Props) => {
  const handleCheckoutShippingFormData = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckoutData({
      ...checkoutData,
      shipping: {
        ...checkoutData.shipping,
        [event.target.name]: event.target.value,
      },
    });
  };

  const countries = useMemo(
    () => courtiesWithStates.map((country) => ({ label: country.country, value: country.code })),
    []
  );

  const shippingStates = useMemo(() => {
    const foundCountry = courtiesWithStates.find((country) => country.code === checkoutData.shipping.country);
    if (foundCountry) {
      return foundCountry.states.map((state) => {
        return {
          label: state,
          value: state,
        };
      });
    } else {
      return [];
    }
  }, [checkoutData.shipping.country]);

  const colourStyles: StylesConfig = {
    control: (styles) => ({
      ...styles,
      backgroundColor: 'white',
      height: '48px',
      borderColor: '#bfcdd2',
      borderRadius: '27.5px',
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
      };
    },
    input: (styles) => ({ ...styles, paddingLeft: '16px', paddingRight: '16px' }),
    placeholder: (styles) => ({ ...styles, paddingLeft: '16px', paddingRight: '16px' }),
  };
  return (
    <>
      <div className="grid grid-cols-2 gap-6">
        <div className="mb-5">
          <label className="mb-2 block text-sm font-light" htmlFor="shippingFirstName">
            First Name <span className="text-[#f1634c]">*</span>
          </label>
          <input
            className={`h-12 w-full rounded-[27.5px] border border-[#bfcdd2] px-6 outline-none focus:border-[#5993c0] focus:ring-0 ${
              shippingFormError?.first_name ? 'border-red-600 text-red-600' : ''
            }`}
            type="text"
            name="first_name"
            id="shippingFirstName"
            value={checkoutData.shipping.first_name}
            onChange={handleCheckoutShippingFormData}
          />
          {shippingFormError?.first_name && <p className="text-xs text-red-600">{shippingFormError.first_name}</p>}
        </div>
        <div className="mb-5">
          <label className="mb-2 block text-sm font-light" htmlFor="shippingLastName">
            Last Name <span className="text-[#f1634c]">*</span>
          </label>
          <input
            className={`h-12 w-full rounded-[27.5px] border border-[#bfcdd2] px-6 outline-none focus:border-[#5993c0] focus:ring-0 ${
              shippingFormError?.last_name ? 'border-red-600 text-red-600' : ''
            }`}
            type="text"
            name="last_name"
            id="shippingLastName"
            value={checkoutData.shipping.last_name}
            onChange={handleCheckoutShippingFormData}
          />
          {shippingFormError?.last_name && <p className="text-xs text-red-600">{shippingFormError.last_name}</p>}
        </div>
      </div>

      <div className="mb-5">
        <label className="mb-2 block text-sm font-light" htmlFor="shippingEmail">
          Email <span className="text-[#f1634c]">*</span>
        </label>
        <input
          className={`h-12 w-full rounded-[27.5px] border border-[#bfcdd2] px-6 outline-none focus:border-[#5993c0] focus:ring-0 ${
            shippingFormError?.email ? 'border-red-600 text-red-600' : ''
          }`}
          type="text"
          name="email"
          id="shippingEmail"
          value={checkoutData.shipping.email}
          onChange={handleCheckoutShippingFormData}
        />
        {shippingFormError?.email && <p className="text-xs text-red-600">{shippingFormError.email}</p>}
      </div>

      <div className="mb-5">
        <label className="mb-2 block text-sm font-light" htmlFor="shippingCountry">
          Country <span className="text-[#f1634c]">*</span>
        </label>
        <Select
          className="next-woo-select"
          options={countries ?? []}
          styles={colourStyles}
          onChange={(newValue: { value: string; label: string }) => {
            setCheckoutData({
              ...checkoutData,
              shipping: {
                ...checkoutData.shipping,
                state: '',
                country: newValue?.value || '',
              },
            });
          }}
          value={countries.find((country) => country.value === checkoutData.shipping.country)}
        />
        {shippingFormError?.country && <p className="text-xs text-red-600">{shippingFormError.country}</p>}
      </div>

      <div className="mb-5">
        <label className="mb-2 block text-sm font-light" htmlFor="shippingAddress">
          Address <span className="text-[#f1634c]">*</span>
        </label>
        <input
          className={`h-12 w-full rounded-[27.5px] border border-[#bfcdd2] px-6 outline-none focus:border-[#5993c0] focus:ring-0 ${
            shippingFormError?.address ? 'border-red-600 text-red-600' : ''
          }`}
          type="text"
          name="address_1"
          id="shippingAddress"
          value={checkoutData.shipping.address_1}
          onChange={handleCheckoutShippingFormData}
        />
        {shippingFormError?.address && <p className="text-xs text-red-600">{shippingFormError.address}</p>}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="mb-5">
          <label className="mb-2 block text-sm font-light" htmlFor="shippingState">
            State <span className="text-[#f1634c]">*</span>
          </label>
          <Select
            className="next-woo-select"
            options={shippingStates}
            styles={colourStyles}
            onChange={(newValue: { value: string; label: string }) => {
              setCheckoutData({
                ...checkoutData,
                shipping: {
                  ...checkoutData.shipping,
                  state: newValue?.value || '',
                },
              });
            }}
            value={shippingStates.find((country) => country.value === checkoutData.shipping.state)}
          />
          {shippingFormError?.state && <p className="text-xs text-red-600">{shippingFormError.state}</p>}
        </div>
        <div className="mb-5">
          <label className="mb-2 block text-sm font-light" htmlFor="shippingCity">
            City <span className="text-[#f1634c]">*</span>
          </label>
          <input
            className={`h-12 w-full rounded-[27.5px] border border-[#bfcdd2] px-6 outline-none focus:border-[#5993c0] focus:ring-0 ${
              shippingFormError?.city ? 'border-red-600 text-red-600' : ''
            }`}
            type="text"
            name="city"
            id="shippingCity"
            value={checkoutData.shipping.city}
            onChange={handleCheckoutShippingFormData}
          />
          {shippingFormError?.city && <p className="text-xs text-red-600">{shippingFormError.city}</p>}
        </div>
      </div>

      <div className="mb-5">
        <label className="mb-2 block text-sm font-light" htmlFor="shippingZip">
          Zip <span className="text-[#f1634c]">*</span>
        </label>
        <input
          className={`h-12 w-full rounded-[27.5px] border border-[#bfcdd2] px-6 outline-none focus:border-[#5993c0] focus:ring-0 ${
            shippingFormError?.postcode ? 'border-red-600 text-red-600' : ''
          }`}
          type="text"
          name="postcode"
          id="shippingZip"
          value={checkoutData.shipping.postcode}
          onChange={handleCheckoutShippingFormData}
        />
        {shippingFormError?.postcode && <p className="text-xs text-red-600">{shippingFormError.postcode}</p>}
      </div>

      <div className="mb-5">
        <label className="mb-2 block text-sm font-light" htmlFor="shippingPhone">
          Phone
        </label>
        <input
          className={`h-12 w-full rounded-[27.5px] border border-[#bfcdd2] px-6 outline-none focus:border-[#5993c0] focus:ring-0 ${
            shippingFormError?.phone ? 'border-red-600 text-red-600' : ''
          }`}
          type="text"
          name="phone"
          id="shippingPhone"
          value={checkoutData.shipping.phone}
          onChange={handleCheckoutShippingFormData}
        />
        {shippingFormError?.phone && <p className="text-xs text-red-600">{shippingFormError.phone}</p>}
      </div>
    </>
  );
};

export default ShippingForm;
