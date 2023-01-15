import React, { ChangeEvent, FunctionComponent, useMemo } from 'react';
import { CheckpoutData } from '../../../types/Checkout';
import Select, { StylesConfig } from 'react-select';
import courtiesWithStates from '../../../data/countries-with-states.json';

type Props = {
  checkoutData: CheckpoutData;
  setCheckoutData: React.Dispatch<React.SetStateAction<CheckpoutData>>;
};

const BillingForm: FunctionComponent<Props> = ({ checkoutData, setCheckoutData }: Props) => {
  const handleCheckoutBillingFormData = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckoutData({
      ...checkoutData,
      billing: {
        ...checkoutData.billing,
        [event.target.name]: event.target.value,
      },
    });
  };

  const countries = useMemo(
    () => courtiesWithStates.map((country) => ({ label: country.country, value: country.code })),
    []
  );

  const billingStates = useMemo(() => {
    const foundCountry = courtiesWithStates.find((country) => country.code === checkoutData.billing.country);
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
  }, [checkoutData.billing.country]);

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
          <label className="mb-2 block text-sm font-light" htmlFor="billingFirstName">
            First Name <span className="text-[#f1634c]">*</span>
          </label>
          <input
            className="h-12 w-full rounded-[27.5px] border border-[#bfcdd2] px-6 outline-none focus:border-[#5993c0] focus:ring-0"
            type="text"
            name="firstName"
            id="billingFirstName"
            value={checkoutData.billing.firstName}
            onChange={handleCheckoutBillingFormData}
          />
        </div>
        <div className="mb-5">
          <label className="mb-2 block text-sm font-light" htmlFor="billingLastName">
            Last Name <span className="text-[#f1634c]">*</span>
          </label>
          <input
            className="h-12 w-full rounded-[27.5px] border border-[#bfcdd2] px-6 outline-none focus:border-[#5993c0] focus:ring-0"
            type="text"
            name="lastName"
            id="billingLastName"
            value={checkoutData.billing.lastName}
            onChange={handleCheckoutBillingFormData}
          />
        </div>
      </div>

      <div className="mb-5">
        <label className="mb-2 block text-sm font-light" htmlFor="billingEmail">
          Email <span className="text-[#f1634c]">*</span>
        </label>
        <input
          className="h-12 w-full rounded-[27.5px] border border-[#bfcdd2] px-6 outline-none focus:border-[#5993c0] focus:ring-0"
          type="text"
          name="email"
          id="billingEmail"
          value={checkoutData.billing.email}
          onChange={handleCheckoutBillingFormData}
        />
      </div>

      <div className="mb-5">
        <label className="mb-2 block text-sm font-light" htmlFor="billingCountry">
          Country <span className="text-[#f1634c]">*</span>
        </label>
        <Select
          className="next-woo-select"
          options={countries ?? []}
          styles={colourStyles}
          onChange={(newValue: { value: string; label: string }) => {
            setCheckoutData({
              ...checkoutData,
              billing: {
                ...checkoutData.billing,
                state: '',
                country: newValue?.value || '',
              },
            });
          }}
          value={countries.find((country) => country.value === checkoutData.billing.country)}
        />
      </div>

      <div className="mb-5">
        <label className="mb-2 block text-sm font-light" htmlFor="billingAddress">
          Address <span className="text-[#f1634c]">*</span>
        </label>
        <input
          className="h-12 w-full rounded-[27.5px] border border-[#bfcdd2] px-6 outline-none focus:border-[#5993c0] focus:ring-0"
          type="text"
          name="address"
          id="billingAddress"
          value={checkoutData.billing.address}
          onChange={handleCheckoutBillingFormData}
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="mb-5">
          <label className="mb-2 block text-sm font-light" htmlFor="billingState">
            State <span className="text-[#f1634c]">*</span>
          </label>
          <Select
            className="next-woo-select"
            options={billingStates}
            styles={colourStyles}
            onChange={(newValue: { value: string; label: string }) => {
              setCheckoutData({
                ...checkoutData,
                billing: {
                  ...checkoutData.billing,
                  state: newValue?.value || '',
                },
              });
            }}
            value={billingStates.find((country) => country.value === checkoutData.billing.state)}
          />
        </div>
        <div className="mb-5">
          <label className="mb-2 block text-sm font-light" htmlFor="billingCity">
            City <span className="text-[#f1634c]">*</span>
          </label>
          <input
            className="h-12 w-full rounded-[27.5px] border border-[#bfcdd2] px-6 outline-none focus:border-[#5993c0] focus:ring-0"
            type="text"
            name="city"
            id="billingCity"
            value={checkoutData.billing.city}
            onChange={handleCheckoutBillingFormData}
          />
        </div>
      </div>

      <div className="mb-5">
        <label className="mb-2 block text-sm font-light" htmlFor="billingZip">
          Zip <span className="text-[#f1634c]">*</span>
        </label>
        <input
          className="h-12 w-full rounded-[27.5px] border border-[#bfcdd2] px-6 outline-none focus:border-[#5993c0] focus:ring-0"
          type="text"
          name="zip"
          id="billingZip"
          value={checkoutData.billing.zip}
          onChange={handleCheckoutBillingFormData}
        />
      </div>

      <div className="mb-5">
        <label className="mb-2 block text-sm font-light" htmlFor="billingPhone">
          Phone
        </label>
        <input
          className="h-12 w-full rounded-[27.5px] border border-[#bfcdd2] px-6 outline-none focus:border-[#5993c0] focus:ring-0"
          type="text"
          name="phone"
          id="billingPhone"
          value={checkoutData.billing.phone}
          onChange={handleCheckoutBillingFormData}
        />
      </div>
    </>
  );
};

export default BillingForm;
