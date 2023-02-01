import React, { FunctionComponent, MouseEvent, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../types/Product';
import { useAppDispatch, useAppSelector } from '../hooks/store';
// import { incrementCart } from '../store/cart/cart-slice';
import { incrementCartItem } from '../store/cart/cart-actions';
import { toast } from 'react-hot-toast';

type ProductProps = {
  product: Product;
};

const Product: FunctionComponent<ProductProps> = ({ product }: ProductProps) => {
  const dispatch = useAppDispatch();
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);

  const addToCart = (event: MouseEvent, product: Product) => {
    event.preventDefault();
    setIsButtonLoading(true);
    dispatch(incrementCartItem({ productId: product.id, quantity: 1 })).then((response) => {
      if (response.meta.requestStatus === 'fulfilled') {
        toast.success(`${product.name} added successfully`);
        setIsButtonLoading(false);
      }
    });
  };

  return (
    <>
      <div className="mb-8 group hover:shadow-lg hover:white relative">
        <Link href={`/product/${product.id}`}>
          <a>
            <div className="w-full overflow-hidden rounded-lg">
              {product.images.length > 0 ? (
                <Image
                  src={product.images[0].src}
                  alt={product.name}
                  className="h-full w-full object-cover object-center"
                  width={300}
                  height={265}
                  style={{
                    width: '100%'
                  }}
                />
              ) : (
                <Image
                  src={`/placeholder.png`}
                  alt={product.name}
                  className="h-full w-full object-cover object-center"
                  width={300}
                  height={265}
                  style={{
                    width: '100%'
                  }}
                />
              )}
            </div>
            <h3 className="mt-2 text-base text-black text-center">{product.name}</h3>
            <p
              className="mt-1 text-base font-medium text-black text-center"
              dangerouslySetInnerHTML={{ __html: product.price_html }}
            ></p>
          </a>
        </Link>
        <div className='hidden group-hover:flex justify-center absolute w-full top-[calc(100%)] right-0 px-5 pt-4 pb-6 bg-white z-10 shadow-lg rounded-bl-lg rounded-br-lg'>
          {
            product.type === 'simple' && (
              <button
                disabled={isButtonLoading}
                onClick={(event) => addToCart(event, product)}
                className="text-sm font-bold uppercase cursor-pointer rounded-f bg-[#689418] px-10 py-5 rounded-[27.5px] text-white disabled:cursor-not-allowed disabled:bg-opacity-20"
              >
                {isButtonLoading && (
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="mr-2 inline h-4 w-4 animate-spin text-gray-200 dark:text-gray-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="#1C64F2"
                    />
                  </svg>
                )}
                {isButtonLoading ? 'Adding..' : product.add_to_cart.text}
              </button>
            )
          }
          {
            ( product.type === 'grouped' || product.type === 'variable' ) && (
              <Link href={`/product/${product.id}`}>
                <a
                  className="text-sm font-bold uppercase cursor-pointer rounded-f bg-[#689418] px-10 py-5 rounded-[27.5px] text-white disabled:cursor-not-allowed disabled:bg-opacity-20"
                >
                  { product.add_to_cart.text }
                </a>
              </Link>
              
            )
          }
          {
            product.type === 'external'  && (
              <a
                href={product.add_to_cart.url}
                className="text-sm font-bold uppercase cursor-pointer rounded-f bg-[#689418] px-10 py-5 rounded-[27.5px] text-white disabled:cursor-not-allowed disabled:bg-opacity-20"
              >
                { product.add_to_cart.text }
              </a>
              
            )
          }
        </div>
      </div>
    </>
  );
};

export default Product;
