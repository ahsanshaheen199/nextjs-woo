import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import Layout from '../src/components/Layout';
import MinusIcon from '../src/components/partials/cart/MinusIcon';
import PlusIcon from '../src/components/partials/cart/PlusIcon';
import { useAppDispatch, useAppSelector } from '../src/hooks/store';
import { decrementCartItem, incrementCartItem } from '../src/store/cart/cart-actions';

const Cart: NextPage = () => {
  const dispatch = useAppDispatch();
  const lineItems = useAppSelector((state) => state.cart.lineItems);
  const total = useMemo(
    () => (lineItems?.length > 0 ? lineItems.reduce((acc, item) => acc + Number(item.totals.line_total), 0) : 0),
    [lineItems]
  );

  return (
    <>
      <Head>
        <title>Nextjs Woo | Cart</title>
      </Head>

      <Layout>
        <div className="pb-[120px]">
          <div className="mt-7 mb-5">
            <ul className="flex items-center space-x-2">
              <li className="text-xs text-[#676767]">
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>
              <li className="text-xs text-[#676767]">/</li>
              <li className="text-xs text-[#676767]">Cart</li>
            </ul>
          </div>

          <div className="mb-10">
            <h2 className="text-[40px] leading-[auto]">Cart</h2>
          </div>

          {lineItems?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="hidden sm:table-header-group">
                  <tr className="bg-[#f4f7f8]">
                    <th className="py-4 pl-6 text-left text-base font-medium text-black">Image</th>
                    <th className="py-4 text-left text-base font-medium text-black">Product Name</th>
                    <th className="py-4 text-left text-base font-medium text-black">Quantity</th>
                    <th className="py-4 text-left text-base font-medium text-black">Unit Price</th>
                    <th className="py-4 text-left text-base font-medium text-black">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {lineItems.map((item) => {
                    const image = item.images?.length > 0 ? item.images[0].src : '/placeholder.png';
                    return (
                      <tr className="border-b border-[#e5eef2]" key={item.id}>
                        <td className="block py-7 sm:table-cell">
                          <Link href={`/product/${item.id}`}>
                            <a>
                              <Image src={image} alt={item.name} width={165} height={165} />
                            </a>
                          </Link>
                        </td>
                        <td className="block py-7 text-base font-light text-black sm:table-cell">{item.name}</td>
                        <td className="block py-7 text-base font-light text-black sm:table-cell">
                          <div className="inline-flex w-[170px] justify-between rounded-full bg-[#f4f7f8] py-3">
                            <button
                              className="px-4 text-base font-medium text-black"
                              onClick={() => dispatch(decrementCartItem({ productId: item.id, quantity: 1 }))}
                            >
                              <MinusIcon className="h-5 w-5" />
                            </button>
                            <span className="px-4 text-base font-medium text-black">{item.quantity}</span>
                            <button
                              className="px-4 text-base font-medium text-black"
                              onClick={() => dispatch(incrementCartItem({ productId: item.id, quantity: 1 }))}
                            >
                              <PlusIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                        <td className="block py-7 text-base font-light text-black sm:table-cell">
                          {item.prices.currency_symbol}
                          {item.prices.sale_price
                            ? Number(item.prices.sale_price) / 100
                            : Number(item.prices.regular_price) / 100}
                        </td>
                        <td className="block py-7 text-base font-light text-black sm:table-cell">
                          {item.prices.currency_symbol}
                          {(item.prices.sale_price
                            ? Number(item.prices.sale_price) / 100
                            : Number(item.prices.regular_price) / 100) * item.quantity}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td className="py-7"></td>
                    <td className="py-7"></td>
                    <td className="py-7"></td>
                    <td className="border-b border-[#e5eef2] py-7 text-base font-medium text-black">Sub-Total:</td>
                    <td className="border-b border-[#e5eef2] py-7 text-base font-light text-black">${total / 100}</td>
                  </tr>
                  <tr>
                    <td className="py-7"></td>
                    <td className="py-7"></td>
                    <td className="py-7"></td>
                    <td className="border-b border-[#e5eef2] py-7 text-base font-medium text-black">Total:</td>
                    <td className="border-b border-[#e5eef2] py-7 text-base font-light text-black">${total / 100}</td>
                  </tr>
                </tfoot>
              </table>
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

          {lineItems?.length > 0 && (
            <div className="mt-20 md:flex md:justify-between">
              <div>
                <Link href="/shop">
                  <a className="inline-block rounded-full bg-[#558fba] px-12 py-6 text-xs font-bold uppercase text-white">
                  Continue shopping
                  </a>
                </Link>
              </div>
              <div className="mt-5 text-left md:mt-0 md:text-right">
                <Link href="/checkout">
                  <a className="inline-block rounded-full bg-[#689418] px-12 py-6 text-xs font-bold uppercase text-white">
                  Checkout
                  </a>
                </Link>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Cart;
