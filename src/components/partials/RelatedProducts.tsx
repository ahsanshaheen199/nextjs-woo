import React from 'react';
import { useRelatedProducts } from '../../api/product-api';
import Product from '../Product';
import ProductLoader from '../shared/ProductLoader';

type RelatedProductsProps = {
    categoryId: string;
    excludeProduct: string;
}

const RelatedProducts = ({categoryId,excludeProduct}: RelatedProductsProps) => {
  const {isLoading, error, data: products } = useRelatedProducts(categoryId,excludeProduct);

  if( isLoading ) {
    return (
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 mt-20">
        <ProductLoader count={4} />
      </div>
    );
  }
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 mt-20">
      {
        products?.map( product => {
          return (
            <Product key={product.id} product={product} />
          );
        } )
      }
    </div>
  );
};

export default RelatedProducts;