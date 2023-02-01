import React from 'react';
import { getProducts } from '../../../api/product-api';
import Product from '../../Product';
import ProductLoader from '../../shared/ProductLoader';

type Props = {
}

const TopRatedProducts = (props: Props) => {
  const { isLoading, error, data } = getProducts({
    per_page: 4,
    orderby: 'rating'
  });

  if (isLoading) {
    return (
      <div className='container mx-auto px-4'>
        <div className="grid gap-4 lg:grid-cols-4">
          <ProductLoader count={4} />
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4'>
      <div className="grid gap-4 lg:grid-cols-4 sm:grid-cols-2">
        {data && data.products.map((product) => {
          return <Product key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
};

export default TopRatedProducts;