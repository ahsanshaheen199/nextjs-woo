import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import BillingForm from '../src/components/partials/checkout/BillingForm';
import ShippingForm from '../src/components/partials/checkout/ShippingForm';
import { useAppSelector } from '../src/hooks/store';
import { CheckpoutData } from '../src/types/Checkout';
import Image from 'next/image';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { isEmpty } from 'lodash';
import axios from 'axios';

type Props = {
  payment_gateways: {id: string; title: string; description: string; enabled: boolean;}[]
}

const Checkout: NextPage = ({payment_gateways}: Props) => {
  const lineItems = useAppSelector((state) => state.cart.lineItems);
  const [checkoutData, setCheckoutData] = useState<CheckpoutData>({
    isShippingDifferent: false,
    orderNote: '',
    billing: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      country: '',
      city: '',
      zip: '',
      phone: '',
      state: '',
    },
    shipping: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      country: '',
      city: '',
      zip: '',
      phone: '',
      state: '',
    },
    payment_method: ''
  });

  const total = useMemo(
    () => (lineItems?.length > 0 ? lineItems.reduce((acc, item) => acc + Number(item.totals.line_total), 0) : 0),
    [lineItems]
  );

  const placeAnOrder = async () => {

    if( lineItems.length === 0 ) {
      return;
    }

    const shipping = checkoutData.isShippingDifferent ? checkoutData.shipping : checkoutData.billing;

    const payload = {
      payment_method: checkoutData.payment_method,
      billing: {
        ...checkoutData.billing
      },
      shipping: shipping,
      lineItems: lineItems.map( item => ( { product_id: item.id, quantity: item.quantity } ) )
    };

    const response = await axios.post('/api/order', payload);
    
  };

  return (
    <>
      <Head>
        <title>Nextjs Woo | Checkout</title>
      </Head>

      <div className="pb-[120px]">
        <div className="mt-7 mb-5">
          <ul className="flex items-center space-x-2">
            <li className="text-xs text-[#676767]">
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li className="text-xs text-[#676767]">/</li>
            <li className="text-xs text-[#676767]">Checkout</li>
          </ul>
        </div>

        <div className="mb-10">
          <h2 className="text-[40px] font-light leading-[auto]">Checkout</h2>
        </div>

        {lineItems.length > 0 ? (
          <div className="grid grid-cols-2 gap-10">
            {/* Left Column */}
            <div>
              <h2 className="mb-5 text-[30px] font-light">Billing Details</h2>

              <BillingForm checkoutData={checkoutData} setCheckoutData={setCheckoutData} />

              <div className="mt-10 mb-10 flex items-center space-x-3">
                <input
                  id="isShippingDifferent"
                  type="checkbox"
                  checked={checkoutData.isShippingDifferent}
                  onChange={() =>
                    setCheckoutData({ ...checkoutData, isShippingDifferent: !checkoutData.isShippingDifferent })
                  }
                />
                <label className="cursor-pointer text-lg font-bold" htmlFor="isShippingDifferent">
                  Ship to a different address?
                </label>
              </div>

              {checkoutData.isShippingDifferent && (
                <div className="mb-10">
                  <ShippingForm checkoutData={checkoutData} setCheckoutData={setCheckoutData} />
                </div>
              )}

              <div className="mb-5">
                <label className="mb-2 block text-sm font-light" htmlFor="orderNote">
                  Order Note (Optional)
                </label>
                <textarea
                  value={checkoutData.orderNote}
                  onChange={(event) => {
                    setCheckoutData({ ...checkoutData, orderNote: event.target.value });
                  }}
                  className="h-36 w-full resize-none rounded-[27.5px] border border-[#bfcdd2] px-6 outline-none focus:border-[#5993c0] focus:ring-0"
                ></textarea>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <h2 className="mb-5 text-[30px] font-light">Your Order</h2>

              {
                lineItems.map( item => {
                  return (
                    <div key={item.id} className='grid grid-cols-3 items-center border-b border-[#bfcdd2] py-2'>
                      <div className='col-span-2 flex items-center'>
                        <div className='flex-none'>
                          <Image width={70} height={70} src={item.images.length > 0 ? item.images[0].src : '/placeholder.png'} alt={item.name} />
                        </div>
                        <div className='flex-1 ml-5 space-x-2'>
                          <span>{item.name}</span>
                          <span className='font-bold'>x {item.quantity}</span>
                        </div>
                      </div>
                      <div className='col-span-1 text-right'>$ {Number(item.totals.line_total) / 100}</div>
                    </div>
                  );
                } )
              }

              <div className='grid grid-cols-2 items-center border-b border-[#bfcdd2] py-4'>
                <div className='font-semibold text-base'>Total:</div>
                <div className='text-right'>$ {total / 100}</div>
              </div>

              {
                payment_gateways.length > 0 ? (
                  <div className='mt-20'>
                    <h2 className="mb-5 text-[30px] font-light">Payment Methods</h2>
                    <div className='space-y-4'>
                      {
                        payment_gateways.map( gateway => {
                          if( !gateway.enabled ) {
                            return;
                          }
                          return (
                            <div key={gateway.id} className="flex items-center">
                              <input 
                                id={`gateway-${gateway.id}`}
                                name="shipping_method" 
                                type="radio"
                                value={gateway.id}
                                className="h-4 w-4 border-gray-300 text-[#558fba] focus:ring-[#558fba]"
                                onChange={ event => setCheckoutData( { ...checkoutData, payment_method: event.target.value } ) }
                              />
                              <label htmlFor={`gateway-${gateway.id}`} className='ml-3 block text-sm font-medium cursor-pointer'>{gateway.title}</label>
                            </div>
                          );
                        } )
                      }
                    </div>
                  </div>
                ) : (
                  <h2 className="mb-5 text-[30px] font-light">Please enable Payment Methods from WordPress site.</h2>
                )
              }

              <div className='mt-12'>
                <button
                  onClick={placeAnOrder}
                  disabled={isEmpty(checkoutData.payment_method) === true} 
                  className='disabled:bg-opacity-30 disabled:cursor-not-allowed inline-block rounded-full bg-[#558fba] px-12 py-6 text-xs font-bold text-white'>
                    Place Order
                </button>
              </div>
            </div>

          </div>
        ) : (
          <div className="text-center">
            <div className="mb-5">
              <Image src={'/empty-cart.png'} alt="empty cart" width={200} height={200} />
            </div>
            <h3 className="mb-8 text-3xl font-medium text-black">Your cart is empty</h3>
            <Link href="/shop">
              <a className="inline-block rounded-full bg-[#558fba] px-12 py-6 text-xs font-bold text-white">
                Continue shopping
              </a>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Checkout;


export async function getServerSideProps(){
  const api = new WooCommerceRestApi({
    url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
    consumerKey: process.env.WC_CONSUMER_KEY,
    consumerSecret: process.env.WC_CONSUMER_SECRET,
    version: 'wc/v3'
  });

  try {
    const response = await api.get('payment_gateways');
    return {
      props: {
        payment_gateways: response.data
      }
    };
    
  } catch( error ) {
    return {
      props: {
        payment_gateways: []
      }
    };
    
  }
  
}
