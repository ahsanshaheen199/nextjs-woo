import React, { ChangeEvent, FunctionComponent, useMemo } from 'react';
import { CheckpoutData } from '../../../types/Checkout';
import Select , {StylesConfig} from 'react-select';
import courtiesWithStates from '../../../../data/countries-with-states.json';

type Props = {
    checkoutData: CheckpoutData;
    setCheckoutData: React.Dispatch<React.SetStateAction<CheckpoutData>>
}

const BillingForm: FunctionComponent<Props> = ({checkoutData,setCheckoutData}: Props) => {
  const handleCheckoutBillingFormData = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckoutData({
      ...checkoutData,
      billing: {
        ...checkoutData.billing,
        [event.target.name]: event.target.value
      }
    });
  };
    
  const countries = useMemo(() => courtiesWithStates.map( country => ( { label: country.country, value: country.code } ) ), []);
    
  const billingStates = useMemo( () => {
    const foundCountry = courtiesWithStates.find( country => country.code === checkoutData.billing.billingCountry );
    if( foundCountry ) {
      return foundCountry.states.map( state => {
        return {
          label: state,
          value: state
        };
      } );
    } else {
      return [];
    }
  }, [checkoutData.billing.billingCountry] );
    
  const colourStyles: StylesConfig = {
    control: styles => ({ ...styles, backgroundColor: 'white', height: '48px', borderColor: '#bfcdd2', borderRadius: '27.5px' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles
      };
    },
    input: (styles) => ({ ...styles, paddingLeft: '16px', paddingRight: '16px' }),
    placeholder: (styles) => ( { ...styles, paddingLeft: '16px', paddingRight: '16px' } )
  };
  return (
    <>
      <div className='grid grid-cols-2 gap-6'>
        <div className='mb-5'>
          <label className='text-sm font-light mb-2 block' htmlFor='billingFirstName'>First Name <span className='text-[#f1634c]'>*</span></label>
          <input 
            className='h-12 px-6 rounded-[27.5px] border border-[#bfcdd2] w-full outline-none focus:ring-0 focus:border-[#5993c0]' 
            type="text" 
            name='billingFirstName'
            id='billingFirstName'
            value={checkoutData.billing.billingFirstName}
            onChange={handleCheckoutBillingFormData}
          />
        </div>
        <div className='mb-5'>
          <label className='text-sm font-light mb-2 block' htmlFor='billingLastName'>Last Name <span className='text-[#f1634c]'>*</span></label>
          <input 
            className='h-12 px-6 rounded-[27.5px] border border-[#bfcdd2] w-full outline-none focus:ring-0 focus:border-[#5993c0]' 
            type="text" 
            name='billingLastName'
            id='billingLastName'
            value={checkoutData.billing.billingLastName}
            onChange={handleCheckoutBillingFormData}
          />
        </div>
      </div>

      <div className='mb-5'>
        <label className='text-sm font-light mb-2 block' htmlFor='billingEmail'>Email <span className='text-[#f1634c]'>*</span></label>
        <input 
          className='h-12 px-6 rounded-[27.5px] border border-[#bfcdd2] w-full outline-none focus:ring-0 focus:border-[#5993c0]' 
          type="text" 
          name='billingEmail'
          id='billingEmail'
          value={checkoutData.billing.billingEmail}
          onChange={handleCheckoutBillingFormData}
        />
      </div>

      <div className='mb-5'>
        <label className='text-sm font-light mb-2 block' htmlFor='billingCountry'>Country <span className='text-[#f1634c]'>*</span></label>
        <Select 
          className='next-woo-select' 
          options={countries ?? []} 
          styles={colourStyles} 
          onChange={ (newValue: { value: string; label: string; }) => {
            setCheckoutData( {
              ...checkoutData,
              billing: {
                ...checkoutData.billing,
                billingState: '',
                billingCountry: newValue?.value || ''
              }
            } );
          }} 
          value={ countries.find( country => country.value === checkoutData.billing.billingCountry ) }
        />
      </div>

      <div className='mb-5'>
        <label className='text-sm font-light mb-2 block' htmlFor='billingAddress'>Address <span className='text-[#f1634c]'>*</span></label>
        <input 
          className='h-12 px-6 rounded-[27.5px] border border-[#bfcdd2] w-full outline-none focus:ring-0 focus:border-[#5993c0]' 
          type="text" 
          name='billingAddress'
          id='billingAddress'
          value={checkoutData.billing.billingAddress}
          onChange={handleCheckoutBillingFormData}
        />
      </div>

      <div className='grid grid-cols-2 gap-6'>
        <div className='mb-5'>
          <label className='text-sm font-light mb-2 block' htmlFor='billingState'>State <span className='text-[#f1634c]'>*</span></label>
          <Select 
            className='next-woo-select' 
            options={billingStates} 
            styles={colourStyles} 
            onChange={ (newValue: { value: string; label: string; }) => {
              setCheckoutData( {
                ...checkoutData,
                billing: {
                  ...checkoutData.billing,
                  billingState: newValue?.value || '',
                }
              } );
            }} 
            value={ billingStates.find( country => country.value === checkoutData.billing.billingState ) }
          />
        </div>
        <div className='mb-5'>
          <label className='text-sm font-light mb-2 block' htmlFor='billingCity'>City <span className='text-[#f1634c]'>*</span></label>
          <input 
            className='h-12 px-6 rounded-[27.5px] border border-[#bfcdd2] w-full outline-none focus:ring-0 focus:border-[#5993c0]' 
            type="text" 
            name='billingCity'
            id='billingCity'
            value={checkoutData.billing.billingCity}
            onChange={handleCheckoutBillingFormData}
          />
        </div>
      </div>

      <div className='mb-5'>
        <label className='text-sm font-light mb-2 block' htmlFor='billingZip'>Zip <span className='text-[#f1634c]'>*</span></label>
        <input 
          className='h-12 px-6 rounded-[27.5px] border border-[#bfcdd2] w-full outline-none focus:ring-0 focus:border-[#5993c0]' 
          type="text" 
          name='billingZip'
          id='billingZip'
          value={checkoutData.billing.billingZip}
          onChange={handleCheckoutBillingFormData}
        />
      </div>

      <div className='mb-5'>
        <label className='text-sm font-light mb-2 block' htmlFor='billingPhone'>Phone</label>
        <input 
          className='h-12 px-6 rounded-[27.5px] border border-[#bfcdd2] w-full outline-none focus:ring-0 focus:border-[#5993c0]' 
          type="text" 
          name='billingPhone'
          id='billingPhone'
          value={checkoutData.billing.billingPhone}
          onChange={handleCheckoutBillingFormData}
        />
      </div>
    </>
  );
};

export default BillingForm;