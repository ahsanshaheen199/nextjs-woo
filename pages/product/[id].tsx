import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { getProduct } from '../../src/api/product-api';
import ImageGallery from '../../src/components/singleProduct/ImageGallery';
import ImageGalleryLoader from '../../src/components/singleProduct/ImageGalleryLoader';
import Rating from '../../src/components/singleProduct/Rating';

const SingleProduct = () => {
  const router = useRouter();
  const {id} = router.query;

  const {isLoading, error, data: product } = getProduct(id as string);
  
  let shortDescription: string;
  let shortDescriptionElement;

  useEffect(() => {
    if( !isLoading ) {
      shortDescriptionElement = document.createElement('div');
      shortDescriptionElement.innerHTML = product?.short_description;
      shortDescriptionElement.textContent || shortDescriptionElement.innerText || '';
  
    }
    
  }, [isLoading]);
  

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
                <button className='text-xs text-white px-10 py-3 rounded-full bg-[#689418]'>Add to cart</button>
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