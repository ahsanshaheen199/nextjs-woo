import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import MinusIcon from '../src/components/partials/cart/MinusIcon';
import PlusIcon from '../src/components/partials/cart/PlusIcon';
import { useAppDispatch, useAppSelector } from '../src/hooks/store';
import { incrementCartItem } from '../src/store/cart/cart-actions';

const Cart : NextPage = () => {
  const dispatch = useAppDispatch();
  const lineItems = useAppSelector( state => state.cart.lineItems );
  const total = useMemo( () => lineItems?.length > 0  ? lineItems.reduce( (acc, item) => acc + Number(item.totals.line_total), 0 ) : 0 , [lineItems] );
  
  return (
    <>
      <Head>
        <title>Nextjs Woo | Cart</title>
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
          <h2 className='text-[40px] leading-[auto]'>Cart</h2>
        </div>

        {
          lineItems?.length > 0 ? (
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead className='sm:table-header-group hidden'>
                  <tr className='bg-[#f4f7f8]'>
                    <th className='text-left font-medium text-base text-black pl-6 py-4'>Image</th>
                    <th className='text-left font-medium text-base text-black py-4'>Product Name</th>
                    <th className='text-left font-medium text-base text-black py-4'>Quantity</th>
                    <th className='text-left font-medium text-base text-black py-4'>Unit Price</th>
                    <th className='text-left font-medium text-base text-black py-4'>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    lineItems.map( item => {
                      const image = item.images?.length > 0 ? item.images[0].src : '/placeholder.png';
                      return (
                        <tr className='border-b border-[#e5eef2]' key={item.id}>
                          <td className='py-7 block sm:table-cell'>
                            <Image src={image} alt={item.name} width={165} height={165} />
                          </td>
                          <td className='py-7 block sm:table-cell text-base font-light text-black'>{item.name}</td>
                          <td className='py-7 block sm:table-cell text-base font-light text-black'>
                            <div className='inline-flex bg-[#f4f7f8] rounded-full py-3 w-[170px] justify-between'>
                              <button className='px-4 font-medium text-black text-base'>
                                <MinusIcon className='w-5 h-5' />
                              </button>
                              <span className='px-4 font-medium text-black text-base'>{item.quantity}</span>
                              <button className='px-4 font-medium text-black text-base' onClick={ () => dispatch( incrementCartItem({ productId: item.id, quantity: 1 }) ) }>
                                <PlusIcon className='w-5 h-5' />
                              </button>
                            </div>
                          </td>
                          <td className='py-7 block sm:table-cell text-base font-light text-black'>{item.prices.currency_symbol}{item.prices.sale_price ? Number(item.prices.sale_price) / 100 : Number(item.prices.regular_price) / 100}</td>
                          <td className='py-7 block sm:table-cell text-base font-light text-black'>{item.prices.currency_symbol}{(item.prices.sale_price ? Number(item.prices.sale_price) / 100 : Number(item.prices.regular_price) / 100 ) * item.quantity}</td>
                        </tr>
                      );
                  
                    } )
                  }
              
                </tbody>
                <tfoot>
                  <tr>
                    <td className='py-7'></td>
                    <td className='py-7'></td>
                    <td className='py-7'></td>
                    <td className='py-7 text-base font-medium text-black border-b border-[#e5eef2]'>Sub-Total:</td>
                    <td className='py-7 text-base font-light text-black border-b border-[#e5eef2]'>${total / 100}</td>
                  </tr>
                  <tr>
                    <td className='py-7'></td>
                    <td className='py-7'></td>
                    <td className='py-7'></td>
                    <td className='py-7 text-base font-medium text-black border-b border-[#e5eef2]'>Total:</td>
                    <td className='py-7 text-base font-light text-black border-b border-[#e5eef2]'>${total / 100}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ) : (
            <div className='text-center'>
              <div className='mb-5'>
                <Image src={'/empty-cart.png'} alt="empty cart" width={200} height={200} />
              </div>
              <h3 className='text-3xl font-medium text-black mb-8'>Your cart is empty</h3>
              <Link href="/shop"><a className='text-white text-xs font-bold px-12 py-6 bg-[#558fba] inline-block rounded-full'>Continue shopping</a></Link>
            </div>
          )
        }

        {
          lineItems?.length > 0 && (
            <div className='md:flex md:justify-between mt-20'>
              <div>
                <Link href="/shop"><a className='text-white text-xs font-bold px-12 py-6 bg-[#558fba] inline-block rounded-full uppercase'>Continue shopping</a></Link>
              </div>
              <div className='md:text-right text-left md:mt-0 mt-5'>
                <Link href="/checkout"><a className='text-white text-xs font-bold px-12 py-6 bg-[#689418] inline-block rounded-full uppercase'>Checkout</a></Link>
              </div>
            </div>
          )
        }
        

      </div>
    </>
  );
};

export default Cart;