import { useRouter } from 'next/router';
import React from 'react';
import { getProduct } from '../../src/api/product-api';
import ImageGallery from '../../src/components/singleProduct/ImageGallery';
import ImageGalleryLoader from '../../src/components/singleProduct/ImageGalleryLoader';
import Rating from '../../src/components/singleProduct/Rating';

const SingleProduct = () => {
  const router = useRouter();
  const {id} = router.query;

  const {isLoading, error, data: product } = getProduct(id as string);
  const shortDescriptionElement =  document.createElement('div');
  shortDescriptionElement.innerHTML = product.short_description;
  const shortDescription = shortDescriptionElement.textContent || shortDescriptionElement.innerText || '';

  if( error ) {
    return (
      <div className='py-20'>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className='py-20'>
      <div className='grid grid-cols-12 gap-8'>
        <div className='col-start-1 col-end-6'>
          { ! isLoading ? <ImageGallery images={product.images} /> : <ImageGalleryLoader />}
        </div>
        <div className='col-start-6 col-end-12'>
          {
            isLoading ?  (
              <>
                <div className='animate-pulse mb-8'><div className='w-96 h-8 bg-gray-200'></div></div>
                <div className='animate-pulse mb-8'><div className='w-96 h-8 bg-gray-200'></div></div>
                <div className='animate-pulse mb-8'><div className='w-96 h-8 bg-gray-200'></div></div>
              </> 
            ) : (
              <>
                <h2 className='text-black text-4xl font-light mb-8'>{product.name}</h2>
                <div className='flex items-center'>
                  <Rating count={product.average_rating} />
                  <span className='inline-block ml-2'>({ product.review_count } { product.review_count > 1 ? 'reviews' : 'review' })</span>
                </div>
                <p className='mt-8 text-base text-[#676767]'>{shortDescription}</p>
              </>
            ) 
          }
        </div>
      </div>

      <div className='pt-20'>
        <h3 className='text-center text-black font-light text-3xl'>Relative Products</h3>
      </div>
    </div>
  );
};

export default SingleProduct;