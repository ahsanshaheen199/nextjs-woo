import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';
import BillingForm from '../src/components/partials/checkout/BillingForm';
import ShippingForm from '../src/components/partials/checkout/ShippingForm';
import { CheckpoutData } from '../src/types/Checkout';

const Checkout : NextPage = () => {
  const [ checkoutData, setCheckoutData ] = useState<CheckpoutData>({
    isShippingDifferent: false,
    orderNote: '',
    billing: {
      billingFirstName: '',
      billingLastName: '',
      billingEmail: '',
      billingAddress: '',
      billingCountry: '',
      billingCity: '',
      billingZip: '',
      billingPhone: '',
      billingState: ''
    },
    shipping: {
      shippingFirstName: '',
      shippingLastName: '',
      shippingEmail: '',
      shippingAddress: '',
      shippingCountry: '',
      shippingCity: '',
      shippingZip: '',
      shippingPhone: '',
      shippingState: ''
    }
  });

  return (
    <>
      <Head>
        <title>Nextjs Woo | Checkout</title>
      </Head>

      <div className='pb-[120px]'>

        <div className='mt-7 mb-5'>
          <ul className='flex space-x-2 items-center'>
            <li className='text-xs text-[#676767]'><Link href="/"><a>Home</a></Link></li>
            <li className='text-xs text-[#676767]'>/</li>
            <li className='text-xs text-[#676767]'>Cart</li>
          </ul>
        </div>

        <div className='mb-10'>
          <h2 className='text-[40px] leading-[auto] font-light'>Checkout</h2>
        </div>
        
        <div className='grid grid-cols-2 gap-6'>
          {/* Left Column */}
          <div>
            <h2 className='text-[30px] font-light mb-5'>Billing Details</h2>

            <BillingForm checkoutData={checkoutData} setCheckoutData={setCheckoutData} />

            <div className='flex items-center space-x-3 mt-10 mb-10'>
              <input
                id='isShippingDifferent'
                type="checkbox" 
                checked={checkoutData.isShippingDifferent} 
                onChange={ () => setCheckoutData({ ...checkoutData, isShippingDifferent: ! checkoutData.isShippingDifferent } ) } 
              />
              <label className='font-bold text-lg cursor-pointer' htmlFor='isShippingDifferent'>Ship to a different address?</label>
            </div>

            { checkoutData.isShippingDifferent && <div className='mb-10'><ShippingForm checkoutData={checkoutData} setCheckoutData={setCheckoutData} /></div> }

            <div className='mb-5'>
              <label className='text-sm font-light mb-2 block' htmlFor='orderNote'>Order Note (Optional)</label>
              <textarea 
                value={checkoutData.orderNote} 
                onChange={ event => { setCheckoutData( { ...checkoutData, orderNote: event.target.value } ); } } 
                className='h-36 px-6 rounded-[27.5px] border border-[#bfcdd2] w-full outline-none focus:ring-0 focus:border-[#5993c0] resize-none'></textarea>
            </div>

          </div>

          {/* Right Column */}
          <div></div>

        </div>
      </div>

    </>
  );
};

export default Checkout;