import React, { useEffect } from 'react';
import { getProduct } from '../../src/api/product-api';
import RelatedProducts from '../../src/components/partials/RelatedProducts';
import ProductLoader from '../../src/components/shared/ProductLoader';
import ImageGallery from '../../src/components/partials/SingleProduct/ImageGallery';
import ImageGalleryLoader from '../../src/components/partials/SingleProduct/ImageGalleryLoader';
import Rating from '../../src/components/partials/SingleProduct/Rating';
const SingleProduct = ({ productId }) => {
  const { isLoading, error, data: product } = getProduct(productId as string , {
    enabled: !! productId
  });

  let shortDescription: string;
  let shortDescriptionElement;

  useEffect(() => {
    if (!isLoading) {
      shortDescriptionElement = document.createElement('div');
      shortDescriptionElement.innerHTML = product?.short_description;
      shortDescriptionElement.textContent || shortDescriptionElement.innerText || '';
    }
  }, [isLoading]);

  if (error) {
    return (
      <div className="py-20">
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className="py-20">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-start-1 col-end-6">
          {!isLoading ? <ImageGallery images={product.images} /> : <ImageGalleryLoader />}
        </div>
        <div className="col-start-6 col-end-12">
          {isLoading ? (
            <>
              <div className="mb-8 animate-pulse">
                <div className="h-8 w-96 bg-gray-200"></div>
              </div>
              <div className="mb-8 animate-pulse">
                <div className="h-8 w-96 bg-gray-200"></div>
              </div>
              <div className="mb-8 animate-pulse">
                <div className="h-8 w-96 bg-gray-200"></div>
              </div>
              <div className="mb-8 animate-pulse">
                <div className="h-8 w-96 bg-gray-200"></div>
              </div>
            </>
          ) : (
            <>
              <h2 className="mb-8 text-4xl font-light text-black">{product.name}</h2>
              <div className="flex items-center">
                <Rating count={product.average_rating} />
                <span className="ml-2 inline-block">
                  ({product.review_count} {product.review_count > 1 ? 'reviews' : 'review'})
                </span>
              </div>
              <p className="mt-8 text-base text-[#676767]">{shortDescription}</p>
              <button className="rounded-full bg-[#689418] px-10 py-3 text-xs text-white">Add to cart</button>
            </>
          )}
        </div>
      </div>

      <div className="pt-20">
        <h3 className="text-center text-3xl font-light text-black">Relative Products</h3>
        {isLoading ? (
          <div className="mt-20 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <ProductLoader count={4} />
          </div>
        ) : product.categories.length > 0 ? (
          <RelatedProducts categoryId={product.categories[0].id} excludeProduct={productId} />
        ) : (
          <h2>No related products found</h2>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;

export async function getServerSideProps(context) {
  const { params } = context;

  return {
    props: {
      productId: params.id,
    },
  };
}
