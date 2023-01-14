import React, { ChangeEvent, FunctionComponent, useMemo } from 'react';
import { CheckpoutData } from '../../../types/Checkout';
import Select , {StylesConfig} from 'react-select';
import courtiesWithStates from '../../../../data/countries-with-states.json';

type Props = {
    checkoutData: CheckpoutData;
    setCheckoutData: React.Dispatch<React.SetStateAction<CheckpoutData>>
}

const ShippingForm: FunctionComponent<Props> = ({checkoutData,setCheckoutData}: Props) => {
  const handleCheckoutShippingFormData = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckoutData({
      ...checkoutData,
      shipping: {
        ...checkoutData.shipping,
        [event.target.name]: event.target.value
      }
    });
  };
    
  const countries = useMemo(() => courtiesWithStates.map( country => ( { label: country.country, value: country.code } ) ), []);
    
  const shippingStates = useMemo( () => {
    const foundCountry = courtiesWithStates.find( country => country.code === checkoutData.shipping.shippingCountry );
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
  }, [checkoutData.shipping.shippingCountry] );
    
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
          <label className='text-sm font-light mb-2 block' htmlFor='shippingFirstName'>First Name <span className='text-[#f1634c]'>*</span></label>
          <input 
            className='h-12 px-6 rounded-[27.5px] border border-[#bfcdd2] w-full outline-none focus:ring-0 focus:border-[#5993c0]' 
            type="text" 
            name='shippingFirstName'
            id='shippingFirstName'
            value={checkoutData.shipping.shippingFirstName}
            onChange={handleCheckoutShippingFormData}
          />
        </div>
        <div className='mb-5'>
          <label className='text-sm font-light mb-2 block' htmlFor='shippingLastName'>Last Name <span className='text-[#f1634c]'>*</span></label>
          <input 
            className='h-12 px-6 rounded-[27.5px] border border-[#bfcdd2] w-full outline-none focus:ring-0 focus:border-[#5993c0]' 
            type="text" 
            name='shippingLastName'
            id='shippingLastName'
            value={checkoutData.shipping.shippingLastName}
            onChange={handleCheckoutShippingFormData}
          />
        </div>
      </div>

      <div className='mb-5'>
        <label className='text-sm font-light mb-2 block' htmlFor='shippingEmail'>Email <span className='text-[#f1634c]'>*</span></label>
        <input 
          className='h-12 px-6 rounded-[27.5px] border border-[#bfcdd2] w-full outline-none focus:ring-0 focus:border-[#5993c0]' 
          type="text" 
          name='shippingEmail'
          id='shippingEmail'
          value={checkoutData.shipping.shippingEmail}
          onChange={handleCheckoutShippingFormData}
        />
      </div>

      <div className='mb-5'>
        <label className='text-sm font-light mb-2 block' htmlFor='shippingCountry'>Country <span className='text-[#f1634c]'>*</span></label>
        <Select 
          className='next-woo-select' 
          options={countries ?? []} 
          styles={colourStyles} 
          onChange={ (newValue: { value: string; label: string; }) => {
            setCheckoutData( {
              ...checkoutData,
              shipping: {
                ...checkoutData.shipping,
                shippingState: '',
                shippingCountry: newValue?.value || ''
              }
            } );
          }} 
          value={ countries.find( country => country.value === checkoutData.shipping.shippingCountry ) }
        />
      </div>

      <div className='mb-5'>
        <label className='text-sm font-light mb-2 block' htmlFor='shippingAddress'>Address <span className='text-[#f1634c]'>*</span></label>
        <input 
          className='h-12 px-6 rounded-[27.5px] border border-[#bfcdd2] w-full outline-none focus:ring-0 focus:border-[#5993c0]' 
          type="text" 
          name='shippingAddress'
          id='shippingAddress'
          value={checkoutData.shipping.shippingAddress}
          onChange={handleCheckoutShippingFormData}
        />
      </div>

      <div className='grid grid-cols-2 gap-6'>
        <div className='mb-5'>
          <label className='text-sm font-light mb-2 block' htmlFor='shippingState'>State <span className='text-[#f1634c]'>*</span></label>
          <Select 
            className='next-woo-select' 
            options={shippingStates} 
            styles={colourStyles} 
            onChange={ (newValue: { value: string; label: string; }) => {
              setCheckoutData( {
                ...checkoutData,
                shipping: {
                  ...checkoutData.shipping,
                  shippingState: newValue?.value || '',
                }
              } );
            }} 
            value={ shippingStates.find( country => country.value === checkoutData.shipping.shippingState ) }
          />
        </div>
        <div className='mb-5'>
          <label className='text-sm font-light mb-2 block' htmlFor='shippingCity'>City <span className='text-[#f1634c]'>*</span></label>
          <input 
            className='h-12 px-6 rounded-[27.5px] border border-[#bfcdd2] w-full outline-none focus:ring-0 focus:border-[#5993c0]' 
            type="text" 
            name='shippingCity'
            id='shippingCity'
            value={checkoutData.shipping.shippingCity}
            onChange={handleCheckoutShippingFormData}
          />
        </div>
      </div>

      <div className='mb-5'>
        <label className='text-sm font-light mb-2 block' htmlFor='shippingZip'>Zip <span className='text-[#f1634c]'>*</span></label>
        <input 
          className='h-12 px-6 rounded-[27.5px] border border-[#bfcdd2] w-full outline-none focus:ring-0 focus:border-[#5993c0]' 
          type="text" 
          name='shippingZip'
          id='shippingZip'
          value={checkoutData.shipping.shippingZip}
          onChange={handleCheckoutShippingFormData}
        />
      </div>

      <div className='mb-5'>
        <label className='text-sm font-light mb-2 block' htmlFor='shippingPhone'>Phone</label>
        <input 
          className='h-12 px-6 rounded-[27.5px] border border-[#bfcdd2] w-full outline-none focus:ring-0 focus:border-[#5993c0]' 
          type="text" 
          name='shippingPhone'
          id='shippingPhone'
          value={checkoutData.shipping.shippingPhone}
          onChange={handleCheckoutShippingFormData}
        />
      </div>
    </>
  );
};

export default ShippingForm;