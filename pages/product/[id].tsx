import React, { useState } from 'react';
import RelatedProducts from '../../src/components/partials/RelatedProducts';
import ImageGallery from '../../src/components/partials/SingleProduct/ImageGallery';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { NextPage } from 'next';
import { Product } from '../../src/types/Product';
import { isEmpty } from 'lodash';
import PlusIcon from '../../src/components/partials/cart/PlusIcon';
import MinusIcon from '../../src/components/partials/cart/MinusIcon';
import { useAppDispatch } from '../../src/hooks/store';
import { incrementCartItem } from '../../src/store/cart/cart-actions';
import toast from 'react-hot-toast';
import Link from 'next/link';
import TabList from '../../src/components/partials/SingleProduct/TabList';

const SingleProduct: NextPage = ({ product }: { product: Product }) => {
  const dispatch = useAppDispatch();
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(0);
  const addToCart = () => {
    setIsButtonLoading(true);
    if( quantity === 0 ) {
      toast.error('Quantity must not be zero');
      setIsButtonLoading(false);
      return;
    }
    setIsButtonLoading(true);
    dispatch(incrementCartItem({ productId: product.id, quantity: quantity })).then((response) => {
      if (response.meta.requestStatus === 'fulfilled') {
        toast.success(`${product.name} added successfully`);
        setIsButtonLoading(false);
      }
    });
  };
  
  return (
    <div className="py-20">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-start-1 col-end-6">
          <ImageGallery images={product.images} />
        </div>
        <div className="col-start-6 col-end-12">
          <>
            <h2 className="mb-8 text-4xl font-light text-black">{product.name}</h2>
            <div className='flex space-x-2 items-center mb-5'>
              {!isEmpty(product.sale_price) && <span className='text-2xl font-medium text-[#ee4e23]'>${product.sale_price}</span>}
              {!isEmpty(product.sale_price) && <span className='text-2xl font-light'><del>${product.regular_price}</del></span>}
              {isEmpty(product.sale_price) && <span className='text-2xl font-light'>${product.regular_price}</span>}
            </div>
            <div className="mb-6 text-base text-[#676767]" dangerouslySetInnerHTML={{ __html: product && product.short_description }} />
            <div className='flex items-center mb-8 space-x-2'>
              <span className='font-medium text-xs'>Categories:</span>
              {
                product.categories.map( category => {
                  return (
                    <Link key={category.id} href={`/categories/${category.id}`}>
                      <a className='text-xs font-light'>{category.name}</a>
                    </Link>
                  );
                } )
              }
            </div>
            <div className="flex w-[170px] justify-between rounded-full bg-[#f4f7f8] py-3 mb-10">
              <button
                className="px-4 text-base font-medium text-black"
                onClick={() => setQuantity( quantity === 0 ? 0 : quantity - 1  )}
              >
                <MinusIcon className="h-5 w-5" />
              </button>
              <span className="px-4 text-base font-medium text-black">{quantity}</span>
              <button
                className="px-4 text-base font-medium text-black"
                onClick={() => setQuantity( quantity + 1 )}
              >
                <PlusIcon className="h-5 w-5" />
              </button>
            </div>
            { product.type === 'simple' && <button disabled={isButtonLoading} onClick={addToCart} className="rounded-full bg-[#689418] px-10 py-3 text-xs text-white  disabled:cursor-not-allowed disabled:bg-opacity-20">Add to cart</button> }
          </>
        </div>
      </div>

      <TabList product={product} />

      <div className="pt-20">
        <h3 className="text-center text-3xl font-light text-black">Relative Products</h3>
        { product.related_ids.length > 0 ? (
          <RelatedProducts ids={product.related_ids} />
        ) : (
          <h2 className='mt-5 text-center'>No related products found</h2>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;

export async function getServerSideProps(context) {
  const { params } = context;

  const api = new WooCommerceRestApi({
    url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
    consumerKey: process.env.WC_CONSUMER_KEY,
    consumerSecret: process.env.WC_CONSUMER_SECRET,
    version: 'wc/v3',
  });

  try {
    const response = await api.get(`products/${params.id}`);

    return {
      props: {
        product: response.data
      }
    };
  } catch( error ) {
    return {
      props: {
        product: {},
      },
    };
  }


  
}
