import { NextPage } from 'next';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import Head from 'next/head';
import Link from 'next/link';
import { LineItem } from '../../src/store/cart/cart-slice';
import { isEmpty } from 'lodash';
import Image from 'next/image';

type OrderLineItem = Omit<LineItem, 'images' | 'totals' | 'prices'> & {
  image: { id: number; src: string };
  total: string;
};

type Order = {
  id: number;
  date_created: string;
  payment_method_title: string;
  billing: {
    first_name: string;
    last_name: string;
    email: string;
    address_1: string;
    country: string;
    city: string;
    postcode: string;
    phone: string;
    state: string;
  };
  line_items: OrderLineItem[];
  total: string;
  shipping_total: string;
};

const OrderReceived: NextPage = ({ order }: { order: Order }) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <>
      <Head>
        <title>Nextjs Woo | Order Received</title>
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
            <li className="text-xs text-[#676767]">Order Received</li>
          </ul>
        </div>

        <div className="mb-10">
          <h2 className="text-[40px] font-light leading-[auto]">Order Confirmation</h2>
        </div>

        <div className="flex justify-center">
          <div className="w-8/12">
            <div className="mb-5">
              <h3 className="text-3xl font-light">Thank you. Your order has been received.</h3>
            </div>

            <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <span className="mb-1 block text-sm text-gray-400">Order Number</span>
                <span className="block text-sm font-semibold">{order.id}</span>
              </div>
              <div>
                <span className="mb-1 block text-sm text-gray-400">Order Date</span>
                <span className="block text-sm font-semibold">{`${new Date(order.date_created).getDate()} ${
                  monthNames[new Date(order.date_created).getMonth()]
                }, ${new Date(order.date_created).getFullYear()}`}</span>
              </div>
              <div>
                <span className="mb-1 block text-sm text-gray-400">Payment Method</span>
                <span className="block text-sm font-semibold">{order.payment_method_title}</span>
              </div>
              <div>
                <span className="mb-1 block text-sm text-gray-400">Address</span>
                <span className="block text-sm font-semibold">{`${order.billing.address_1}`}</span>
              </div>
            </div>

            {order.line_items.map((item) => {
              return (
                <div key={item.id} className="grid grid-cols-3 items-center py-2">
                  <div className="col-span-2 flex items-center">
                    <div className="flex-none">
                      <Image
                        width={70}
                        height={70}
                        src={!isEmpty(item.image.src) ? item.image.src : '/placeholder.png'}
                        alt={item.name}
                      />
                    </div>
                    <div className="ml-5 flex-1 space-x-2">
                      <span>{item.name}</span>
                      <span className="font-bold">x {item.quantity}</span>
                    </div>
                  </div>
                  <div className="col-span-1 text-right">$ {Number(item.total)}</div>
                </div>
              );
            })}

            <div className="grid grid-cols-2 border-t border-[#bfcdd2]">
              <div className="col-start-2 col-end-3 flex justify-between border-b border-[#bfcdd2] py-4">
                <span>Shipping Fee:</span>
                <span>${order.shipping_total}</span>
              </div>
              <div className="col-start-2 col-end-3 flex justify-between border-b border-[#bfcdd2] py-4">
                <span className="font-bold">Total:</span>
                <span className="font-bold">${order.total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderReceived;

export async function getServerSideProps(context) {
  const { params } = context;

  const api = new WooCommerceRestApi({
    url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
    consumerKey: process.env.WC_CONSUMER_KEY,
    consumerSecret: process.env.WC_CONSUMER_SECRET,
    version: 'wc/v3',
  });

  try {
    const response = await api.get(`orders/${params.id}`);
    return {
      props: {
        order: response.data,
      },
    };
  } catch (error) {
    return {
      props: {
        order: null,
      },
    };
  }
}
