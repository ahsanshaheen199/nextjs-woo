import React, { ChangeEvent, FunctionComponent, useMemo } from 'react';
import { CheckpoutData } from '../../../types/Checkout';
import Select, { StylesConfig } from 'react-select';
import courtiesWithStates from '../../../data/countries-with-states.json';

type Props = {
  checkoutData: CheckpoutData;
  setCheckoutData: React.Dispatch<React.SetStateAction<CheckpoutData>>;
};

const ShippingForm: FunctionComponent<Props> = ({ checkoutData, setCheckoutData }: Props) => {
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
            className="h-12 w-full rounded-[27.5px] border border-[#bfcdd2] px-6 outline-none focus:border-[#5993c0] focus:ring-0"
            type="text"
            name="firstName"
            id="shippingFirstName"
            value={checkoutData.shipping.firstName}
            onChange={handleCheckoutShippingFormData}
          />
        </div>
        <div className="mb-5">
          <label className="mb-2 block text-sm font-light" htmlFor="shippingLastName">
            Last Name <span className="text-[#f1634c]">*</span>
          </label>
          <input
            className="h-12 w-full rounded-[27.5px] border border-[#bfcdd2] px-6 outline-none focus:border-[#5993c0] focus:ring-0"
            type="text"
            name="lastName"
            id="shippingLastName"
            value={checkoutData.shipping.lastName}
            onChange={handleCheckoutShippingFormData}
          />
        </div>
      </div>

      <div className="mb-5">
        <label className="mb-2 block text-sm font-light" htmlFor="shippingEmail">
          Email <span className="text-[#f1634c]">*</span>
        </label>
        <input
          className="h-12 w-full rounded-[27.5px] border border-[#bfcdd2] px-6 outline-none focus:border-[#5993c0] focus:ring-0"
          type="text"
          name="email"
          id="shippingEmail"
          value={checkoutData.shipping.email}
          onChange={handleCheckoutShippingFormData}
        />
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
      </div>

      <div className="mb-5">
        <label className="mb-2 block text-sm font-light" htmlFor="shippingAddress">
          Address <span className="text-[#f1634c]">*</span>
        </label>
        <input
          className="h-12 w-full rounded-[27.5px] border border-[#bfcdd2] px-6 outline-none focus:border-[#5993c0] focus:ring-0"
          type="text"
          name="address"
          id="shippingAddress"
          value={checkoutData.shipping.address}
          onChange={handleCheckoutShippingFormData}
        />
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
        </div>
        <div className="mb-5">
          <label className="mb-2 block text-sm font-light" htmlFor="shippingCity">
            City <span className="text-[#f1634c]">*</span>
          </label>
          <input
            className="h-12 w-full rounded-[27.5px] border border-[#bfcdd2] px-6 outline-none focus:border-[#5993c0] focus:ring-0"
            type="text"
            name="city"
            id="shippingCity"
            value={checkoutData.shipping.city}
            onChange={handleCheckoutShippingFormData}
          />
        </div>
      </div>

      <div className="mb-5">
        <label className="mb-2 block text-sm font-light" htmlFor="shippingZip">
          Zip <span className="text-[#f1634c]">*</span>
        </label>
        <input
          className="h-12 w-full rounded-[27.5px] border border-[#bfcdd2] px-6 outline-none focus:border-[#5993c0] focus:ring-0"
          type="text"
          name="zip"
          id="shippingZip"
          value={checkoutData.shipping.zip}
          onChange={handleCheckoutShippingFormData}
        />
      </div>

      <div className="mb-5">
        <label className="mb-2 block text-sm font-light" htmlFor="shippingPhone">
          Phone
        </label>
        <input
          className="h-12 w-full rounded-[27.5px] border border-[#bfcdd2] px-6 outline-none focus:border-[#5993c0] focus:ring-0"
          type="text"
          name="phone"
          id="shippingPhone"
          value={checkoutData.shipping.phone}
          onChange={handleCheckoutShippingFormData}
        />
      </div>
    </>
  );
};

export default ShippingForm;
