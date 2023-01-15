import React from 'react';
import { useRelatedProducts } from '../../api/product-api';
import Product from '../Product';
import ProductLoader from '../shared/ProductLoader';

type RelatedProductsProps = {
  categoryId: string;
  excludeProduct: string;
};

const RelatedProducts = ({ categoryId, excludeProduct }: RelatedProductsProps) => {
  const { isLoading, error, data: products } = useRelatedProducts(categoryId, excludeProduct);

  if (isLoading) {
    return (
      <div className="mt-20 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ProductLoader count={4} />
      </div>
    );
  }
  return (
    <div className="mt-20 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {products?.map((product) => {
        return <Product key={product.id} product={product} />;
      })}
    </div>
  );
};

export default RelatedProducts;
