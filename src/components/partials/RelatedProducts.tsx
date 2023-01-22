import React from 'react';
import { useRelatedProducts } from '../../api/product-api';
import Product from '../Product';

type RelatedProductsProps = {
  ids: number[];
};

const RelatedProducts = ({ ids }: RelatedProductsProps) => {
  const productsData = useRelatedProducts(ids);
  
  return (
    <div className="mt-20 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {productsData.map((product, index) => {
        return product.isLoading ? (
          <div key={index} className="mb-8 animate-pulse">
            <div className="mb-4 h-[200px] w-full bg-gray-200"></div>
            <div className="mb-1 h-4 w-full bg-gray-200"></div>
            <div className="mb-3 h-4 w-full bg-gray-200"></div>
            <div className="h-4 w-20 mx-auto bg-gray-200"></div>
          </div> 
        ) : 
          <Product key={index} product={product.data} />;
      })}
    </div>
  );
};

export default RelatedProducts;
