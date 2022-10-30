import { useRouter } from 'next/router';
import React from 'react';
import { getProduct } from '../../src/api/product-api';
import ImageGallery from '../../src/components/SingleProduct/ImageGallery';
import ImageGalleryLoader from '../../src/components/SingleProduct/ImageGalleryLoader';

const SingleProduct = () => {
  const router = useRouter();
  const {id} = router.query;

  const {isLoading, error, data: product } = getProduct(id as string);

  if( error ) {
    return (
      <div className='py-20'>
        <p>{error.message}</p>
      </div>
    )
  }

  return (
    <div className='py-20'>
      <div className='grid grid-cols-12 gap-4'>
        <div className='col-start-1 col-end-6'>
          { ! isLoading ? <ImageGallery images={product.images} /> : <ImageGalleryLoader />}
        </div>
        <div className='col-start-6 col-end-12'>Right</div>
      </div>
    </div>
  );
};

export default SingleProduct;